<script setup lang="ts">
// 격자 배치. cols: 열 수(2, 3) 또는 grid-template-columns 값("1fr 400px"), align: start 등, title: 위에 붙는 작은 제목.
// gap: 칸 사이 간격. 숫자 하나면 가로·세로 모두(px, 기본 24), 두 개면 "세로 가로". 단위를 붙이면 그대로 쓴다.
// 칸 안에 마크다운을 넣으려면 칸마다 <div> 로 감싸고 위아래에 빈 줄을 둔다.
import { computed } from 'vue'
const props = withDefaults(defineProps<{ cols?: number | string; gap?: number | string; align?: string; title?: string }>(), { cols: 2 })
const columns = /^\d+$/.test(String(props.cols)) ? `repeat(${props.cols}, minmax(0, 1fr))` : String(props.cols)
const gap = computed(() => props.gap === undefined ? 'var(--grid-gap)'
  : String(props.gap).trim().split(/\s+/).map(v => /^\d+(\.\d+)?$/.test(v) ? `${v}px` : v).join(' '))
</script>

<template>
  <div class="grid-box stagger-box">
    <div v-if="title" class="grid-title">{{ title }}</div>
    <div class="grid-cells stagger" :style="{ gridTemplateColumns: columns, gap, alignItems: align }">
      <slot />
    </div>
  </div>
</template>
