<script setup lang="ts">
// 파트 표지. talk: part(1~4) → 머리말 "part 0N" 과 파트 시그니처 색, eyebrow 를 주면 머리말을 그 글로 바꾼다. lecture: Slidev 기본 section.
import { computed } from 'vue'
import { useDeckOptions } from '../deck'
const props = defineProps<{ part?: number | string; eyebrow?: string }>()
const label = computed(() => props.eyebrow ?? (props.part ? `part ${String(props.part).padStart(2, '0')}` : ''))
const { style } = useDeckOptions()
</script>

<template>
  <div v-if="style === 'talk'" class="slidev-layout talk section" :class="part ? `part-${part}` : ''">
    <div class="mesh" />
    <div v-if="label" class="eyebrow">{{ label }}</div>
    <div class="spacer" />
    <slot />
    <div class="spacer" />
  </div>
  <div v-else class="slidev-layout section">
    <slot />
  </div>
</template>
