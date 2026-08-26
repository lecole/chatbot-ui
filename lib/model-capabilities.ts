import { LLMID } from "@/types"

type ThinkingCapability = {
  supported: boolean
  maxBudgetTokens?: number
  // Informational only - each provider route decides how the thinking level is sent
  implementation?: string
  levels?: string[]
}

type ModelCapabilities = {
  thinking: ThinkingCapability
}

export const MODEL_CAPABILITIES: Partial<Record<LLMID, ModelCapabilities>> = {
  //Groq
  "openai/gpt-oss-20b": {
    thinking: {
      supported: true,
      maxBudgetTokens: 32000,
      implementation: "reasoning_effort"
    }
  },
  "openai/gpt-oss-120b": {
    thinking: {
      supported: true,
      maxBudgetTokens: 32000,
      implementation: "reasoning_effort"
    }
  },
  // Anthropic Models
  "claude-sonnet-5": {
    thinking: {
      supported: true,
      implementation: "adaptive" // effort level, no token budget
    }
  },
  "claude-opus-5": {
    thinking: {
      supported: true,
      implementation: "adaptive" // effort level, no token budget
    }
  },
  "claude-fable-5": {
    thinking: {
      supported: true,
      implementation: "adaptive" // effort level, no token budget
    }
  },
  "claude-opus-4-8": {
    thinking: {
      supported: true,
      implementation: "adaptive" // effort level, no token budget
    }
  },
  "claude-opus-4-7": {
    thinking: {
      supported: true,
      implementation: "adaptive" // effort level, no token budget
    }
  },
  "claude-sonnet-4-6": {
    thinking: {
      supported: true,
      implementation: "adaptive" // effort level, no token budget
    }
  },
  "claude-opus-4-6": {
    thinking: {
      supported: true,
      implementation: "adaptive" // effort level, no token budget
    }
  },
  // "claude-opus-4-20250514": {
  // thinking: {
  // supported: true,
  // maxBudgetTokens: 32000
  // }
  // },
  // "claude-sonnet-4-20250514": {
  // thinking: {
  // supported: true,
  // maxBudgetTokens: 32000
  // }
  // },
  // "claude-3-7-sonnet-20250219": {
  // thinking: {
  // supported: true,
  // maxBudgetTokens: 32000
  // }
  // },
  // "claude-3-opus-20240229": {
  // thinking: {
  // supported: true,
  // maxBudgetTokens: 32000
  // }
  // },
  // "claude-3-sonnet-20240229": {
  // thinking: {
  // supported: true,
  // maxBudgetTokens: 16000
  // }
  // },
  "claude-sonnet-4-5-20250929": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000
    }
  },
  "claude-opus-4-5": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000
    }
  },
  // OpenAI Models
  "gpt-5.6-sol": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping to reasoning_effort
    }
  },
  "gpt-5.6-terra": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping to reasoning_effort
    }
  },
  "gpt-5.6-luna": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping to reasoning_effort
    }
  },
  "gpt-5.5": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping to reasoning_effort
    }
  },
  "gpt-5.4": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping to reasoning_effort
    }
  },
  "gpt-5.4-mini": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping to reasoning_effort
    }
  },
  "gpt-5.4-nano": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping to reasoning_effort
    }
  },
  "gpt-5.2": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping to reasoning_effort
    }
  },
  "o3-pro-2025-06-10": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping for o3-mini
    }
  },
  // "o3-mini": {
  // thinking: {
  // supported: true,
  // maxBudgetTokens: 16000,
  // implementation: "reasoning_effort",
  // levels: ["low", "medium", "high"] // Direct mapping for o3-mini
  // }
  // },
  "gpt-5.1": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping for o3-mini
    }
  },
  "gpt-5": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping for o3-mini
    }
  },
  "gpt-5-mini": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping for o3-mini
    }
  },
  "gpt-5-nano": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping for o3-mini
    }
  },
  "o4-mini": {
    thinking: {
      supported: true,
      maxBudgetTokens: 16000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"] // Direct mapping for o3-mini
    }
  },
  "gemini-3-pro-preview": {
    thinking: {
      supported: true,
      maxBudgetTokens: 32000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"]
    }
  },
  "gemini-2.5-pro": {
    thinking: {
      supported: true,
      maxBudgetTokens: 32000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"]
    }
  },
  "gemini-2.5-flash-preview-05-20": {
    thinking: {
      supported: true,
      maxBudgetTokens: 32000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"]
    }
  },
  "gemini-2.5-flash-lite-preview-06-17": {
    thinking: {
      supported: true,
      maxBudgetTokens: 32000,
      implementation: "reasoning_effort",
      levels: ["low", "medium", "high"]
    }
  },
  "deepseek-reasoner": {
    thinking: {
      supported: true,
      maxBudgetTokens: 32000,
      implementation: "reasoning_effort"
    }
  }
}

export const THINKING_LEVEL_TOKENS = {
  low: 4000,
  medium: 8000,
  high: 16000
} as const

export const THINKING_LEVEL_DESCRIPTIONS = {
  none: "Standard response without extended reasoning",
  low: "Basic step-by-step reasoning for simple tasks",
  medium: "Detailed analysis for moderately complex problems",
  high: "Comprehensive reasoning for complex tasks"
} as const

export type ThinkingLevel = keyof typeof THINKING_LEVEL_DESCRIPTIONS

export function isThinkingSupported(modelId: LLMID): boolean {
  return !!MODEL_CAPABILITIES[modelId]?.thinking.supported
}

export function getMaxThinkingBudget(modelId: LLMID): number | undefined {
  return MODEL_CAPABILITIES[modelId]?.thinking.maxBudgetTokens
}
