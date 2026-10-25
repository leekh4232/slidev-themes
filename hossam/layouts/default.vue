<script setup lang="ts">
// 본문 슬라이드. talk: eyebrow(제목 위 작은 머리말), part(1~4, 파트 시그니처 색), source(아래 출처 각주). lecture: Slidev 기본 본문.
import { useDeckOptions } from '../deck'
defineProps<{ eyebrow?: string; part?: number | string; source?: string }>()
const { style } = useDeckOptions()
</script>

<template>
  <div v-if="style === 'talk'" class="slidev-layout talk default" :class="part ? `part-${part}` : ''">
    <div v-if="eyebrow" class="eyebrow acc">{{ eyebrow }}</div>
    <slot />
    <div v-if="source" class="src">출처 · {{ source }}</div>
  </div>
  <div v-else class="slidev-layout default">
    <slot />
  </div>
</template>
