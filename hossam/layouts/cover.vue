<script setup lang="ts">
// 표지. talk: eyebrow(위 머리말), footer(아래 머리말), mesh(soft = 옅게, none = 없음), source(출처). lecture: 가운데 정렬 표지.
import { useDeckOptions } from '../deck'
defineProps<{ eyebrow?: string; footer?: string; mesh?: string; source?: string }>()
const { style } = useDeckOptions()
</script>

<template>
  <div v-if="style === 'talk'" class="slidev-layout talk cover">
    <div v-if="mesh !== 'none'" class="mesh" :class="{ 'is-soft': mesh === 'soft' }" />
    <div v-if="eyebrow" class="eyebrow">{{ eyebrow }}</div>
    <div class="spacer" />
    <slot />
    <div class="spacer" />
    <div v-if="footer" class="eyebrow foot">{{ footer }}</div>
    <div v-if="source" class="src">출처 · {{ source }}</div>
  </div>
  <div v-else class="slidev-layout cover">
    <slot />
  </div>
</template>
