<script setup lang="ts">
// 덤벨 비교. rows: [{ label, a, b }] 를 한 줄씩, a(진한 점)와 b(금색 빈 점)를 같은 눈금 위에 잇는다. 두 조건에서 같은 값이 어떻게 바뀌는지 보여 준다.
// aLabel/bLabel: 범례, max(기본 1), digits(기본 2), title, note.
withDefaults(defineProps<{
  rows: { label: string; a: number; b: number }[]
  aLabel: string; bLabel: string; max?: number; digits?: number; title?: string; note?: string
}>(), { max: 1, digits: 2 })
</script>

<template>
  <figure class="ed-dumbbell">
    <div class="head">
      <figcaption v-if="title">{{ title }}</figcaption>
      <div class="legend"><span class="a">{{ aLabel }}</span><span class="b">{{ bLabel }}</span></div>
    </div>
    <div v-for="r in rows" :key="r.label" class="row">
      <span class="lab">{{ r.label }}</span>
      <span class="track">
        <span class="bar" :style="{ left: `${Math.min(r.a, r.b) / max * 100}%`, width: `${Math.abs(r.a - r.b) / max * 100}%` }" />
        <span class="dot a" :style="{ left: `${r.a / max * 100}%` }"><i>{{ r.a.toFixed(digits) }}</i></span>
        <span class="dot b" :style="{ left: `${r.b / max * 100}%` }"><i>{{ r.b.toFixed(digits) }}</i></span>
      </span>
    </div>
    <div class="scale"><span /><span>0</span><span>{{ (max / 2).toFixed(1) }}</span><span>{{ max.toFixed(1) }}</span></div>
    <div v-if="note" class="note">{{ note }}</div>
  </figure>
</template>
