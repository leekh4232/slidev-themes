<script setup lang="ts">
// 좌표로 그리는 흐름도. 상자 위치와 선 경로를 직접 적는다(PowerPoint 도형 배치를 그대로 옮길 때).
//   w · h: 좌표 공간 크기(예: 1000 × 582). height: 화면 높이(px, 기본 480). 폭은 비율대로 정해지고 가운데 놓인다.
//   nodes: [{ label(<br> 가능), x, y, w, h, kind }] kind: box(기본) · term(시작·끝, 알약) · io(입출력, 강조 테두리)
//   edges: SVG path d 문자열 배열(M · L · C). 끝에 화살촉이 붙는다. size: 상자 글자 크기(px, 기본 13)
withDefaults(defineProps<{
  w: number; h: number; height?: number; size?: number
  nodes: { label: string; x: number; y: number; w: number; h: number; kind?: string }[]
  edges?: string[]
}>(), { height: 480, size: 13, edges: () => [] })
const uid = `nm${Math.random().toString(36).slice(2, 8)}`
</script>

<template>
  <div class="nodemap" :style="{ height: `${height}px`, width: `${(height * w) / h}px`, '--nm-size': `${size}px` }">
    <svg class="nm-lines" :viewBox="`0 0 ${w} ${h}`" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker :id="uid" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="11" markerHeight="11" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
          <path d="M0,0 L10,5 L0,10 z" class="nm-head" />
        </marker>
      </defs>
      <path v-for="(d, i) in edges" :key="i" :d="d" class="nm-edge" :marker-end="`url(#${uid})`" vector-effect="non-scaling-stroke" />
    </svg>
    <div
      v-for="(n, i) in nodes" :key="i" class="nm-node" :class="n.kind ?? 'box'"
      :style="{ left: `${(n.x / w) * 100}%`, top: `${(n.y / h) * 100}%`, width: `${(n.w / w) * 100}%`, height: `${(n.h / h) * 100}%` }"
      v-html="n.label"
    />
  </div>
</template>
