<script setup lang="ts">
// 간지(파트 표지). 메시 그라디언트 위 그라디언트 큰 제목, 제목 뒤 문단은 부제.
//   part: 1~4 → 머리말 "part 0N" 과 파트 시그니처 색(메시 · 제목). eyebrow 를 주면 머리말을 그 글로 바꾼다. 둘 다 없으면 머리말은 덱 제목.
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useDeckOptions } from '../deck'
const props = defineProps<{ part?: number | string; eyebrow?: string }>()
useDeckOptions()
const { slides } = useNav()
const deckTitle = computed(() => (slides.value[0]?.meta?.slide?.frontmatter?.title ?? '') as string)
const label = computed(() => props.eyebrow ?? (props.part ? `part ${String(props.part).padStart(2, '0')}` : deckTitle.value))
</script>

<template>
  <div class="slidev-layout section" :class="part ? `part-${part}` : ''">
    <div class="mesh" aria-hidden="true" />
    <div v-if="label" class="eyebrow">{{ label }}</div>
    <div class="spacer" />
    <slot />
    <div class="spacer" />
  </div>
</template>
