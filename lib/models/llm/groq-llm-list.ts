import { LLM } from "@/types"

const GROQ_PLATORM_LINK = "https://groq.com/"

const OpenAI_Gpt_oss_20b: LLM = {
  modelId: "openai/gpt-oss-20b",
  modelName: "OpenAI GPT OSS 20B",
  provider: "groq",
  hostedId: "openai/gpt-oss-20b",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.1,
    outputCost: 0.5
  }
}

const OpenAI_Gpt_oss_120b: LLM = {
  modelId: "openai/gpt-oss-120b",
  modelName: "OpenAI GPT OSS 120B",
  provider: "groq",
  hostedId: "openai/gpt-oss-120b",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.15,
    outputCost: 0.75
  }
}

const Kimi_k2_instruct: LLM = {
  modelId: "moonshotai/kimi-k2-instruct",
  modelName: "Kimi K2 Instruct",
  provider: "groq",
  hostedId: "moonshotai/kimi-k2-instruct",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 1,
    outputCost: 3
  }
}

const DeepSeek_Llama_70B: LLM = {
  modelId: "deepseek-r1-distill-llama-70b",
  modelName: "DeepSeek-Llama-70b",
  provider: "groq",
  hostedId: "deepseek-r1-distill-llama-70b",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.5,
    outputCost: 0.77
  }
}

const LLaMA4_Scout_17B: LLM = {
  modelId: "meta-llama/llama-4-scout-17b-16e-instruct",
  modelName: "LLaMA4-Scout-17b-instruct",
  provider: "groq",
  hostedId: "meta-llama/llama-4-scout-17b-16e-instruct",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.11,
    outputCost: 0.34
  }
}

const LLaMA32_1B: LLM = {
  modelId: "llama-3.2-1b-preview",
  modelName: "LLaMA3.2-1b-preview",
  provider: "groq",
  hostedId: "llama-3.2-1b-preview",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.05,
    outputCost: 0.1
  }
}

const LLaMA32_3B: LLM = {
  modelId: "llama-3.2-3b-preview",
  modelName: "LLaMA3.2-3b-preview",
  provider: "groq",
  hostedId: "llama-3.2-3b-preview",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.05,
    outputCost: 0.1
  }
}

const LLaMA32_11B: LLM = {
  modelId: "llama-3.2-11b-text-preview",
  modelName: "LLaMA3.2-11b-text-preview",
  provider: "groq",
  hostedId: "llama-3.2-11b-text-preview",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.05,
    outputCost: 0.1
  }
}

const LLaMA32_90B: LLM = {
  modelId: "llama-3.2-90b-text-preview",
  modelName: "LLaMA3.2-90b-text-preview",
  provider: "groq",
  hostedId: "llama-3.2-90b-text-preview",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.05,
    outputCost: 0.1
  }
}

const LLaMA3_8B: LLM = {
  modelId: "llama3-8b-8192",
  modelName: "LLaMA3-8b-chat",
  provider: "groq",
  hostedId: "llama3-8b-8192",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.05,
    outputCost: 0.1
  }
}

const LLaMA3_70B: LLM = {
  modelId: "llama3-70b-8192",
  modelName: "LLaMA3-70b-chat",
  provider: "groq",
  hostedId: "llama3-70b-4096",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.59,
    outputCost: 0.79
  }
}

const MIXTRAL_8X7B: LLM = {
  modelId: "mixtral-8x7b-32768",
  modelName: "Mixtral-8x7b-Instruct-v0.1",
  provider: "groq",
  hostedId: "mixtral-8x7b-32768",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.27,
    outputCost: 0.27
  }
}

const GEMMA_7B_IT: LLM = {
  modelId: "gemma-7b-it",
  modelName: "Gemma-7b-It",
  provider: "groq",
  hostedId: "gemma-7b-it",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.15,
    outputCost: 0.15
  }
}

export const GROQ_LLM_LIST: LLM[] = [
  OpenAI_Gpt_oss_20b,
  OpenAI_Gpt_oss_120b,
  Kimi_k2_instruct,
  // DeepSeek_Llama_70B,
  LLaMA4_Scout_17B
  // LLaMA32_1B,
  // LLaMA32_3B,
  // LLaMA32_11B,
  // LLaMA32_90B,
  // LLaMA3_8B,
  // LLaMA3_70B,
  // MIXTRAL_8X7B,
  // GEMMA_7B_IT
]
