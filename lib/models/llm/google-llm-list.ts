import { LLM } from "@/types"

const GOOGLE_PLATORM_LINK = "https://ai.google.dev/"

// Google Models (UPDATED 11/18/25) -----------------------------

// Gemini 3 Pro (UPDATED 11/18/25)
const GEMINI_3_PRO: LLM = {
  modelId: "gemini-3-pro-preview",
  modelName: "Gemini 3 Pro",
  provider: "google",
  hostedId: "gemini-3-pro-preview",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: false
}

// Gemini 2.5 Pro
const GEMINI_2_5_PRO: LLM = {
  modelId: "gemini-2.5-pro",
  modelName: "Gemini 2.5 Pro",
  provider: "google",
  hostedId: "gemini-2.5-pro",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true
}

const GEMINI_2_5_FLASH_PREVIEW: LLM = {
  modelId: "gemini-2.5-flash-preview-05-20",
  modelName: "Gemini 2.5 Flash",
  provider: "google",
  hostedId: "gemini-2.5-flash-preview-05-20",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true
}
const GEMINI_2_5_FLASH_LITE_PREVIEW: LLM = {
  modelId: "gemini-2.5-flash-lite-preview-06-17",
  modelName: "Gemini 2.5 Flash Lite",
  provider: "google",
  hostedId: "gemini-2.5-flash-lite-preview-06-17",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true
}

// Gemini Pro Vision (UPDATED 12/22/23)
const GEMINI_PRO_VISION: LLM = {
  modelId: "gemini-pro-vision",
  modelName: "Gemini Pro Vision",
  provider: "google",
  hostedId: "gemini-pro-vision",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true
}

export const GOOGLE_LLM_LIST: LLM[] = [
  GEMINI_3_PRO,
  GEMINI_2_5_PRO,
  GEMINI_2_5_FLASH_PREVIEW,
  GEMINI_2_5_FLASH_LITE_PREVIEW,
  GEMINI_PRO_VISION
]
