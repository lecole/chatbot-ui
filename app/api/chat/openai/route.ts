import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsStreaming } from "openai/resources/chat/completions.mjs"

export const runtime: ServerRuntime = "edge"

// Reasoning models: the UI thinking level is sent as `reasoning_effort` and
// `temperature` is not sent (these models only accept the default)
const REASONING_EFFORT_MODELS = new Set<string>([
  "o4-mini",
  "o3-2025-04-16",
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
  "gpt-5.5",
  "gpt-5.4",
  "gpt-5.4-mini",
  "gpt-5.4-nano",
  "gpt-5.2",
  "gpt-5.1",
  "gpt-5",
  "gpt-5-mini",
  "gpt-5-nano"
])

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.openai_api_key, "OpenAI")

    const openai = new OpenAI({
      apiKey: profile.openai_api_key || "",
      organization: profile.openai_organization_id
    })

    let requestBody: ChatCompletionCreateParamsStreaming = {
      model: chatSettings.model,
      messages: messages,
      stream: true
    }

    // Handle max tokens for specific models (retired 8/25/26 - IDs no longer in LLMID)
    // if (
    //   chatSettings.model === "gpt-4-vision-preview" ||
    //   chatSettings.model === "gpt-4o"
    // ) {
    //   requestBody.max_tokens = 4096
    // }

    console.log(
      "########### chatSettings.thinkingLevel",
      chatSettings.thinkingLevel
    )

    // Handle reasoning-model settings. A thinking level of "none" sends no
    // reasoning_effort, so the model default applies (none on GPT-5.4 and
    // earlier, medium on GPT-5.5 / GPT-5.6)
    if (REASONING_EFFORT_MODELS.has(chatSettings.model)) {
      if (chatSettings.thinkingLevel && chatSettings.thinkingLevel !== "none") {
        requestBody.reasoning_effort = chatSettings.thinkingLevel // 'low', 'medium', or 'high'
      }
    } else {
      // For all other models
      requestBody.temperature = chatSettings.temperature
    }

    const response = await openai.chat.completions.create(requestBody)

    // Create a custom streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()

        for await (const chunk of response) {
          if (chunk.choices[0]?.delta?.content) {
            controller.enqueue(encoder.encode(chunk.choices[0].delta.content))
          }
        }
        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked"
      }
    })
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "OpenAI API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("incorrect api key")) {
      errorMessage =
        "OpenAI API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
