<script setup lang="ts">
// 단계 로드맵. stages: 단계 이름 배열(꺾쇠 띠로 같은 폭에 놓는다).
// bands: 단계 위의 양방향 화살표 띠 [{ label, from, to }], rows: 단계 아래 막대 [{ label, from, to }].
// from · to 는 단계 눈금(0 = 첫 단계 왼쪽 끝, stages.length = 마지막 단계 오른쪽 끝, 소수 가능). 막대 색은 위에서부터 파스텔 1~6 차례.
type Span = { label: string; from: number; to: number }
const props = withDefaults(defineProps<{ stages: string[]; bands?: Span[]; rows?: Span[] }>(), { bands: () => [], rows: () => [] })
const pos = (s: Span) => ({ left: `${(s.from / props.stages.length) * 100}%`, width: `${((s.to - s.from) / props.stages.length) * 100}%` })
</script>

<template>
  <div class="roadmap">
    <div v-for="(b, i) in bands" :key="`b${i}`" class="rm-track"><div class="rm-band" :style="pos(b)">{{ b.label }}</div></div>
    <div class="rm-stages">
      <div v-for="(s, i) in stages" :key="s" class="rm-stage" :class="{ first: i === 0 }"><span>{{ s }}</span></div>
    </div>
    <div v-for="(r, i) in rows" :key="`r${i}`" class="rm-track"><div class="rm-bar" :class="`c${(i % 6) + 1}`" :style="pos(r)">{{ r.label }}</div></div>
  </div>
</template>
