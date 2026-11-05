<script setup lang="ts">
// 꺾은선 추세. points: [{ label, value }] 를 왼쪽에서 오른쪽으로 잇고, marks: [{ at(순번), text }] 자리에 금색 세로 점선을 긋는다.
// 금색 점 옆에 최댓값을 쓴다. marks 이름은 서로 겹치지 않게 한 칸씩 높이를 엇갈린다.
// ticks: x축에 이름을 쓸 순번(기본 처음 · 끝 · marks). min/max: y축 범위. facts: [{ value, label }] 는 오른쪽 숫자 칸. 최댓값 점은 금색.
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  points: { label: string; value: number }[]
  marks?: { at: number; text: string }[]
  ticks?: number[]; min?: number; max?: number; unit?: string
  title?: string; note?: string; facts?: { value: string; label: string }[]; factsTitle?: string
}>(), { marks: () => [], unit: '' })
const W = 760, H = 310, L = 56, R = 16, T = 54, B = 34
const lo = computed(() => props.min ?? Math.min(...props.points.map(p => p.value)))
const hi = computed(() => props.max ?? Math.max(...props.points.map(p => p.value)))
const x = (i: number) => L + (i * (W - L - R)) / (props.points.length - 1)
const y = (v: number) => T + (1 - (v - lo.value) / (hi.value - lo.value)) * (H - T - B)
const line = computed(() => props.points.map((p, i) => `${x(i)},${y(p.value)}`).join(' '))
const top = computed(() => props.points.reduce((a, p, i) => (p.value > props.points[a].value ? i : a), 0))
const tickIdx = computed(() => props.ticks ?? [0, props.points.length - 1, ...props.marks.map(m => m.at)])
const grid = computed(() => [lo.value, (lo.value + hi.value) / 2, hi.value])
const fmt = (v: number) => Math.round(v).toLocaleString('ko-KR')
</script>

<template>
  <figure class="ed-trend" :class="{ 'has-facts': facts?.length }">
    <div class="chart">
      <figcaption v-if="title" class="ttl">{{ title }}</figcaption>
      <svg :viewBox="`0 0 ${W} ${H}`" role="img">
        <g v-for="g in grid" :key="g">
          <line class="gl" :x1="L" :x2="W - R" :y1="y(g)" :y2="y(g)" />
          <text class="ytick" :x="L - 8" :y="y(g) + 4">{{ fmt(g) }}</text>
        </g>
        <g v-for="(m, k) in marks" :key="m.at">
          <line class="mark" :x1="x(m.at)" :x2="x(m.at)" :y1="T - 6" :y2="H - B" />
          <text class="mtext" :x="x(m.at)" :y="T - 14 - (k % 2) * 18">{{ m.text }}</text>
        </g>
        <polyline class="path" :points="line" />
        <circle v-for="(p, i) in points" :key="i" :cx="x(i)" :cy="y(p.value)" :r="i === top ? 6 : 3.2" :class="{ top: i === top }" />
        <text class="topval" :x="x(top) + 10" :y="y(points[top].value) + 5">{{ fmt(points[top].value) }}{{ unit }}</text>
        <text v-for="i in tickIdx" :key="'t' + i" class="xtick" :x="x(i)" :y="H - 10">{{ points[i].label }}</text>
      </svg>
      <div v-if="note" class="note">{{ note }}</div>
    </div>
    <aside v-if="facts?.length" class="facts">
      <div v-if="factsTitle" class="ftitle">{{ factsTitle }}</div>
      <div v-for="(f, i) in facts" :key="i" class="fact"><b>{{ f.value }}</b><span>{{ f.label }}</span></div>
    </aside>
  </figure>
</template>
