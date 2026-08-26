// app/api/chat/togetherai/route.ts
// API route handler for Together AI chat completions
// Together AI provides OpenAI-compatible APIs for high-performance open-source models
// RELEVANT FILES: lib/models/llm/togetherai-llm-list.ts, lib/server/server-chat-helpers.ts, types/llms.ts

import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
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

    checkApiKey(profile.togetherai_api_key, "Together AI")

    // Together AI is compatible with the OpenAI SDK
    const togetherai = new OpenAI({
      apiKey: profile.togetherai_api_key || "",
      baseURL: "https://api.together.xyz/v1"
    })

    let requestBody: ChatCompletionCreateParamsBase = {
      model: chatSettings.model,
      messages: messages,
      stream: true,
      temperature: chatSettings.temperature
    }

    // Handle max tokens for specific models
    requestBody.max_tokens =
      CHAT_SETTING_LIMITS[chatSettings.model].MAX_TOKEN_OUTPUT_LENGTH

    const response = await togetherai.chat.completions.create(requestBody)

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
        "Together AI API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("incorrect api key")) {
      errorMessage =
        "Together AI API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
