<script setup lang="ts">
// 타임라인. 프롭에 따라 두 모양 중 하나를 그린다.
//  - events 를 주면 날짜 축: start/end 축 범위(YYYY-MM-DD, 월 눈금은 자동), events: { date: 'YYYY.MM.DD', name, org, desc(<br> 가능), hl(강조) }[]
//  - 주지 않으면 Steps type="timeline" 의 짧은 이름: 슬롯에 <li> 를 나열한다. color: py | ai | ok, vertical: 세로, center: 점과 글을 칸 가운데에
import Steps from './Steps.vue'
const props = withDefaults(defineProps<{
  color?: string; vertical?: boolean; center?: boolean
  start?: string; end?: string; events?: { date: string; name: string; org?: string; desc?: string; hl?: boolean }[]
}>(), { color: 'py', vertical: false, center: false })
const W = 1136, X0 = 20, X1 = 1116, CARD = 320
const gid = `tlg-${Math.random().toString(36).slice(2, 8)}`
const parse = (s: string) => { const [y, m, d] = s.split(/[-.]/).map(Number); return Date.UTC(y, m - 1, d || 1) }
const months: { x: number; mid: number; label: string }[] = []
let evs: { date: string; name: string; org?: string; desc?: string; hl?: boolean; x: number; left: number }[] = []
if (props.events && props.start && props.end) {
  const t0 = parse(props.start), t1 = parse(props.end)
  const px = (t: number) => X0 + ((t - t0) / (t1 - t0)) * (X1 - X0)
  for (let d = new Date(t0); d.getTime() < t1; d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))) {
    const next = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1)
    months.push({ x: px(d.getTime()), mid: (px(d.getTime()) + px(Math.min(next, t1))) / 2, label: `${d.getUTCMonth() + 1}월` })
  }
  evs = props.events.map(e => {
    const x = px(parse(e.date))
    return { ...e, x, left: Math.min(Math.max(x - 24, 0), W - CARD) }
  })
}
</script>

<template>
  <div v-if="events" class="tlx stagger-box">
    <svg viewBox="0 0 1136 86" class="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient :id="gid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style="stop-color:var(--g1)" /><stop offset="1" style="stop-color:var(--g2)" />
        </linearGradient>
      </defs>
      <g class="svg-axis" text-anchor="middle"><text v-for="m in months" :key="m.label" :x="m.mid" y="9">{{ m.label }}</text></g>
      <line class="svg-base" :x1="X0" y1="24" :x2="X1" y2="24" stroke-width="1" />
      <g class="svg-base" stroke-width="1">
        <line v-for="m in months" :key="m.label" :x1="m.x" y1="20" :x2="m.x" y2="28" /><line :x1="X1" y1="20" :x2="X1" y2="28" />
        <line v-for="e in evs" :key="e.date" :x1="e.x" y1="32" :x2="e.x" y2="86" />
      </g>
      <g :style="{ fill: `url(#${gid})` }"><circle v-for="e in evs" :key="e.date" :cx="e.x" cy="24" :r="e.hl ? 7 : 5" /></g>
      <circle v-for="e in evs.filter(e => e.hl)" :key="e.date" :cx="e.x" cy="24" r="12" fill="none" :stroke="`url(#${gid})`" stroke-width="1" opacity=".5" />
    </svg>
    <div class="tlx-cards stagger">
      <div v-for="e in evs" :key="e.date" class="tlx-card" :style="{ left: `${(e.left / W) * 100}%` }">
        <div class="date">{{ e.date }}</div>
        <div class="name">{{ e.name }}</div>
        <div v-if="e.org" class="org">{{ e.org }}</div>
        <div v-if="e.desc" class="desc" v-html="e.desc" />
      </div>
    </div>
  </div>
  <Steps v-else type="timeline" :color="color" :vertical="vertical" :center="center"><slot /></Steps>
</template>
