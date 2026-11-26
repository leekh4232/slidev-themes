<script setup lang="ts">
// 타일. 직각 상자에 tag(작은 라벨) → title(굵은 제목) → value(큰 숫자) → 본문(슬롯) 순서로 쌓는다. 여러 개는 Grid 로 나란히 둔다.
//   kind:  plain(기본, 카드 바탕) | surface(연한 회색 바탕) | soft(color 를 옅게 깐 바탕) | fill(반전 바탕)
//   color: py(기본) | vi | ai | ok | yellow | warn | danger | muted | pastel-1 ~ 6 또는 CSS 색
import { computed } from 'vue'
const props = withDefaults(defineProps<{ kind?: 'plain' | 'surface' | 'soft' | 'fill'; color?: string; tag?: string; title?: string; value?: string | number }>(), { kind: 'plain', color: 'py' })
const NAMED = ['py', 'vi', 'ai', 'ok', 'yellow', 'warn', 'danger', 'muted', 'pastel-1', 'pastel-2', 'pastel-3', 'pastel-4', 'pastel-5', 'pastel-6']
const accent = computed(() => NAMED.includes(props.color) ? `var(--${props.color})` : props.color)
</script>

<template>
  <div class="tile" :class="kind" :style="{ '--c': accent }">
    <div v-if="tag" class="tile-tag">{{ tag }}</div>
    <div v-if="title" class="tile-title">{{ title }}</div>
    <div v-if="value !== undefined && value !== ''" class="tile-value">{{ value }}</div>
    <div v-if="$slots.default" class="tile-body"><slot /></div>
  </div>
</template>

<style>
html.lecture .tile {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 18px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  box-shadow: var(--sh);
  line-height: 1.45;
}
html.lecture .tile.surface { background: var(--surface-2); border-color: transparent; box-shadow: none; }
html.lecture .tile.soft {
  background: color-mix(in srgb, var(--c) 9%, var(--card));
  border-color: color-mix(in srgb, var(--c) 22%, transparent);
  box-shadow: none;
}
html.lecture .tile.fill { background: color-mix(in srgb, var(--c) 18%, var(--card)); border-color: color-mix(in srgb, var(--c) 45%, transparent); box-shadow: none; }
html.lecture .tile-tag {
  padding: 0.1em 0.65em;
  margin-bottom: 0.55rem;
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--c);
  background: color-mix(in srgb, var(--c) 15%, transparent);
  border-radius: 0;
}
html.lecture .tile-title { font-size: 1.05rem; font-weight: 750; color: var(--heading); letter-spacing: -0.02em; line-height: 1.3; }
html.lecture .tile-value { margin-top: 0.2rem; font-size: 2rem; font-weight: 800; color: var(--c); letter-spacing: -0.03em; line-height: 1.1; }
html.lecture .tile-body { margin-top: 0.45rem; font-size: 0.9rem; color: var(--fg-2); }
html.lecture .tile-body > :first-child { margin-top: 0; }
html.lecture .tile-body > :last-child { margin-bottom: 0; }
html.lecture .slidev-layout .tile-body p, html.lecture .slidev-layout .tile-body li { font-size: 0.9rem; }
html.lecture .tile-title:last-child, html.lecture .tile-tag:last-child { margin-bottom: 0; }
</style>
