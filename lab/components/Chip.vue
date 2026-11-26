<script setup lang="ts">
// 칩. 글 사이에 끼우는 작은 직각 라벨(분류 · 난이도 · 상태). 줄 맨 앞에 오면 줄 전체를 <p> 로 감싼다.
//   kind:  soft(기본, 옅은 바탕) | outline(테두리만) | fill(색 바탕에 흰 글자)
//   color: py(기본) | vi | ai | ok | yellow | warn | danger | muted 또는 CSS 색
import { computed } from 'vue'
const props = withDefaults(defineProps<{ kind?: 'soft' | 'outline' | 'fill' | 'dashed'; color?: string }>(), { kind: 'soft', color: 'py' })
const NAMED = ['py', 'vi', 'ai', 'ok', 'yellow', 'warn', 'danger', 'muted']
const accent = computed(() => NAMED.includes(props.color) ? `var(--${props.color})` : props.color)
</script>

<template>
  <span class="chip" :class="kind" :style="{ '--c': accent }"><slot /></span>
</template>

<style>
html.lecture .chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.12em 0.7em;
  margin-right: 0.25em;
  font-size: 0.78rem;
  font-weight: 650;
  line-height: 1.6;
  white-space: nowrap;
  vertical-align: 0.08em;
  color: var(--c);
  background: color-mix(in srgb, var(--c) 13%, transparent);
  border: 1px solid transparent;
  border-radius: 0;
}
html.lecture .chip.outline { background: none; border-color: color-mix(in srgb, var(--c) 55%, transparent); }
html.lecture .chip.dashed { background: none; border: 1px dashed color-mix(in srgb, var(--c) 60%, transparent); }
html.lecture .chip.fill { color: var(--bg); background: var(--c); }
</style>
