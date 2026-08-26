import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.deepseek_api_key, "OpenAI")

    const openai = new OpenAI({
      apiKey: profile.deepseek_api_key || ""
      // organization: profile.openai_organization_id
    })

    let requestBody: ChatCompletionCreateParamsBase = {
      model: chatSettings.model,
      messages: messages,
      stream: true
    }

    // // Handle max tokens for specific models
    // if (chatSettings.model === "gpt-4-vision-preview" ||
    //     chatSettings.model === "gpt-4o") {
    //   requestBody.max_tokens = 4096
    // }

    // console.log('########### chatSettings.thinkingLevel', chatSettings.thinkingLevel)

    // Handle o3-mini specific settings
    // Retired model IDs were removed from LLMID on 8/25/26; the cast keeps this legacy check compiling unchanged
    if (
      (chatSettings.model as string) === "o3-mini" ||
      chatSettings.model === "o4-mini"
    ) {
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
