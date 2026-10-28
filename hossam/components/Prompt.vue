<script setup lang="ts">
// 오늘의 프롬프트 상자 + 복사 버튼. 슬롯에는 ````text 코드 펜스(4개 백틱)로 프롬프트를 넣는다.
// cols: 단 수(기본 1). 2 면 프롬프트 글이 두 단으로 이어 흐른다(긴 프롬프트를 빈 줄 그대로 한 슬라이드에). 복사 버튼은 전체를 복사한다.
import { ref } from 'vue'
withDefaults(defineProps<{ cols?: number | string }>(), { cols: 1 })
const box = ref<HTMLElement | null>(null)
const done = ref(false)
async function copy() {
  const text = box.value?.innerText ?? ''
  try { await navigator.clipboard.writeText(text) } catch { /* 클립보드 불가 환경 무시 */ }
  done.value = true; setTimeout(() => (done.value = false), 1500)
}
</script>

<template>
  <div class="prompt">
    <div class="prompt-head">📋 오늘의 프롬프트 (AI에게 지시하기)</div>
    <button class="copy" @click="copy">{{ done ? '복사됨 ✓' : '복사' }}</button>
    <div ref="box" class="prompt-body" :style="{ '--prompt-cols': cols }"><slot /></div>
  </div>
</template>

<style scoped>
.prompt { position: relative; border: 1px solid var(--line); border-left: 5px solid var(--ai); background: var(--ai-soft); border-radius: 14px; padding: 0.7rem 1rem 0.5rem; margin: 0.5rem 0; }
.prompt-head { font-size: 1.1rem; font-weight: 800; letter-spacing: 0.02em; color: var(--ai); margin-bottom: 0.2rem; }   /* 본문(1rem)보다 크게 */
.prompt-body :deep(pre), .prompt-body :deep(.slidev-code) { background: transparent !important; border: none !important; padding: 0 !important; margin: 0 !important; font-family: inherit !important; }
.prompt-body :deep(pre) { column-count: var(--prompt-cols, 1); column-gap: 2rem; column-rule: 1px solid var(--line); }   /* cols 가 2 이상이면 다단 */
.prompt-body :deep(code), .prompt-body :deep(.line) { font-family: "Pretendard Variable", Pretendard, sans-serif !important; font-size: 1rem; line-height: 1.6; color: var(--text) !important; white-space: pre-wrap; word-break: break-word; }
.prompt-body :deep(span) { color: var(--text) !important; }
.copy { position: absolute; top: 0.5rem; right: 0.6rem; font-size: 0.85rem; font-weight: 700; color: var(--muted); background: var(--surface-2); border: 1px solid var(--line); border-radius: 8px; padding: 0.2em 0.65em; cursor: pointer; }
.copy:hover { color: var(--text); }
</style>
