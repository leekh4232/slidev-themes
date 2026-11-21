<script setup lang="ts">
// 단계 로드맵. stages: 단계 이름 배열(꺾쇠 띠로 같은 폭에 놓는다).
// bands: 단계 위의 양방향 화살표 띠 [{ label, from, to, row? }], rows: 단계 아래 막대 [{ label, from, to, row? }].
// from · to 는 단계 눈금(0 = 첫 단계 왼쪽 끝, stages.length = 마지막 단계 오른쪽 끝, 소수 가능). 막대 색은 위에서부터 파스텔 1~6 차례.
// row 가 같은 항목은 한 행에 나란히 놓인다(없으면 항목마다 한 행). 행 순서는 처음 나온 차례.
type Span = { label: string; from: number; to: number; row?: number | string }
const props = withDefaults(defineProps<{ stages: string[]; bands?: Span[]; rows?: Span[] }>(), { bands: () => [], rows: () => [] })
const pos = (s: Span) => ({ left: `${(s.from / props.stages.length) * 100}%`, width: `${((s.to - s.from) / props.stages.length) * 100}%` })
const group = (list: Span[]) => {
  const m = new Map<string, Span[]>()
  list.forEach((s, i) => { const k = s.row === undefined ? `_${i}` : `r${s.row}`; (m.get(k) ?? m.set(k, []).get(k)!).push(s) })
  return [...m.values()]
}
</script>

<template>
  <div class="roadmap">
    <div v-for="(g, i) in group(bands)" :key="`b${i}`" class="rm-track"><div v-for="(b, j) in g" :key="j" class="rm-band" :style="pos(b)">{{ b.label }}</div></div>
    <div class="rm-stages">
      <div v-for="(s, i) in stages" :key="s" class="rm-stage" :class="{ first: i === 0 }"><span>{{ s }}</span></div>
    </div>
    <div v-for="(g, i) in group(rows)" :key="`r${i}`" class="rm-track"><div v-for="(r, j) in g" :key="j" class="rm-bar" :class="`c${(i % 6) + 1}`" :style="pos(r)">{{ r.label }}</div></div>
  </div>
</template>
