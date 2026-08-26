// lib/models/llm/togetherai-llm-list.ts
// Defines Together AI models available through the Together AI API
// Together AI provides OpenAI-compatible APIs with high-performance open-source models
// RELEVANT FILES: lib/models/llm/llm-list.ts, types/llms.ts, app/api/chat/togetherai/route.ts

import { LLM } from "@/types"

const TOGETHERAI_PLATFORM_LINK = "https://www.together.ai/"

// Kimi K2.5 - Latest Kimi model by Moonshot AI
const KIMI_K2_5: LLM = {
  modelId: "moonshotai/Kimi-K2.5",
  modelName: "Kimi K2.5",
  provider: "togetherai",
  hostedId: "moonshotai/Kimi-K2.5",
  platformLink: TOGETHERAI_PLATFORM_LINK,
  imageInput: false
}

// DeepSeek V3.1 - Latest DeepSeek model
const DEEPSEEK_V3_1: LLM = {
  modelId: "deepseek-ai/DeepSeek-V3.1",
  modelName: "DeepSeek V3.1",
  provider: "togetherai",
  hostedId: "deepseek-ai/DeepSeek-V3.1",
  platformLink: TOGETHERAI_PLATFORM_LINK,
  imageInput: false
}

// GPT-OSS 120B - Open-source GPT model with 120B parameters
const GPT_OSS_120B: LLM = {
  modelId: "openai/gpt-oss-120b",
  modelName: "GPT-OSS 120B",
  provider: "togetherai",
  hostedId: "openai/gpt-oss-120b",
  platformLink: TOGETHERAI_PLATFORM_LINK,
  imageInput: false
}

// GPT-OSS 20B - Open-source GPT model with 20B parameters
const GPT_OSS_20B: LLM = {
  modelId: "openai/gpt-oss-20b",
  modelName: "GPT-OSS 20B",
  provider: "togetherai",
  hostedId: "openai/gpt-oss-20b",
  platformLink: TOGETHERAI_PLATFORM_LINK,
  imageInput: false
}

// Qwen3 80B A3B Thinking - Latest Qwen model with reasoning capabilities
const QWEN3_80B: LLM = {
  modelId: "Qwen/Qwen3-Next-80B-A3B-Thinking",
  modelName: "Qwen3 80B (Thinking)",
  provider: "togetherai",
  hostedId: "Qwen/Qwen3-Next-80B-A3B-Thinking",
  platformLink: TOGETHERAI_PLATFORM_LINK,
  imageInput: false
}

// Qwen3 Coder 480B - Specialized Qwen model for code generation and understanding
const QWEN3_CODER_480B: LLM = {
  modelId: "Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8",
  modelName: "Qwen3 Coder 480B",
  provider: "togetherai",
  hostedId: "Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8",
  platformLink: TOGETHERAI_PLATFORM_LINK,
  imageInput: false
}

export const TOGETHERAI_LLM_LIST: LLM[] = [
  KIMI_K2_5,
  DEEPSEEK_V3_1,
  // GPT_OSS_120B,
  // GPT_OSS_20B,
  QWEN3_80B,
  QWEN3_CODER_480B
]
