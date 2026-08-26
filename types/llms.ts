import { ModelProvider } from "."

export type LLMID =
  | OpenAILLMID
  | GoogleLLMID
  | AnthropicLLMID
  | MistralLLMID
  | GroqLLMID
  | PerplexityLLMID
  | DeepseekLLMID
  | TogetheraILLMID

// OpenAI Models (UPDATED 8/25/26) - retired models commented out
export type OpenAILLMID =
  | "gpt-5.6-sol" // GPT-5.6 Sol
  | "gpt-5.6-terra" // GPT-5.6 Terra
  | "gpt-5.6-luna" // GPT-5.6 Luna
  | "gpt-5.5" // GPT-5.5
  | "gpt-5.4" // GPT-5.4
  | "gpt-5.4-mini" // GPT-5.4 Mini
  | "gpt-5.4-nano" // GPT-5.4 Nano
  | "gpt-5.2" // GPT-5.2
  | "o3-pro-2025-06-10"
  | "o3-2025-04-16"
  // | "o3-mini" (retired)
  // | "o3-mini-high" (retired)
  // | "o4-mini-2025-04-16" (retired)
  | "o4-mini"
  // | "gpt-4o" // GPT-4o (retired)
  // | "gpt-4o-mini" // GPT-4o 11-20-2024 (retired)
  // | "gpt-4o-2024-11-20" // GPT-4o 11-20-2024 (retired)
  | "gpt-4.1-2025-04-14" // GPT-4 Vision
  | "gpt-4.1-mini-2025-04-14" // GPT-4 Vision
  | "gpt-4.1-nano-2025-04-14" // GPT-4 Vision
  // | "gpt-4-vision-preview" // GPT-4 Vision (retired)
  // | "gpt-4.5-preview-2025-02-27" // GPT-4 Vision (retired)
  // | "gpt-4" // GPT-4 (retired)
  // | "gpt-3.5-turbo" // Updated GPT-3.5 Turbo (retired)
  | "gpt-5.1" // GPT-5
  | "gpt-5" // GPT-5
  | "gpt-5-mini" // GPT-5-mini
  | "gpt-5-nano" // GPT-5-nano

// Google Models
export type GoogleLLMID =
  | "gemini-pro" // Gemini Pro
  | "gemini-pro-vision" // Gemini Pro Vision
  | "gemini-1.5-pro-latest" // Gemini 1.5 Pro
  | "gemini-1.5-flash" // Gemini 1.5 Flash
  | "gemini-2.0-flash" // Gemini 1.5 Flash
  | "gemini-2.5-pro"
  | "gemini-2.5-flash-preview-05-20"
  | "gemini-2.5-flash-lite-preview-06-17"
  | "gemini-3-pro-preview"

// Anthropic Models (UPDATED 8/25/26) - retired models commented out
export type AnthropicLLMID =
  | "claude-sonnet-5" // Claude 5 Sonnet
  | "claude-opus-5" // Claude 5 Opus
  | "claude-fable-5" // Claude 5 Fable
  | "claude-opus-4-8" // Claude 4.8 Opus
  | "claude-opus-4-7" // Claude 4.7 Opus
  | "claude-sonnet-4-6" // Claude 4.6 Sonnet
  | "claude-opus-4-6" // Claude 4.6 Opus
  // | "claude-2.1" // Claude 2 (retired)
  // | "claude-instant-1.2" // Claude Instant (retired)
  // | "claude-3-haiku-20240307" // Claude 3 Haiku (retired)
  // | "claude-3-5-haiku-20241022" // Claude 3 Haiku (retired)
  | "claude-haiku-4-5-20251001" // Claude 3 Haiku
  // | "claude-3-sonnet-20240229" // Claude 3 Sonnet (retired)
  // | "claude-3-opus-20240229" // Claude 3 Opus (retired)
  // | "claude-3-5-sonnet-20241022" // Claude 3.5 Sonnet (retired)
  // | "claude-3-7-sonnet-20250219" // Claude 3.7 Sonnet (retired)
  // | "claude-sonnet-4-20250514" // Claude 3.7 Sonnet (retired)
  // | "claude-opus-4-20250514" // Claude 3.7 Sonnet (retired)
  // | "claude-opus-4-1-20250805" // Claude 3.7 Sonnet (retired)
  | "claude-opus-4-5"
  | "claude-sonnet-4-5-20250929"

// Mistral Models
export type MistralLLMID =
  | "mistral-tiny" // Mistral Tiny
  | "mistral-small-latest" // Mistral Small
  | "mistral-medium-latest" // Mistral Medium
  | "mistral-large-latest" // Mistral Large

export type GroqLLMID =
  | "openai/gpt-oss-20b"
  | "openai/gpt-oss-120b"
  | "moonshotai/kimi-k2-instruct"
  | "deepseek-r1-distill-llama-70b"
  | "meta-llama/llama-4-scout-17b-16e-instruct"
  | "llama-3.2-1b-preview" // LLaMA32-1b
  | "llama-3.2-3b-preview" // LLaMA32-3b
  | "llama-3.2-11b-vision-preview" // LLaMA32-11b
  | "llama-3.2-90b-text-preview" // LLaMA32-90b
  | "llama3-8b-8192" // LLaMA3-8b
  | "llama3-70b-8192" // LLaMA3-70b
  | "mixtral-8x7b-32768" // Mixtral-8x7b
  | "gemma-7b-it" // Gemma-7b IT

// Perplexity Models (UPDATED 1/31/24)
export type PerplexityLLMID =
  | "pplx-7b-online" // Perplexity Online 7B
  | "pplx-70b-online" // Perplexity Online 70B
  | "pplx-7b-chat" // Perplexity Chat 7B
  | "pplx-70b-chat" // Perplexity Chat 70B
  | "mixtral-8x7b-instruct" // Mixtral 8x7B Instruct
  | "mistral-7b-instruct" // Mistral 7B Instruct
  | "llama-2-70b-chat" // Llama2 70B Chat
  | "codellama-34b-instruct" // CodeLlama 34B Instruct
  | "codellama-70b-instruct" // CodeLlama 70B Instruct
  | "sonar-small-chat" // Sonar Small Chat
  | "sonar-small-online" // Sonar Small Online
  | "sonar-medium-chat" // Sonar Medium Chat
  | "sonar-medium-online" // Sonar Medium Online

export type DeepseekLLMID = "deepseek-chat" | "deepseek-reasoner"

// Together AI Models
export type TogetheraILLMID =
  | "moonshotai/Kimi-K2.5"
  | "deepseek-ai/DeepSeek-V3.1"
  | "openai/gpt-oss-120b"
  | "openai/gpt-oss-20b"
  | "Qwen/Qwen3-Next-80B-A3B-Thinking"
  | "Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8"

export interface LLM {
  modelId: LLMID
  modelName: string
  provider: ModelProvider
  hostedId: string
  platformLink: string
  imageInput: boolean
  pricing?: {
    currency: string
    unit: string
    inputCost: number
    outputCost?: number
  }
}

export interface OpenRouterLLM extends LLM {
  maxContext: number
}
