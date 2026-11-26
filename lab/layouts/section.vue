<script setup lang="ts">
// 간지(파트 표지). 머리말은 덱 제목, 제목 왼쪽에 그라디언트 세로 막대. 제목 뒤 문단은 부제가 된다.
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useDeckOptions } from '../deck'
useDeckOptions()
const { slides } = useNav()
const deckTitle = computed(() => (slides.value[0]?.meta?.slide?.frontmatter?.title ?? '') as string)
const meshPath = Array.from({ length: 27 }, (_, i) => `M${i * 48} 0V720`).join('') + Array.from({ length: 16 }, (_, i) => `M0 ${i * 48}H1280`).join('') // PDF 용 모눈 선(48px 간격)
</script>

<template>
  <div class="slidev-layout section">
    <div class="deco" aria-hidden="true"><span class="mesh" /><svg class="mesh-print" viewBox="0 0 1280 720" preserveAspectRatio="none"><path :d="meshPath" /></svg><span class="glow g1" /><span class="glow g2" /></div>
    <div class="section-eyebrow" :class="{ 'is-empty': !deckTitle }"><span v-if="deckTitle">{{ deckTitle }}</span></div>
    <div class="section-body"><slot /></div>
  </div>
</template>
