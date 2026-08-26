import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { getBase64FromDataURL, getMediaTypeFromDataURL } from "@/lib/utils"
import { ChatSettings } from "@/types"
import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

// Legacy models (Haiku 4.5 / Sonnet 4.5 / Opus 4.5): fixed thinking budget per level
const THINKING_BUDGET_TOKENS = {
  low: 4000,
  medium: 8000,
  high: 16000
}

// Claude 4.6+ models use adaptive thinking (effort level) and reject `temperature`
// and `budget_tokens` with HTTP 400, so they get a different request shape below
const ADAPTIVE_THINKING_MODELS = new Set<string>([
  "claude-fable-5",
  "claude-opus-5",
  "claude-sonnet-5",
  "claude-opus-4-8",
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-opus-4-6"
])

export async function POST(request: NextRequest) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.anthropic_api_key, "Anthropic")

    let ANTHROPIC_FORMATTED_MESSAGES: any = messages.slice(1)

    ANTHROPIC_FORMATTED_MESSAGES = ANTHROPIC_FORMATTED_MESSAGES?.map(
      (message: any) => {
        const messageContent =
          typeof message?.content === "string"
            ? [message.content]
            : message?.content

        return {
          role: message.role,
          content: messageContent.map((content: any) => {
            if (typeof content === "string") {
              return { type: "text", text: content }
            } else if (
              content?.type === "image_url" &&
              content?.image_url?.url?.length
            ) {
              return {
                type: "image",
                source: {
                  type: "base64",
                  media_type: getMediaTypeFromDataURL(content.image_url.url),
                  data: getBase64FromDataURL(content.image_url.url)
                }
              }
            } else {
              return content
            }
          })
        }
      }
    )

    const anthropic = new Anthropic({
      apiKey: profile.anthropic_api_key || ""
    })

    try {
      const isAdaptiveModel = ADAPTIVE_THINKING_MODELS.has(chatSettings.model)
      const thinkingLevel = chatSettings.thinkingLevel
      const hasThinkingLevel = thinkingLevel && thinkingLevel !== "none"

      const stream = await anthropic.messages.create({
        model: chatSettings.model,
        messages: ANTHROPIC_FORMATTED_MESSAGES,
        system: messages[0].content,
        max_tokens:
          CHAT_SETTING_LIMITS[chatSettings.model].MAX_TOKEN_OUTPUT_LENGTH,
        stream: true,
        // Legacy models: temperature + fixed thinking budget (unchanged behaviour)
        ...(!isAdaptiveModel && {
          temperature: thinkingLevel ? 1 : chatSettings.temperature,
          ...(hasThinkingLevel && {
            thinking: {
              type: "enabled",
              budget_tokens: THINKING_BUDGET_TOKENS[thinkingLevel]
            }
          })
        }),
        // Adaptive models: no temperature; thinking level -> effort. "none" omits
        // `thinking` entirely (Fable 5 / Opus 5 / Sonnet 5 still think at their
        // default effort; Opus 4.6-4.8 and Sonnet 4.6 run without thinking)
        ...(isAdaptiveModel &&
          hasThinkingLevel && {
            thinking: { type: "adaptive", display: "summarized" },
            output_config: { effort: thinkingLevel }
          })
      })

      const encoder = new TextEncoder()
      let thinkingContent = ""
      let isThinkingBlock = false

      const customStream = new ReadableStream({
        async start(controller) {
          for await (const chunk of stream) {
            if (chunk.type === "content_block_start") {
              isThinkingBlock = chunk.content_block.type === "thinking"

              if (!isThinkingBlock && thinkingContent) {
                controller.enqueue(
                  encoder.encode(
                    `\n🤔 Thinking Process:\n${thinkingContent}\n\n💭 Response:\n`
                  )
                )
                thinkingContent = ""
              }
            }

            if (chunk.type === "content_block_delta") {
              if (
                chunk.delta?.type === "thinking_delta" &&
                chunk.delta.thinking
              ) {
                thinkingContent += chunk.delta.thinking
              } else if (
                chunk.delta?.type === "text_delta" &&
                chunk.delta.text
              ) {
                controller.enqueue(encoder.encode(chunk.delta.text))
              }
            }

            // Fable 5 (and other Claude 4.7+ models) can stop with a safety
            // refusal - say so instead of returning an empty reply
            if (
              chunk.type === "message_delta" &&
              chunk.delta.stop_reason === "refusal"
            ) {
              controller.enqueue(
                encoder.encode("\n⚠️ The model declined this request.")
              )
            }
          }

          if (thinkingContent) {
            controller.enqueue(
              encoder.encode(`\n🤔 Thinking Process:\n${thinkingContent}\n`)
            )
          }

          controller.close()
        }
      })

      return new Response(customStream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked"
        }
      })
    } catch (error: any) {
      console.error("Error calling Anthropic API:", error)
      return new NextResponse(
        JSON.stringify({
          message: "An error occurred while calling the Anthropic API",
          details: error.message
        }),
        { status: 500 }
      )
    }
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Anthropic API Key not found. Please set it in your profile settings."
    } else if (errorCode === 401) {
      errorMessage =
        "Anthropic API Key is incorrect. Please fix it in your profile settings."
    }

    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
