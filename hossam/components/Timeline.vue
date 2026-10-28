<script setup lang="ts">
// 타임라인. 슬롯에 <li> 를 나열하면 선 위에 점이 찍히고 그 아래에 내용이 놓인다. <li> 안의 첫 <b> 는 시점(날짜·시간·단계 이름).
// <li class="now"> 는 점을 채워 "지금 여기"로 강조한다. vertical 을 주면 세로(왼쪽 선)로 놓인다(항목이 많을 때). color: py | ai | ok
withDefaults(defineProps<{ color?: string, vertical?: boolean }>(), { color: 'py', vertical: false })
</script>

<template>
  <ol class="timeline" :class="[color, { vertical }]"><slot /></ol>
</template>

<style scoped>
.timeline { --dot: 1.2rem; list-style: none; margin: 0.6rem 0; padding: 0; display: flex; }
.timeline.py { --c: var(--py); }
.timeline.ai { --c: var(--ai); }
.timeline.ok { --c: var(--ok); }
.timeline :deep(li) { position: relative; flex: 1 1 0; min-width: 0; margin: 0; padding: calc(var(--dot) + 0.8rem) 1rem 0 0; font-size: 0.95rem; line-height: 1.45; color: var(--text); }
/* 점: 바탕색으로 속을 비우고 테두리만 칠한다 */
.timeline :deep(li)::before { content: ''; position: absolute; top: 0; left: 0; z-index: 1; box-sizing: border-box; width: var(--dot); height: var(--dot); border-radius: 50%; background: var(--bg); border: 3px solid var(--c); }
/* 선: 이 점의 가운데에서 다음 점의 가운데까지 (마지막 항목은 선이 없다) */
.timeline :deep(li:not(:last-child))::after { content: ''; position: absolute; top: calc(var(--dot) / 2 - 1.5px); left: calc(var(--dot) / 2); width: 100%; height: 3px; background: var(--c); opacity: 0.4; }
.timeline :deep(li.now)::before { background: var(--c); box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 28%, transparent); }
.timeline :deep(li > b:first-child) { display: block; margin-bottom: 0.2rem; font-size: 1.05rem; font-weight: 800; color: var(--c); }
.timeline :deep(li.now > b:first-child) { color: var(--heading); }

.timeline.vertical { flex-direction: column; }
.timeline.vertical :deep(li) { padding: 0 0 1rem calc(var(--dot) + 0.9rem); }
.timeline.vertical :deep(li)::before { top: 0.18rem; }   /* 점을 첫 줄(시점) 글자 가운데에 맞춘다 */
.timeline.vertical :deep(li:not(:last-child))::after { top: calc(var(--dot) / 2); left: calc(var(--dot) / 2 - 1.5px); width: 3px; height: 100%; }
</style>
