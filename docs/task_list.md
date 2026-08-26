# Task List: Refresh OpenAI + Anthropic Model Lists (Aug 2026)

**Version:** 1.1 (2026-08-25 - completed)
**Date Created:** 2026-08-25
**Status:** Completed - awaiting Lecole's review (nothing committed, no build run)
**Progress:** 9/9 tasks completed

---

## Overview

Add the current OpenAI (GPT-5.4 / 5.5 / 5.6) and Anthropic (Claude 4.6 / 4.7 / 4.8 / 5 family)
models, and comment out the old GPT / Claude models that are retired or superseded.
"Comment out" = keep the code, wrap it in `//`, matching the existing convention in both list files.

Sources used (2026-08-25):
- `GET https://api.openai.com/v1/models` and `GET https://api.anthropic.com/v1/models` with the keys
  already in `.env.local` (read-only list calls) — authoritative "what this account can use".
- OpenAI docs: `developers.openai.com/api/docs/pricing`, `/models/gpt-5.6`, `/models/gpt-5.5`,
  `/models/gpt-5.4`, `/models/gpt-5.4-mini`, `/models/gpt-5.4-nano`, `/models/gpt-5.2`.
- Anthropic docs: `platform.claude.com/docs/en/about-claude/pricing` + the `claude-api` skill
  model catalog / migration guide.

---

## Discovery Findings

### OpenAI — available on this account (chat-completions capable)

| modelId (hostedId) | Name | Context | Max out | $/1M in | $/1M out | Notes |
|---|---|---|---|---|---|---|
| `gpt-5.6-sol`   | GPT-5.6 Sol   | 1,050,000 | 128,000 | 4.00 | 20.00 | Current flagship. `gpt-5.6` alias -> Sol |
| `gpt-5.6-terra` | GPT-5.6 Terra | 1,050,000 | 128,000 | 2.00 | 12.00 | Mid tier |
| `gpt-5.6-luna`  | GPT-5.6 Luna  | 1,050,000 | 128,000 | 0.20 | 1.20  | Budget tier |
| `gpt-5.5`       | GPT-5.5       | 1,050,000 | 128,000 | 5.00 | 30.00 | Previous flagship |
| `gpt-5.4`       | GPT-5.4       | 1,050,000 | 128,000 | 2.50 | 15.00 | |
| `gpt-5.4-mini`  | GPT-5.4 Mini  |   400,000 | 128,000 | 0.75 | 4.50  | |
| `gpt-5.4-nano`  | GPT-5.4 Nano  |   400,000 | 128,000 | 0.20 | 1.25  | |
| `gpt-5.2`       | GPT-5.2       |   400,000 | 128,000 | 1.75 | 14.00 | Superseded (defined, commented) |

All support image input and `reasoning_effort` (`none`/`low`/`medium`/`high`/`xhigh`; 5.6 also `max`).
Default effort: **`none`** for 5.4 and earlier, **`medium`** for 5.5 and 5.6.
Excluded on purpose: `*-pro` (Responses API only — same reason `o3-pro` is commented out today),
`*-codex`, `*-chat-latest`, `*-deep-research`, `gpt-5-search-api`.

### Anthropic — available on this account (`/v1/models` returns exactly these 10)

| modelId (hostedId) | Name | Context | Max out | $/1M in | $/1M out |
|---|---|---|---|---|---|
| `claude-opus-5`   | Claude Opus 5   | 1,000,000 | 128,000 | 5  | 25 |
| `claude-sonnet-5` | Claude Sonnet 5 | 1,000,000 | 128,000 | 2  | 10 |
| `claude-fable-5`  | Claude Fable 5  | 1,000,000 | 128,000 | 10 | 50 |
| `claude-opus-4-8` | Claude Opus 4.8 | 1,000,000 | 128,000 | 5  | 25 |
| `claude-opus-4-7` | Claude Opus 4.7 | 1,000,000 | 128,000 | 5  | 25 |
| `claude-sonnet-4-6` | Claude Sonnet 4.6 | 1,000,000 | 128,000 | 3 | 15 |
| `claude-opus-4-6` | Claude Opus 4.6 | 1,000,000 | 128,000 | 5  | 25 |
| `claude-opus-4-5-20251101` (alias `claude-opus-4-5`) | Claude Opus 4.5 | 200,000 | 64,000 | 5 | 25 |
| `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 | 1,000,000 | 64,000 | 3 | 15 |
| `claude-haiku-4-5-20251001`  | Claude Haiku 4.5  |   200,000 | 64,000 | 1 | 5  |

Retired (not in the account list, 404 if called): Claude 2.x, Instant, all Claude 3.x, Sonnet 4,
Opus 4, Opus 4.1 (retired 2026-08-05).
Existing data bug: `CLAUDE_4_5_OPUS` in the repo is priced 15/75; real price is 5/25.

### BLOCKING finding — the Anthropic route must change or the new models 400

`app/api/chat/anthropic/route.ts` always sends `temperature` and, when a thinking level is set,
`thinking: { type: "enabled", budget_tokens }`. On Claude Sonnet 5 / Opus 5 / Fable 5 / Opus 4.7 / Opus 4.8:
- `temperature` (non-default) -> HTTP 400 (removed on 4.7+, non-default rejected on Sonnet 5)
- `budget_tokens` -> HTTP 400 (removed; use `thinking: { type: "adaptive" }` + `output_config.effort`)
- Fable 5: thinking cannot be disabled (`type: "disabled"` -> 400); omit the param instead
- `thinking.display` defaults to `"omitted"` on 4.7+/5 — the route's "🤔 Thinking Process" output
  would be blank unless we send `display: "summarized"`

Installed `@anthropic-ai/sdk` is **0.39.0** — its types have no `adaptive`, `display`, or
`output_config`. Latest is **0.120.0** (verified: `ThinkingConfigAdaptive`, `display`, `effort` present).
The route only uses `messages.create({ stream: true })` + stream events, which are unchanged.
Only two files import the SDK: `route.ts` and the dead `route_v1.ts`.

### OpenAI route — works as-is, thinking level is ignored for GPT-5.x (pre-existing)

`app/api/chat/openai/route.ts` only maps `thinkingLevel -> reasoning_effort` for `o3-mini` / `o4-mini`.
GPT-5.1 today (and the new GPT-5.x) get `temperature: 1` and no `reasoning_effort`, so the UI's
thinking selector does nothing for them. Installed `openai` 4.104.0 types `ReasoningEffort` as
`'low' | 'medium' | 'high' | null` (no `'none'`/`'xhigh'`), so a full fix needs an SDK bump — out of scope.

### Type-check baseline

`npx tsc --noEmit` = **54 errors** before any change (exit 2). 14 are in `lib/model-capabilities.ts`
(`implementation` / `levels` are not in `ThinkingCapability`), 1 in `lib/chat-setting-limits.ts`
(missing keys), 0 in either route. Success criterion: count does not go up and no new errors in
touched files.

---

## Decisions / Assumptions (confirm before coding)

1. ~~Old IDs stay in types/limits/capabilities~~ **Superseded by Lecole's choice (full cleanup):** retired
   IDs are commented out in `types/llms.ts`, `chat-setting-limits.ts` and `model-capabilities.ts` too.
   The dead comparisons this exposed in `azure` / `groq` / `deepseek` routes got an `as string` cast
   (behaviour unchanged). Note: a saved chat that still points at a retired model now falls through to
   the UI fallback limits (`chat-settings-form.tsx` `|| {...}`) and the provider returns a model-not-found error.
2. **New OpenAI entries use alias IDs** (`gpt-5.5`, not `gpt-5.5-2026-04-23`), same as `gpt-5.1` today.
3. **Claude display names follow the file's existing `Claude {ver} {tier}` convention**
   (`Claude 5 Opus`, `Claude 4.8 Opus`) to match `Claude 4.5 Haiku`. Say if you prefer official
   names (`Claude Opus 5`).
4. **`MODEL_CAPABILITIES` new entries use the type-correct shape** `{ thinking: { supported: true } }`
   without the `implementation` / `levels` props (those are what cause the 14 baseline errors).
5. **Package manager: yarn** (`node_modules/.yarn-integrity` present, no npm marker; `yarn.lock` exists but is untracked, `package-lock.json` is tracked — confirm which lockfile you want updated).
6. No commits, no `npm run build`, no pushes.

---

## Task Breakdown

**Task 1: OpenAI model list** — `lib/models/llm/openai-llm-list.ts`
- [x] Add consts `GPT56Sol`, `GPT56Terra`, `GPT56Luna`, `GPT55`, `GPT54`, `GPT54Mini`, `GPT54Nano`, `GPT52` (values from table above)
- [x] `OPENAI_LLM_LIST` active: GPT56Sol, GPT56Terra, GPT56Luna, GPT55, GPT54, GPT54Mini, GPT54Nano
- [x] `OPENAI_LLM_LIST` commented (defined, superseded): GPT52, GPT51, GPT5, GPT5Mini, GPT5Nano, GPT41, GPT41Mini, GPT41Nano, O3, O3Pro, GPTo4Mini
- [x] Comment out definitions (retired / very old): GPTo3Mini, GPT4o, GPT4oMini, GPT4o1120, GPT4Vision, GPT45Preview, GPT4, GPT3_5Turbo (o1 / o1-mini already are)
- [x] Update the `(UPDATED ...)` header date

**Task 2: Anthropic model list** — `lib/models/llm/anthropic-llm-list.ts`
- [x] Add consts `CLAUDE_OPUS_5`, `CLAUDE_SONNET_5`, `CLAUDE_FABLE_5`, `CLAUDE_OPUS_4_8`, `CLAUDE_OPUS_4_7`, `CLAUDE_SONNET_4_6`, `CLAUDE_OPUS_4_6`
- [x] `ANTHROPIC_LLM_LIST` active: OPUS_5, SONNET_5, FABLE_5, OPUS_4_8, SONNET_4_6, CLAUDE_4_5_HAIKU
- [x] `ANTHROPIC_LLM_LIST` commented (defined, superseded): OPUS_4_7, OPUS_4_6, CLAUDE_4_5_SONNET, CLAUDE_4_5_OPUS
- [x] Comment out definitions (retired): CLAUDE_2, CLAUDE_INSTANT, CLAUDE_3_HAIKU, CLAUDE_3_5_HAIKU, CLAUDE_3_SONNET, CLAUDE_3_OPUS, CLAUDE_3_5_SONNET, CLAUDE_3_7_SONNET, CLAUDE_4_SONNET, CLAUDE_4_1_OPUS
- [x] (optional) Fix `CLAUDE_4_5_OPUS` pricing 15/75 -> 5/25
- [x] Update the `(UPDATED ...)` header date

**Task 3: Model ID types** — `types/llms.ts`
- [x] `OpenAILLMID` += `"gpt-5.6-sol" | "gpt-5.6-terra" | "gpt-5.6-luna" | "gpt-5.5" | "gpt-5.4" | "gpt-5.4-mini" | "gpt-5.4-nano" | "gpt-5.2"`
- [x] `AnthropicLLMID` += `"claude-opus-5" | "claude-sonnet-5" | "claude-fable-5" | "claude-opus-4-8" | "claude-opus-4-7" | "claude-sonnet-4-6" | "claude-opus-4-6"`

**Task 4: Chat setting limits** — `lib/chat-setting-limits.ts` (required: `Record<LLMID>` must be complete)
- [x] Anthropic x7: `MIN 0.0 / MAX 1.0 / OUT 128000 / CTX 1000000`
- [x] OpenAI `gpt-5.6-*`, `gpt-5.5`, `gpt-5.4`: `MIN 1.0 / MAX 1.0 / OUT 128000 / CTX 1050000`
- [x] OpenAI `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.2`: `MIN 1.0 / MAX 1.0 / OUT 128000 / CTX 400000`
  (MIN = MAX = 1.0 is the file's existing GPT-5 convention: these models only accept default temperature)

**Task 5: Thinking capabilities** — `lib/model-capabilities.ts`
- [x] Add `{ thinking: { supported: true } }` for the 7 new Claude IDs and the 8 new OpenAI IDs so the UI shows the thinking selector

**Task 6: Anthropic route — adaptive thinking + SDK bump** (REQUIRED for the new Claude models)
- [x] `package.json`: `"@anthropic-ai/sdk": "^0.120.0"` then `yarn install` (or npm — per your answer)
- [x] `app/api/chat/anthropic/route.ts`: add `const ADAPTIVE_THINKING_MODELS = new Set<string>([...7 new IDs])`
- [x] Build the request params per model family:
  - legacy (Haiku 4.5 / Sonnet 4.5 / Opus 4.5): **unchanged** (`temperature` + `budget_tokens`)
  - adaptive family: no `temperature`; `thinkingLevel` `none`/unset -> omit `thinking`;
    `low`/`medium`/`high` -> `thinking: { type: "adaptive", display: "summarized" }` + `output_config: { effort: thinkingLevel }`
  - Behaviour note: with `none`, Sonnet 5 / Opus 5 / Fable 5 still run adaptive thinking at default effort (can't be turned off cleanly); 4.6 / 4.7 / 4.8 run without thinking
- [x] Re-run tsc; confirm `route_v1.ts` did not gain errors from the SDK bump

**Task 7 (optional): OpenAI route — thinking level for GPT-5.x** — `app/api/chat/openai/route.ts`
- [x] Extend the `o3-mini || o4-mini` check to the GPT-5.x IDs so `low`/`medium`/`high` map to `reasoning_effort`
- [x] Limitation: `none` cannot be sent with `openai` 4.104 types -> model default applies (`none` on <=5.4, `medium` on 5.5 / 5.6)

**Task 8 (optional): Fable 5 refusal notice** — `app/api/chat/anthropic/route.ts`
- [x] On `message_delta` with `stop_reason === "refusal"`, enqueue a visible line (`⚠️ The model declined this request.`) so the reply is not silently empty (fail loud)

**Task 9: Verification**
- [x] `npx tsc --noEmit` error count <= 54, no new errors in touched files
- [x] `npx prettier --check` on touched files
- [x] Direct API smoke test of the exact request shapes the routes will send (one tiny call each to `claude-opus-5` with adaptive thinking and `gpt-5.6-sol` with `reasoning_effort`; ~$0.01 total)
- [x] Update this file: progress counters, review section

---

## Definition of Done

- New models appear in the dropdown for users with the provider key set
- Old models are commented out (still greppable), nothing deleted
- Anthropic route sends a valid request for every active Claude model
- tsc error count not increased; prettier clean on touched files
- No commits / builds / pushes made

---

---

## Review (2026-08-25)

### What changed
| File | Change |
|---|---|
| `lib/models/llm/openai-llm-list.ts` | +8 models (GPT-5.6 Sol/Terra/Luna, 5.5, 5.4, 5.4 Mini, 5.4 Nano, 5.2). Active: the 7 newest. Retired definitions commented out (o3-mini, GPT-4o x3, GPT-4 Vision, GPT-4.5 Preview, GPT-4, GPT-3.5). GPT-5.2/5.1/5.x/4.1/o3/o4-mini stay defined, commented in the export. |
| `lib/models/llm/anthropic-llm-list.ts` | +7 models (5 Sonnet/Opus/Fable, 4.8/4.7/4.6 Opus, 4.6 Sonnet). Active: 5 Sonnet, 5 Opus, 5 Fable, 4.8 Opus, 4.6 Sonnet, 4.5 Haiku. Claude 2/Instant/3.x/Sonnet 4/Opus 4.1 definitions commented out. Opus 4.5 pricing fixed 15/75 -> 5/25. |
| `types/llms.ts` | +15 IDs; 21 retired IDs commented out (incl. stale `o4-mini-2025-04-16`). |
| `lib/chat-setting-limits.ts` | +16 entries (15 new + `o3-2025-04-16`, which was missing and caused a baseline TS2739); 20 retired entries commented out. |
| `lib/model-capabilities.ts` | +15 thinking entries; 6 retired commented out. `ThinkingCapability` type gained optional `implementation` / `levels` so the existing entries type-check (removed 14 baseline errors). |
| `app/api/chat/anthropic/route.ts` | `ADAPTIVE_THINKING_MODELS` branch: no `temperature`, `thinking: adaptive + display: summarized`, `output_config.effort`; legacy 4.5 models unchanged. Refusal notice on `stop_reason: "refusal"`. |
| `app/api/chat/openai/route.ts` | `REASONING_EFFORT_MODELS` set (o3, o4-mini, all GPT-5.x) replaces the `o3-mini || o4-mini` check; dead GPT-4o/4-vision `max_tokens` block commented out; request typed `ChatCompletionCreateParamsStreaming` (fixes a `for await` over `Stream | ChatCompletion`). |
| `app/api/chat/azure|groq|deepseek/route.ts` | `as string` casts on comparisons against retired IDs - no behaviour change; only so tsc does not regress. |
| `package.json` / `yarn.lock` | `@anthropic-ai/sdk` ^0.39.0 -> ^0.120.0 (`yarn install`). `package-lock.json` untouched (was already stale). |

### Verification
- `npx tsc --noEmit`: **54 -> 41 errors**. Every remaining error existed at baseline except 3 in the dead
  backup `app/api/chat/openai/route_v1.ts` (comparisons against removed IDs) - left alone on purpose.
- The TS2504 (`for await` over a `Stream | ChatCompletion` union) that briefly appeared in the OpenAI
  route was proven pre-existing by swapping the untouched route back in (it then reports in `deepseek`
  instead); fixed properly in the OpenAI route with the streaming params type.
- `prettier --check`: clean on all touched files (project config).
- Live API smoke tests (exact route request shapes, ~$0.02 total): PASS for claude-opus-5 (effort medium,
  summarized thinking streamed), claude-sonnet-5, claude-sonnet-4-6, claude-fable-5 (no thinking param),
  claude-opus-4-8, claude-haiku-4-5 (legacy temp+budget), claude-opus-4-5 (legacy temp);
  gpt-5.6-sol / gpt-5.5 (`reasoning_effort: low`), gpt-5.4-nano / gpt-5.6-luna (no effort).
  Negative controls: the OLD route shape on claude-sonnet-5 returns 400
  (`"thinking.type.enabled" is not supported for this model. Use "thinking.type.adaptive"`).
- Not run: the Next dev server / UI click-through (needs a Supabase session).

### Known limitations / follow-ups (not done, by design)
- Thinking level `none` on GPT-5.5 / GPT-5.6 sends no `reasoning_effort`, so the model default (`medium`)
  applies. Sending `"none"` needs `openai` >= 5.x types (currently 4.104).
- Temperature slider is inert for Claude 4.6+ (the route does not send it); limits kept at 0.0-1.0 per plan.
  Could be set to 1.0/1.0 like the GPT-5 entries if you want the UI to show it as fixed.
- Claude 5 Fable requires 30-day data retention on the Anthropic org; the route now shows a refusal notice
  but does not use server-side fallbacks.
- `app/api/chat/openai/route_v1.ts` / `anthropic/route_v1.ts` are dead backups with type errors.

# ARCHIVE — previous task list (completed 2026-01-29)

# Task List: Add Together AI Support

**Version:** 2.0
**Date Created:** 2026-01-29
**Date Completed:** 2026-01-29
**Status:** Completed - Full Integration
**Progress:** 13/13 tasks completed

---

## Overview

Add full support for **Together AI** - a new provider requiring complete integration from scratch.

---

## Discovery Findings

### Together AI Current State
- ❌ Model list missing
- ❌ Route handler missing
- ❌ Type definitions missing
- ❌ API key configuration missing

---

## Task Breakdown

**Task 1: Create Together AI model list** ✅
- [x] Create `lib/models/llm/togetherai-llm-list.ts`
- [x] Define available Together AI models with proper metadata
- [x] Set correct `hostedId` values matching Together AI API
- [x] Add provider = "togetherai"
- [x] All models defined (5 total)
- **Status:** Completed

**Task 2: Add Together AI route handler** ✅
- [x] Create `app/api/chat/togetherai/route.ts`
- [x] Implement custom streaming using ReadableStream pattern
- [x] Handle API key validation and errors
- [x] Support text messages
- [x] Match existing streaming pattern (matches Groq implementation)
- **Status:** Completed

**Task 3: Update type definitions** ✅
- [x] Add "togetherai" to `ModelProvider` type in `types/models.ts`
- [x] Add `TogetheraILLMID` type with all 5 models in `types/llms.ts`
- [x] Add `TOGETHERAI_API_KEY` to `types/valid-keys.ts`
- **Status:** Completed

**Task 4: Update API key handling** ✅
- [x] Update `lib/server/server-chat-helpers.ts` to handle togetherai_api_key
- [x] Together AI key is loaded from env and injected into profile
- **Status:** Completed

**Task 5: Register Together AI models** ✅
- [x] Update `lib/models/llm/llm-list.ts` to import and export Together AI models
- [x] Add togetherai to LLM_LIST_MAP
- **Status:** Completed

---

## Implementation Notes

### Together AI Considerations
- Together AI provides OpenAI-compatible API
- Can potentially use OpenAI SDK with custom baseURL
- API endpoint: https://api.together.xyz/v1 (or similar)
- Streaming should work via OpenAI SDK iteration if using compatible endpoint

---

## Definition of Done

✅ All 5 tasks marked complete
✅ Together AI routes working and tested
✅ Provider appears in UI model selector
✅ API keys properly configured
✅ No breaking changes to existing code
✅ Code follows existing patterns and conventions

---

## Complete Implementation Checklist

### Core Integration Tasks
- [x] **Task 1:** Create Together AI model list (`lib/models/llm/togetherai-llm-list.ts`)
- [x] **Task 2:** Add Together AI route handler (`app/api/chat/togetherai/route.ts`)
- [x] **Task 3:** Update type definitions (ModelProvider, LLMID, VALID_ENV_KEYS)
- [x] **Task 4:** Update API key handling (server-chat-helpers.ts)
- [x] **Task 5:** Register Together AI models (llm-list.ts)

### UI & Frontend Tasks
- [x] **Task 6:** Update model fetching (fetch-models.ts)
- [x] **Task 7:** Add model icons (model-icon.tsx)
- [x] **Task 8:** Update API keys endpoint (app/api/keys/route.ts)

### Configuration & Documentation
- [x] **Task 9:** Update environment example (.env.local.example)
- [x] **Task 10:** Add TypeScript types for database columns (supabase/types.ts)
- [x] **Task 11:** Add chat setting limits for all models (chat-setting-limits.ts)
- [x] **Task 12:** Add DeepSeek support (missing from previous implementation)

### Documentation
- [x] **Task 13:** Update task list with complete summary

---

## Implementation Summary

### Files Created
1. **lib/models/llm/togetherai-llm-list.ts** - Model definitions for 6 Together AI models:
   - Kimi K2.5 (moonshotai/Kimi-K2.5)
   - DeepSeek V3.1 (deepseek-ai/DeepSeek-V3.1)
   - GPT-OSS 120B (openai/gpt-oss-120b)
   - GPT-OSS 20B (openai/gpt-oss-20b)
   - Qwen3 80B Thinking (Qwen/Qwen3-Next-80B-A3B-Thinking)
   - Qwen3 Coder 480B (Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8)

2. **app/api/chat/togetherai/route.ts** - API route handler with:
   - OpenAI SDK integration with Together AI baseURL (https://api.together.xyz/v1)
   - Stream-based response handling
   - API key validation and error handling
   - Temperature and max_tokens configuration

### Files Modified (13 total)
1. **types/llms.ts** - Added TogetheraILLMID type with 6 model IDs
2. **types/models.ts** - Added "togetherai" to ModelProvider enum
3. **types/valid-keys.ts** - Added TOGETHERAI_API_KEY to VALID_ENV_KEYS
4. **lib/server/server-chat-helpers.ts** - Added togetherai_api_key and deepseek_api_key mapping
5. **lib/models/llm/llm-list.ts** - Imported TOGETHERAI_LLM_LIST and registered in LLM_LIST and LLM_LIST_MAP
6. **lib/models/fetch-models.ts** - Added "deepseek" and "togetherai" to providers array
7. **app/api/keys/route.ts** - Added deepseek and togetherai to envKeyMap
8. **lib/chat-setting-limits.ts** - Added ChatSettingLimits for all 6 Together AI models + DeepSeek
9. **components/models/model-icon.tsx** - Added cases for "deepseek" and "togetherai" providers
10. **.env.local.example** - Added DEEPSEEK_API_KEY and TOGETHERAI_API_KEY documentation
11. **supabase/types.ts** - Added deepseek_api_key and togetherai_api_key to profiles table (Row, Insert, Update)

### Design Decisions
- Followed OpenAI SDK pattern (same as Groq) since Together AI provides OpenAI-compatible APIs
- All 6 requested models included in one implementation
- Text-only support (no vision) as Together AI models in the selection don't support images
- Added Qwen3 Coder 480B model for specialized code generation support
- Used custom streaming with ReadableStream pattern matching existing codebase

### How It Works Now

1. **Models are registered** - All 6 Together AI models are registered in the model list and will appear in the UI dropdown
2. **API keys are stored** - togetherai_api_key is stored in the profiles table (database) and can also be set via TOGETHERAI_API_KEY environment variable
3. **Routes are configured** - API calls to /api/chat/togetherai are routed to the Together AI handler
4. **Chat settings work** - Temperature, max_tokens, and context length are properly configured for each model
5. **Model selection works** - Models appear dynamically in the UI based on whether the user has the API key configured

### What Happens When User Selects a Together AI Model

1. User selects any of the 6 Together AI models from the dropdown
2. Frontend sends chat request to `/api/chat/togetherai` endpoint
3. Route handler:
   - Loads togetherai_api_key from user profile (from database or env)
   - Validates the key exists
   - Creates OpenAI SDK client with Together AI baseURL
   - Sends request to Together AI API
   - Streams response back as text
4. Response displays in chat UI

### Status: READY FOR PRODUCTION
✅ All code changes complete
✅ All types properly defined
✅ All API routes configured
✅ All UI components updated
✅ Environment variables documented
✅ Database types updated
✅ Chat settings configured for all models

**Users with TOGETHERAI_API_KEY set can now use all 6 Together AI models immediately.**
