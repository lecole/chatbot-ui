import { LLM } from "@/types"

const OPENAI_PLATORM_LINK = "https://platform.openai.com/docs/overview"

// OpenAI Models (UPDATED 8/25/26) -----------------------------
// Retired / superseded models are commented out below and kept for reference.
// const GPTo1: LLM = {
//   modelId: "o1",
//   modelName: "GPT-o1",
//   provider: "openai",
//   hostedId: "o1",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 5,
//     outputCost: 15
//   }
// }
//
// const GPTo1Mini: LLM = {
//   modelId: "o1-mini",
//   modelName: "GPT-o1-mini",
//   provider: "openai",
//   hostedId: "o1-mini",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 5,
//     outputCost: 15
//   }
// }

// GPT-5.6 Sol (UPDATED 8/25/26) - current flagship; the `gpt-5.6` alias routes here
const GPT56Sol: LLM = {
  modelId: "gpt-5.6-sol",
  modelName: "GPT-5.6 Sol",
  provider: "openai",
  hostedId: "gpt-5.6-sol",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 4.0,
    outputCost: 20.0
  }
}

// GPT-5.6 Terra (UPDATED 8/25/26) - mid tier of the GPT-5.6 family
const GPT56Terra: LLM = {
  modelId: "gpt-5.6-terra",
  modelName: "GPT-5.6 Terra",
  provider: "openai",
  hostedId: "gpt-5.6-terra",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 2.0,
    outputCost: 12.0
  }
}

// GPT-5.6 Luna (UPDATED 8/25/26) - budget tier of the GPT-5.6 family
const GPT56Luna: LLM = {
  modelId: "gpt-5.6-luna",
  modelName: "GPT-5.6 Luna",
  provider: "openai",
  hostedId: "gpt-5.6-luna",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.2,
    outputCost: 1.2
  }
}

// GPT-5.5 (UPDATED 8/25/26)
const GPT55: LLM = {
  modelId: "gpt-5.5",
  modelName: "GPT-5.5",
  provider: "openai",
  hostedId: "gpt-5.5",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 5.0,
    outputCost: 30.0
  }
}

// GPT-5.4 (UPDATED 8/25/26)
const GPT54: LLM = {
  modelId: "gpt-5.4",
  modelName: "GPT-5.4",
  provider: "openai",
  hostedId: "gpt-5.4",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 2.5,
    outputCost: 15.0
  }
}

// GPT-5.4 Mini (UPDATED 8/25/26)
const GPT54Mini: LLM = {
  modelId: "gpt-5.4-mini",
  modelName: "GPT-5.4 Mini",
  provider: "openai",
  hostedId: "gpt-5.4-mini",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.75,
    outputCost: 4.5
  }
}

// GPT-5.4 Nano (UPDATED 8/25/26)
const GPT54Nano: LLM = {
  modelId: "gpt-5.4-nano",
  modelName: "GPT-5.4 Nano",
  provider: "openai",
  hostedId: "gpt-5.4-nano",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.2,
    outputCost: 1.25
  }
}

// GPT-5.2 (UPDATED 8/25/26) - superseded by GPT-5.4 and later
const GPT52: LLM = {
  modelId: "gpt-5.2",
  modelName: "GPT-5.2",
  provider: "openai",
  hostedId: "gpt-5.2",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 1.75,
    outputCost: 14.0
  }
}

const GPT51: LLM = {
  modelId: "gpt-5.1",
  modelName: "GPT-5.1",
  provider: "openai",
  hostedId: "gpt-5.1",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 1.25,
    outputCost: 10.0
  }
}

const GPT5: LLM = {
  modelId: "gpt-5",
  modelName: "GPT-5",
  provider: "openai",
  hostedId: "gpt-5",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 1.25,
    outputCost: 10.0
  }
}
const GPT5Mini: LLM = {
  modelId: "gpt-5-mini",
  modelName: "GPT-5 Mini",
  provider: "openai",
  hostedId: "gpt-5-mini",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.25,
    outputCost: 2.0
  }
}
const GPT5Nano: LLM = {
  modelId: "gpt-5-nano",
  modelName: "GPT-5 Nano",
  provider: "openai",
  hostedId: "gpt-5-nano",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.05,
    outputCost: 0.4
  }
}
const GPT41: LLM = {
  modelId: "gpt-4.1-2025-04-14",
  modelName: "GPT-4.1",
  provider: "openai",
  hostedId: "gpt-4.1-2025-04-14",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 2.0,
    outputCost: 8.0
  }
}

const GPT41Mini: LLM = {
  modelId: "gpt-4.1-mini-2025-04-14",
  modelName: "GPT-4.1 Mini",
  provider: "openai",
  hostedId: "gpt-4.1-mini-2025-04-14",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.4,
    outputCost: 1.6
  }
}

const GPT41Nano: LLM = {
  modelId: "gpt-4.1-nano-2025-04-14",
  modelName: "GPT-4.1 Nano",
  provider: "openai",
  hostedId: "gpt-4.1-nano-2025-04-14",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.1,
    outputCost: 0.4
  }
}

const O3Pro: LLM = {
  modelId: "o3-pro-2025-06-10",
  modelName: "o3 Pro",
  provider: "openai",
  hostedId: "o3-pro-2025-06-10",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 20,
    outputCost: 80
  }
}

const O3: LLM = {
  modelId: "o3-2025-04-16",
  modelName: "o3",
  provider: "openai",
  hostedId: "o3-2025-04-16",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 10,
    outputCost: 40
  }
}

const GPTo4Mini: LLM = {
  modelId: "o4-mini",
  modelName: "o4-mini",
  provider: "openai",
  hostedId: "o4-mini",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 1.1,
    outputCost: 4.4
  }
}

// o3-mini - retired, commented out 8/25/26
// const GPTo3Mini: LLM = {
//   modelId: "o3-mini",
//   modelName: "o3-mini",
//   provider: "openai",
//   hostedId: "o3-mini",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 1.1,
//     outputCost: 4.4
//   }
// }

// GPT-4o - retired, commented out 8/25/26
// const GPT4o: LLM = {
//   modelId: "gpt-4o",
//   modelName: "GPT-4o",
//   provider: "openai",
//   hostedId: "gpt-4o",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 5,
//     outputCost: 15
//   }
// }

// GPT-4o Mini (UPDATED 11/20/24) - retired, commented out 8/25/26
// const GPT4oMini: LLM = {
//   modelId: "gpt-4o-mini",
//   modelName: "GPT-4o Mini",
//   provider: "openai",
//   hostedId: "gpt-4o-mini",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 0.15,
//     outputCost: 0.6
//   }
// }

// GPT-4o 11-20 (UPDATED 11/20/24) - retired, commented out 8/25/26
// const GPT4o1120: LLM = {
//   modelId: "gpt-4o-2024-11-20",
//   modelName: "GPT-4o 11-20",
//   provider: "openai",
//   hostedId: "gpt-4o-2024-11-20",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 2.5,
//     outputCost: 10
//   }
// }

// GPT-4 Vision (UPDATED 12/18/23) - retired, commented out 8/25/26
// const GPT4Vision: LLM = {
//   modelId: "gpt-4-vision-preview",
//   modelName: "GPT-4 Vision",
//   provider: "openai",
//   hostedId: "gpt-4-vision-preview",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 10
//   }
// }

// GPT-4.5 Preview - retired, commented out 8/25/26
// const GPT45Preview: LLM = {
//   modelId: "gpt-4.5-preview-2025-02-27",
//   modelName: "GPT-4.5 Preview",
//   provider: "openai",
//   hostedId: "gpt-4.5-preview-2025-02-27",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: true,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 75,
//     outputCost: 150
//   }
// }

// GPT-4 (UPDATED 1/29/24) - retired, commented out 8/25/26
// const GPT4: LLM = {
//   modelId: "gpt-4",
//   modelName: "GPT-4",
//   provider: "openai",
//   hostedId: "gpt-4",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: false,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 30,
//     outputCost: 60
//   }
// }

// GPT-3.5 Turbo (UPDATED 1/25/24) - retired, commented out 8/25/26
// const GPT3_5Turbo: LLM = {
//   modelId: "gpt-3.5-turbo",
//   modelName: "GPT-3.5 Turbo",
//   provider: "openai",
//   hostedId: "gpt-3.5-turbo",
//   platformLink: OPENAI_PLATORM_LINK,
//   imageInput: false,
//   pricing: {
//     currency: "USD",
//     unit: "1M tokens",
//     inputCost: 0.5,
//     outputCost: 1.5
//   }
// }

export const OPENAI_LLM_LIST: LLM[] = [
  GPT56Sol,
  GPT56Terra,
  GPT56Luna,
  GPT55,
  GPT54,
  GPT54Mini,
  GPT54Nano
  // GPT52,
  // GPT51,
  // GPT5,
  // GPT5Mini,
  // GPT5Nano,
  // GPT41,
  // GPT41Mini,
  // GPT41Nano,
  // O3,
  // O3Pro,
  // GPTo4Mini
]
