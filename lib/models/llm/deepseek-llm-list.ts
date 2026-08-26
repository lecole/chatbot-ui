import { LLM } from "@/types"

const DEEPSEEK_PLATORM_LINK = "=https://api.deepseek.com/"

// Google Models (UPDATED 12/22/23) -----------------------------

// Gemini 1.5 Flash
const DEEPSEEK_CHAT: LLM = {
  modelId: "deepseek-chat",
  modelName: "Deepseek Chat",
  provider: "deepseek",
  hostedId: "deepseek-chat",
  platformLink: DEEPSEEK_PLATORM_LINK,
  imageInput: true
}

// Gemini 1.5 Flash
const DEEPSEEK_REASONER: LLM = {
  modelId: "deepseek-reasoner",
  modelName: "Deepseek Reasoner",
  provider: "deepseek",
  hostedId: "deepseek-reasoner",
  platformLink: DEEPSEEK_PLATORM_LINK,
  imageInput: true
}

export const DEEPSEEK_LLM_LIST: LLM[] = [DEEPSEEK_CHAT, DEEPSEEK_REASONER]
