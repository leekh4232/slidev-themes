<script setup lang="ts">
// 번호 목록 컴포넌트. 슬롯에 <li> 를 나열한다. Flow · Timeline 은 이 컴포넌트의 짧은 이름이다.
//   type:  list(기본) 번호 상자 세로 목록 | flow 가로 흐름도(<li> 첫 <b> 가 제목, <span> 이 설명) | timeline 선 위의 점(<li> 첫 <b> 가 시점, <li class="now"> 는 지금 여기)
//   color: py | vi | ai | ok | pastel(항목마다 여섯 색을 돌아가며). <li class="ai"> 처럼 항목에 색 이름을 주면 그 항목만 바뀐다.
//   vertical: timeline 을 세로로.  start: 첫 번호(기본 1, list · flow)
const props = withDefaults(defineProps<{ type?: 'list' | 'flow' | 'timeline'; color?: string; vertical?: boolean; center?: boolean; start?: number | string }>(), { type: 'list', color: 'py', vertical: false, center: false })
const cls = { list: 'steps', flow: 'flow', timeline: 'timeline' }[props.type] ?? 'steps'
const style = props.start !== undefined ? { counterReset: `step ${Number(props.start) - 1}` } : undefined
</script>

<template>
  <ol :class="[cls, color, { vertical, center }]" :style="style"><slot /></ol>
</template>

<style>
/* 공통: 색 */
html.lecture :is(.steps, .flow, .timeline) { --c: var(--py); list-style: none; padding: 0; margin: 0; counter-reset: step; }
html.lecture :is(.steps, .flow, .timeline).vi { --c: var(--vi); }
html.lecture :is(.steps, .flow, .timeline).ai { --c: var(--ai); }
html.lecture :is(.steps, .flow, .timeline).ok { --c: var(--ok); }
html.lecture :is(.steps, .flow, .timeline).pastel > li:nth-child(6n + 1) { --c: var(--pastel-5); }
html.lecture :is(.steps, .flow, .timeline).pastel > li:nth-child(6n + 2) { --c: var(--pastel-6); }
html.lecture :is(.steps, .flow, .timeline).pastel > li:nth-child(6n + 3) { --c: var(--pastel-1); }
html.lecture :is(.steps, .flow, .timeline).pastel > li:nth-child(6n + 4) { --c: var(--pastel-2); }
html.lecture :is(.steps, .flow, .timeline).pastel > li:nth-child(6n + 5) { --c: var(--pastel-4); }
html.lecture :is(.steps, .flow, .timeline).pastel > li:nth-child(6n + 6) { --c: var(--pastel-3); }
html.lecture :is(.steps, .flow, .timeline) > li.py { --c: var(--py); }
html.lecture :is(.steps, .flow, .timeline) > li.ai { --c: var(--ai); }
html.lecture :is(.steps, .flow, .timeline) > li.ok { --c: var(--ok); }
html.lecture :is(.steps, .flow, .timeline) > li.danger { --c: var(--danger); }

/* 세로 번호 목록: 번호 상자와 그 사이를 잇는 가는 선 */
html.lecture .slidev-layout .steps > li {
  position: relative;
  counter-increment: step;
  padding: 0.1rem 0 0.75rem 2.6rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}
html.lecture .slidev-layout .steps > li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  width: 1.75rem;
  height: 1.75rem;
  display: grid;
  place-items: center;
  font-size: 0.82rem;
  font-weight: 750;
  color: var(--c);
  background: color-mix(in srgb, var(--c) 15%, transparent);
  border: 1px solid color-mix(in srgb, var(--c) 35%, transparent);
  border-radius: 0;
}
html.lecture .slidev-layout .steps > li:not(:last-child)::after {
  content: "";
  position: absolute;
  left: calc(0.875rem - 0.5px);
  top: 1.95rem;
  bottom: 0.1rem;
  width: 1px;
  background: var(--line-2);
}
html.lecture .slidev-layout .steps > li:last-child { padding-bottom: 0; }

/* 가로 흐름도: 직각 상자가 화살표로 이어진다 */
html.lecture .slidev-layout .flow {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 1.5rem;
}
html.lecture .slidev-layout .flow > li {
  position: relative;
  counter-increment: step;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0.85rem 0.9rem 0.9rem;
  background: var(--card);
  border: 1px solid var(--line);
  border-top: 3px solid var(--c);
  border-radius: var(--r);
  box-shadow: var(--sh);
  line-height: 1.35;
}
html.lecture .slidev-layout .flow > li:not(:last-child)::after {
  content: "";
  position: absolute;
  right: -1.05rem;
  top: 50%;
  width: 0.5rem;
  height: 0.5rem;
  border-top: 2px solid var(--muted);
  border-right: 2px solid var(--muted);
  transform: translateY(-50%) rotate(45deg);
}
html.lecture .slidev-layout .flow > li > .slidev-icon { font-size: 1.35rem; color: var(--c); }
html.lecture .slidev-layout .flow > li > b { font-size: 0.98rem; font-weight: 750; color: var(--heading); }
html.lecture .slidev-layout .flow > li > span { font-size: 0.8rem; color: var(--fg-2); }

/* 타임라인: 선 위의 점. <li class="now"> 는 지금 여기 */
html.lecture .slidev-layout .timeline {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 1rem;
  position: relative;
  padding-top: 1.3rem;
}
html.lecture .slidev-layout .timeline::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0.35rem;
  height: 2px;
  border-radius: 0;
  background: var(--line-2);
}
html.lecture .slidev-layout .timeline > li { position: relative; margin: 0; font-size: 0.92rem; color: var(--fg-2); line-height: 1.45; }
html.lecture .slidev-layout .timeline > li::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1.3rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0;
  background: var(--bg);
  border: 2px solid var(--c);
}
html.lecture .slidev-layout .timeline > li.now::before { background: var(--c); box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 22%, transparent); }
html.lecture .slidev-layout .timeline > li > b { display: block; font-size: 0.82rem; font-weight: 750; color: var(--c); margin-bottom: 0.15rem; }
html.lecture .slidev-layout .timeline > li.now { color: var(--text); }
html.lecture .slidev-layout .timeline.vertical { grid-auto-flow: row; padding: 0 0 0 1.6rem; gap: 0.8rem; }
html.lecture .slidev-layout .timeline.vertical::before { left: 0.35rem; right: auto; top: 0.3rem; bottom: 0.3rem; width: 2px; height: auto; }
html.lecture .slidev-layout .timeline.vertical > li::before { left: -1.6rem; top: 0.3rem; }
</style>
