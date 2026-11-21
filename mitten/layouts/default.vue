<script setup lang="ts">
// 본문 슬라이드. 내용은 세로 가운데.
//   eyebrow: 제목 위 작은 머리말(파트 색), part: 1~4 파트 시그니처 색(제목의 **굵게** · 번호 · 카드 선), source: 아래 출처 각주.
import { useDeckOptions } from '../deck'
defineProps<{ eyebrow?: string; part?: number | string; source?: string }>()
useDeckOptions()
</script>

<template>
  <div class="slidev-layout default" :class="part ? `part-${part}` : ''">
    <div v-if="eyebrow" class="eyebrow acc">{{ eyebrow }}</div>
    <slot />
    <div v-if="source" class="src">출처 · {{ source }}</div>
  </div>
</template>
