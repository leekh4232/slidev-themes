<script setup lang="ts">
// 격자 배치. cols: 열 수(2, 3) 또는 grid-template-columns 값("1fr 400px"), gap: px(기본 32), align: start 등, title: 위에 붙는 작은 제목.
// 칸 안에 마크다운(코드 블록·목록)을 넣으려면 칸마다 <div> 로 감싸고 위아래에 빈 줄을 둔다.
const props = withDefaults(defineProps<{ cols?: number | string; gap?: number | string; align?: string; title?: string }>(), { cols: 2 })
const columns = /^\d+$/.test(String(props.cols)) ? `repeat(${props.cols}, minmax(0, 1fr))` : String(props.cols)
</script>

<template>
  <div class="grid-box stagger-box">
    <div v-if="title" class="chart-title">{{ title }}</div>
    <div class="grid-cells stagger" :style="{ gridTemplateColumns: columns, gap: gap !== undefined ? `${gap}px` : undefined, alignItems: align }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.grid-cells { gap: var(--grid-gap, 20px); }
/* 칸이 내용(긴 코드 줄) 때문에 넓어지지 않게: 코드 상자는 칸 안에서 가로 스크롤 */
.grid-cells > :deep(*) { min-width: 0; }
.grid-cells > :deep(*) > :first-child { margin-top: 0; }
</style>
