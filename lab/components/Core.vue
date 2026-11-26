<script setup lang="ts">
// 핵심 한 줄. 슬라이드의 결론을 크게 적는다. 슬라이드의 마지막 블록으로 두면 맨 아래에 붙는다(styles/lecture.css).
//   color: py(기본) | vi | ai | ok | yellow | warn | danger | muted 또는 CSS 색
import { computed } from 'vue'
const props = withDefaults(defineProps<{ color?: string }>(), { color: 'py' })
const NAMED = ['py', 'vi', 'ai', 'ok', 'yellow', 'warn', 'danger', 'muted']
const accent = computed(() => NAMED.includes(props.color) ? `var(--${props.color})` : props.color)
</script>

<template>
  <p class="core" :style="{ '--c': accent }"><slot /></p>
</template>

<style>
html.lecture .slidev-layout .core {
  position: relative;
  margin: 0.6rem 0 0;
  padding: 0.85rem 1.2rem 0.85rem 1.5rem;
  font-size: 1.18rem;
  font-weight: 650;
  line-height: 1.45;
  color: var(--heading);
  background: linear-gradient(90deg, color-mix(in srgb, var(--c) 14%, transparent), color-mix(in srgb, var(--c) 3%, transparent));
  border: 1px solid color-mix(in srgb, var(--c) 24%, transparent);
  border-radius: var(--r);
}
html.lecture .slidev-layout .core::before {
  content: "";
  position: absolute;
  left: 0.6rem;
  top: 0.75rem;
  bottom: 0.75rem;
  width: 4px;
  border-radius: 0;
  background: var(--c);
}
</style>
