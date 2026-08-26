import { LLM } from "@/types"

const ANTHROPIC_PLATFORM_LINK =
  "https://docs.anthropic.com/claude/reference/getting-started-with-the-api"

// Anthropic Models (UPDATED 08/25/26) -----------------------------
// Models retired at the API (Claude 2.x / Instant / 3.x / Sonnet 4 / Opus 4.1)
// are commented out below and kept for reference.

// Claude 2 (UPDATED 12/21/23) - retired, commented out 08/25/26
// const CLAUDE_2: LLM = {
//   modelId: "claude-2.1",
//   modelName: "Claude 2",
//   provider: "anthropic",
//   hostedId: "claude-2.1",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: false,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 8,
//     outputCost: 24
//   }
// }

// Claude Instant (UPDATED 12/21/23) - retired, commented out 08/25/26
// const CLAUDE_INSTANT: LLM = {
//   modelId: "claude-instant-1.2",
//   modelName: "Claude Instant",
//   provider: "anthropic",
//   hostedId: "claude-instant-1.2",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: false,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 0.8,
//     outputCost: 2.4
//   }
// }

// Claude 3 Haiku (UPDATED 03/13/24) - retired, commented out 08/25/26
// const CLAUDE_3_HAIKU: LLM = {
//   modelId: "claude-3-haiku-20240307",
//   modelName: "Claude 3 Haiku",
//   provider: "anthropic",
//   hostedId: "claude-3-haiku-20240307",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 0.25,
//     outputCost: 1.25
//   }
// }

// Claude 3.5 Haiku - retired, commented out 08/25/26
// const CLAUDE_3_5_HAIKU: LLM = {
//   modelId: "claude-3-5-haiku-20241022",
//   modelName: "Claude 3.5 Haiku",
//   provider: "anthropic",
//   hostedId: "claude-3-5-haiku-20241022",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 0.8,
//     outputCost: 4
//   }
// }

const CLAUDE_4_5_HAIKU: LLM = {
  modelId: "claude-haiku-4-5-20251001",
  modelName: "Claude 4.5 Haiku",
  provider: "anthropic",
  hostedId: "claude-haiku-4-5-20251001",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 1,
    outputCost: 5
  }
}

// Claude 3 Sonnet (UPDATED 03/04/24) - retired, commented out 08/25/26
// const CLAUDE_3_SONNET: LLM = {
//   modelId: "claude-3-sonnet-20240229",
//   modelName: "Claude 3 Sonnet",
//   provider: "anthropic",
//   hostedId: "claude-3-sonnet-20240229",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 3,
//     outputCost: 15
//   }
// }

// Claude 3 Opus (UPDATED 03/04/24) - retired, commented out 08/25/26
// const CLAUDE_3_OPUS: LLM = {
//   modelId: "claude-3-opus-20240229",
//   modelName: "Claude 3 Opus",
//   provider: "anthropic",
//   hostedId: "claude-3-opus-20240229",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 15,
//     outputCost: 75
//   }
// }

// Claude 3.5 Sonnet (UPDATED 06/20/24) - retired, commented out 08/25/26
// const CLAUDE_3_5_SONNET: LLM = {
//   modelId: "claude-3-5-sonnet-20241022",
//   modelName: "Claude 3.5 Sonnet",
//   provider: "anthropic",
//   hostedId: "claude-3-5-sonnet-20241022",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 3,
//     outputCost: 15
//   }
// }

// Claude 3.7 Sonnet - retired, commented out 08/25/26
// const CLAUDE_3_7_SONNET: LLM = {
//   modelId: "claude-3-7-sonnet-20250219",
//   modelName: "Claude 3.7 Sonnet",
//   provider: "anthropic",
//   hostedId: "claude-3-7-sonnet-20250219",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 3,
//     outputCost: 15
//   }
// }

// Claude 4 Sonnet - retired, commented out 08/25/26
// const CLAUDE_4_SONNET: LLM = {
//   modelId: "claude-sonnet-4-20250514",
//   modelName: "Claude 4 Sonnet",
//   provider: "anthropic",
//   hostedId: "claude-sonnet-4-20250514",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 3,
//     outputCost: 15
//   }
// }

// Claude 3.5 Sonnet (UPDATED 06/20/24)
const CLAUDE_4_5_SONNET: LLM = {
  modelId: "claude-sonnet-4-5-20250929",
  modelName: "Claude 4.5 Sonnet",
  provider: "anthropic",
  hostedId: "claude-sonnet-4-5-20250929",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 3,
    outputCost: 15
  }
}

// Claude 4.5 Opus - pricing corrected 08/25/26 (was 15/75; actual is 5/25)
const CLAUDE_4_5_OPUS: LLM = {
  modelId: "claude-opus-4-5",
  modelName: "Claude 4.5 Opus",
  provider: "anthropic",
  hostedId: "claude-opus-4-5",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 5,
    outputCost: 25
  }
}

// Claude 4.1 Opus - retired 2026-08-05, commented out 08/25/26
// const CLAUDE_4_1_OPUS: LLM = {
//   modelId: "claude-opus-4-1-20250805",
//   modelName: "Claude 4.1 Opus",
//   provider: "anthropic",
//   hostedId: "claude-opus-4-1-20250805",
//   platformLink: ANTHROPIC_PLATFORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 15,
//     outputCost: 75
//   }
// }

// Claude 4.6 Sonnet (UPDATED 08/25/26)
const CLAUDE_4_6_SONNET: LLM = {
  modelId: "claude-sonnet-4-6",
  modelName: "Claude 4.6 Sonnet",
  provider: "anthropic",
  hostedId: "claude-sonnet-4-6",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 3,
    outputCost: 15
  }
}

// Claude 4.6 Opus (UPDATED 08/25/26)
const CLAUDE_4_6_OPUS: LLM = {
  modelId: "claude-opus-4-6",
  modelName: "Claude 4.6 Opus",
  provider: "anthropic",
  hostedId: "claude-opus-4-6",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 5,
    outputCost: 25
  }
}

// Claude 4.7 Opus (UPDATED 08/25/26)
const CLAUDE_4_7_OPUS: LLM = {
  modelId: "claude-opus-4-7",
  modelName: "Claude 4.7 Opus",
  provider: "anthropic",
  hostedId: "claude-opus-4-7",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 5,
    outputCost: 25
  }
}

// Claude 4.8 Opus (UPDATED 08/25/26)
const CLAUDE_4_8_OPUS: LLM = {
  modelId: "claude-opus-4-8",
  modelName: "Claude 4.8 Opus",
  provider: "anthropic",
  hostedId: "claude-opus-4-8",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 5,
    outputCost: 25
  }
}

// Claude 5 Sonnet (UPDATED 08/25/26)
const CLAUDE_5_SONNET: LLM = {
  modelId: "claude-sonnet-5",
  modelName: "Claude 5 Sonnet",
  provider: "anthropic",
  hostedId: "claude-sonnet-5",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 2,
    outputCost: 10
  }
}

// Claude 5 Opus (UPDATED 08/25/26)
const CLAUDE_5_OPUS: LLM = {
  modelId: "claude-opus-5",
  modelName: "Claude 5 Opus",
  provider: "anthropic",
  hostedId: "claude-opus-5",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 5,
    outputCost: 25
  }
}

// Claude 5 Fable (UPDATED 08/25/26) - most capable tier; requires 30-day data
// retention on the org and can end a reply with stop_reason "refusal"
const CLAUDE_5_FABLE: LLM = {
  modelId: "claude-fable-5",
  modelName: "Claude 5 Fable",
  provider: "anthropic",
  hostedId: "claude-fable-5",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 10,
    outputCost: 50
  }
}

export const ANTHROPIC_LLM_LIST: LLM[] = [
  CLAUDE_5_SONNET,
  CLAUDE_5_OPUS,
  CLAUDE_5_FABLE,
  CLAUDE_4_8_OPUS,
  // CLAUDE_4_7_OPUS,
  CLAUDE_4_6_SONNET,
  // CLAUDE_4_6_OPUS,
  CLAUDE_4_5_HAIKU
  // CLAUDE_4_5_SONNET,
  // CLAUDE_4_5_OPUS
]
