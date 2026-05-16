/**
 * Model capability badge detection — shared across mobile & desktop model pickers.
 *
 * Badges:
 *   🖼 Vision  — accepts image inputs
 *   💻 Code    — optimized for coding / software engineering
 *   🧠 Think   — extended reasoning / chain-of-thought
 *   ⚡ Fast    — small, cheap, low-latency tier
 *   🎙 Voice   — speech / audio generation
 *   📝 Write   — strong creative / long-form writing
 *   🔬 Research — strong analysis / factual accuracy
 */

export type CapabilityBadge = {
  emoji: string
  label: string
  pillClass: string
}

/**
 * Detect capabilities from a model ID string (e.g. "anthropic/claude-sonnet-4",
 * "deepseek-r1", "gemini-2.5-pro"). Returns an array of badge descriptors.
 */
export function getModelCapabilities(modelId: string): CapabilityBadge[] {
  const m = modelId.toLowerCase()
  const caps: CapabilityBadge[] = []

  // ─── 🖼 Vision ────────────────────────────────────────────────────
  // Models that accept image / multimodal input
  if (
    // Generic vision keywords
    m.includes('vision') ||
    m.includes('vl') ||
    m.includes('llava') ||
    m.includes('pix') ||
    m.includes('multimodal') ||
    // Qwen VL family
    m.includes('qwen-vl') ||
    m.includes('qwen2-vl') ||
    m.includes('qwen2.5-vl') ||
    m.includes('qvq') ||
    // Claude 3+ (all Sonnet/Opus/Haiku from 3 onward have vision)
    m.includes('claude-3') ||
    m.includes('claude-sonnet') ||
    m.includes('claude-opus') ||
    m.includes('claude-haiku') ||
    // Gemini (all production Gemini models have vision)
    m.includes('gemini') ||
    // GPT-4o / GPT-4 Turbo / GPT-4.1 all have vision
    m.includes('gpt-4o') ||
    m.includes('gpt-4-turbo') ||
    m.includes('gpt-4.1') ||
    m.includes('gpt-4.5') ||
    // o-series (o1, o3, o4-mini) have vision when not "-mini" base
    m.includes('o1-') ||
    m.includes('o3-') ||
    m.includes('o4-mini') ||
    // Grok
    m.includes('grok-2') ||
    // MiniMax m2.x
    m.includes('minimax-m2') ||
    // GLM-4V / GLM-5
    m.includes('glm-4v') ||
    (m.includes('glm-5') && !m.includes('glm-5.1')) ||  // glm-5 but not glm-5.1 (text-only)
    // Llama 4 Scout/Maverick (multimodal)
    m.includes('llama-4') ||
    m.includes('llama4') ||
    // DeepSeek V3 (has vision via VL variant)
    m.includes('deepseek-vl') ||
    // Mistral Pixtral
    m.includes('pixtral') ||
    // MiniCPM-V
    m.includes('minicpm-v') ||
    // InternVL
    m.includes('internvl') ||
    // CogVLM
    m.includes('cogvlm')
  ) {
    caps.push({
      emoji: '🖼',
      label: 'Vision',
      pillClass: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    })
  }

  // ─── 💻 Code ───────────────────────────────────────────────────────
  // Models optimized for coding / software engineering
  if (
    // Generic code keywords
    m.includes('code') ||
    m.includes('coder') ||
    m.includes('coding') ||
    // Claude — Sonnet & Opus are SOTA at code
    m.includes('claude-sonnet') ||
    m.includes('claude-opus') ||
    m.includes('claude-code') ||
    // Codex / Devstral
    m.includes('codex') ||
    m.includes('devstral') ||
    // DeepSeek Coder / V3 (strong code)
    m.includes('deepseek-coder') ||
    m.includes('deepseek-v3') ||
    m.includes('deepseek-chat') ||
    // Qwen 2.5 / 3 Coder
    m.includes('qwen2.5-coder') ||
    m.includes('qwen3-coder') ||
    m.includes('qwen-coder') ||
    // GLM-5 (strong code)
    m.includes('glm-5') ||
    // GPT-4.1 (code-optimized)
    m.includes('gpt-4.1') ||
    // Gemini 2.5 Pro (good code)
    m.includes('gemini-2.5-pro') ||
    // Llama 4 Maverick (good code)
    m.includes('llama-4-maverick') ||
    m.includes('llama4-maverick') ||
    // Grok 3 (strong code)
    m.includes('grok-3') ||
    // Mistral Codestral
    m.includes('codestral')
  ) {
    caps.push({
      emoji: '💻',
      label: 'Code',
      pillClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    })
  }

  // ─── 🧠 Think ──────────────────────────────────────────────────────
  // Models with extended reasoning / chain-of-thought
  if (
    // OpenAI o-series
    m.includes('o1') ||
    m.includes('o3') ||
    m.includes('o4-mini') ||
    // Generic thinking/reasoning keywords
    m.includes('reason') ||
    m.includes('thinking') ||
    // DeepSeek R1
    m.includes('deepseek-r1') ||
    // QwQ
    m.includes('qwq') ||
    // Qwen3 (has thinking mode)
    m.includes('qwen3-') ||
    // Gemini 2.5 Flash/Pro (thinking mode)
    m.includes('gemini-2.5') ||
    // Claude Opus 4 / Sonnet 4 (extended thinking)
    m.includes('claude-opus-4') ||
    m.includes('claude-sonnet-4') ||
    // GLM-5 (thinking mode)
    m.includes('glm-5') ||
    // Grok 3 (reasoning mode)
    m.includes('grok-3') ||
    // MiniMax m2 (limited thinking)
    m.includes('minimax-m2') ||
    // Kimi / moonshot family
    m.includes('kimi-k2') ||
    m.includes('moonshot-') ||
    // Llama 4 (some reasoning)
    m.includes('llama-4') ||
    m.includes('llama4') ||
    // Mimo V2 (MiniMax creative writing tier)
    m.includes('mimo-v2') ||
    m.includes('mimo-v2.5') ||
    // DeepSeek V4 (reasoning variant)
    m.includes('deepseek-v4') ||
    // Qwen 3.6 / 3.5 (thinking mode)
    m.includes('qwen3.6') ||
    m.includes('qwen3.5') ||
    m.includes('qwen-3.6') ||
    m.includes('qwen-3.5')
  ) {
    caps.push({
      emoji: '🧠',
      label: 'Think',
      pillClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    })
  }

  // ─── ⚡ Fast ───────────────────────────────────────────────────────
  // Small / cheap / low-latency models
  if (
    // Generic fast/mini/lite keywords
    m.includes('mini') ||
    m.includes('fast') ||
    m.includes('lite') ||
    // Claude Haiku
    m.includes('haiku') ||
    // GPT-4o-mini
    m.includes('gpt-4o-mini') ||
    m.includes('gpt-4.1-mini') ||
    m.includes('gpt-4.1-nano') ||
    // Gemini Flash
    m.includes('gemini-flash') ||
    m.includes('gemini-2.0-flash') ||
    m.includes('gemini-2.5-flash') ||
    // DeepSeek Chat (distilled, cheaper than R1)
    m.includes('deepseek-chat') ||
    m.includes('deepseek-v3') ||
    // Qwen smaller variants
    m.includes('qwen2.5-0') ||
    m.includes('qwen2.5-1') ||
    m.includes('qwen2.5-3') ||
    m.includes('qwen2.5-7') ||
    // Llama 4 Scout (smaller than Maverick)
    m.includes('llama-4-scout') ||
    m.includes('llama4-scout') ||
    // Grok 3 Mini
    m.includes('grok-3-mini') ||
    // Phi
    m.includes('phi-') ||
    // MiniCPM
    m.includes('minicpm') ||
    // MiniMax M2 (fast creative tier)
    m.includes('minimax-m2') ||
    // Kimi K2.5 (smaller than K2.6)
    m.includes('kimi-k2.5') ||
    // Qwen 3.5 (smaller than 3.6)
    m.includes('qwen3.5') ||
    m.includes('qwen3.5-plus') ||
    // DeepSeek V4 Flash (fast variant)
    m.includes('deepseek-v4-flash') ||
    // Mimo V2 (fast creative)
    m.includes('mimo-v2.5')
  ) {
    caps.push({
      emoji: '⚡',
      label: 'Fast',
      pillClass: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    })
  }

  // ─── 🎙 Voice ──────────────────────────────────────────────────────
  // Speech / audio models
  if (
    m.includes('whisper') ||
    m.includes('tts') ||
    m.includes('xtts') ||
    m.includes('bark') ||
    m.includes('speech') ||
    m.includes('parler') ||
    m.includes('voice') ||
    m.includes('voxtral')
  ) {
    caps.push({
      emoji: '🎙',
      label: 'Voice',
      pillClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    })
  }

  // ─── 📝 Write ──────────────────────────────────────────────────────
  // Strong creative / long-form writing models
  if (
    // Claude Opus / Sonnet 4 (excellent writers)
    m.includes('claude-opus') ||
    m.includes('claude-sonnet-4') ||
    // GPT-4.5 (designed for creative)
    m.includes('gpt-4.5') ||
    // Gemini 2.5 Pro (strong writing)
    m.includes('gemini-2.5-pro') ||
    // MiniMax m2 (known for creative writing in CN)
    m.includes('minimax-m2') ||
    // GLM-5 (strong CN writing)
    m.includes('glm-5') ||
    // Qwen3 (good writing)
    m.includes('qwen3-') ||
    m.includes('qwen3.6') ||
    m.includes('qwen3.5') ||
    // Grok (casual / creative)
    m.includes('grok-2') ||
    m.includes('grok-3') ||
    // Kimi K2 (Mooncake-based, strong CN writing)
    m.includes('kimi-k2') ||
    // Mimo V2 (MiniMax creative writing series)
    m.includes('mimo-v2') ||
    m.includes('mimo-v2.5') ||
    // GLM-5 (strong CN writing)
    m.includes('glm-5') ||
    // DeepSeek V4 (creative variant)
    m.includes('deepseek-v4')
  ) {
    caps.push({
      emoji: '📝',
      label: 'Write',
      pillClass: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    })
  }

  // ─── 🔬 Research ───────────────────────────────────────────────────
  // Strong analysis / factual / research models (typically large + thinking)
  if (
    // Claude Opus 4 (top-tier analysis)
    m.includes('claude-opus-4') ||
    // o1 / o3 (reasoning for research)
    m.includes('o1-') ||
    m.includes('o3-') ||
    // DeepSeek R1 (STEM reasoning)
    m.includes('deepseek-r1') ||
    // Gemini 2.5 Pro (long context + analysis)
    m.includes('gemini-2.5-pro') ||
    // QwQ (research reasoning)
    m.includes('qwq') ||
    // GPT-4.5 (research)
    m.includes('gpt-4.5') ||
    // Qwen 3.6 Plus (large reasoning model)
    m.includes('qwen3.6') ||
    m.includes('qwen-3.6') ||
    // Kimi K2.6 (largest Kimi model, research-tier)
    m.includes('kimi-k2.6') ||
    // GLM-5 (large reasoning + analysis)
    m.includes('glm-5') ||
    // DeepSeek V4 Pro (top-tier analysis)
    m.includes('deepseek-v4-pro')
  ) {
    caps.push({
      emoji: '🔬',
      label: 'Research',
      pillClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    })
  }

  return caps
}