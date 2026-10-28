<script setup lang="ts">
// 가로 흐름도. 슬롯에 <li> 를 나열하면 번호 상자가 나란히 놓이고 사이에 꺾쇠 화살표가 붙는다. <li> 안의 첫 <b> 는 상자 제목. color: py | ai | ok
withDefaults(defineProps<{ color?: string }>(), { color: 'py' })
</script>

<template>
  <ol class="flow" :class="color"><slot /></ol>
</template>

<style scoped>
.flow { --flow-gap: 2.4rem; list-style: none; margin: 0.4rem 0; padding: 0; display: flex; flex-wrap: wrap; align-items: stretch; row-gap: 1.2rem; counter-reset: flow; }
.flow.py { --c: var(--py); }
.flow.ai { --c: var(--ai); }
.flow.ok { --c: var(--ok); }
.flow :deep(li) {
  counter-increment: flow; position: relative; flex: 1 1 0; min-width: 0;
  display: flex; flex-direction: column; align-items: center; gap: 0.25rem; text-align: center;
  padding: 1rem 0.9rem 1.1rem; font-size: 0.95rem; line-height: 1.4;
  background: var(--card); color: var(--fg); border: 1px solid var(--line); border-top: 4px solid var(--c); border-radius: 14px; box-shadow: var(--sh);
}
.flow :deep(li:not(:last-child)) { margin-right: var(--flow-gap); }
/* 번호 동그라미 */
.flow :deep(li)::before { content: counter(flow); width: 1.9rem; height: 1.9rem; border-radius: 50%; display: grid; place-items: center; font-size: 0.9rem; font-weight: 800; color: #06101f; background: var(--c); margin-bottom: 0.3rem; }
/* 상자 사이 꺾쇠 화살표 (줄이 바뀌면 그 줄 마지막 상자에도 붙는다) */
.flow :deep(li:not(:last-child))::after { content: ''; position: absolute; top: 50%; right: calc(var(--flow-gap) * -0.5); width: 0.75rem; height: 0.75rem; border-top: 3px solid var(--c); border-right: 3px solid var(--c); transform: translate(50%, -50%) rotate(45deg); opacity: 0.8; }
.flow :deep(li > b) { display: block; font-size: 1.1rem; font-weight: 800; color: var(--heading); }
.flow :deep(li > img) { max-height: 6rem; }
</style>
