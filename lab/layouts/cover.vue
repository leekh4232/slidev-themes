<script setup lang="ts">
// 표지. 왼쪽 정렬 큰 제목 + 빛 번짐과 모눈 무늬. eyebrow 를 주지 않으면 덱 제목의 " · " 앞부분(과목명)을 머리말 알약으로 쓴다.
// 덱 헤더의 author 는 부제 아래 작성자 줄, footer 는 아래 막대 옆 작은 글.
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useDeckOptions } from '../deck'
const props = defineProps<{ eyebrow?: string; footer?: string }>()
useDeckOptions()
const { slides } = useNav()
const deckTitle = computed(() => (slides.value[0]?.meta?.slide?.frontmatter?.title ?? '') as string)
const author = computed(() => (slides.value[0]?.meta?.slide?.frontmatter?.author ?? '') as string)
const lab = computed(() => (deckTitle.value.includes(' · ') ? deckTitle.value.split(' · ')[0] : ''))
const eyebrowText = computed(() => props.eyebrow || lab.value)
const meshPath = Array.from({ length: 27 }, (_, i) => `M${i * 48} 0V720`).join('') + Array.from({ length: 16 }, (_, i) => `M0 ${i * 48}H1280`).join('') // PDF 용 모눈 선(48px 간격)
</script>

<template>
  <div class="slidev-layout cover">
    <div class="deco" aria-hidden="true"><span class="mesh" /><svg class="mesh-print" viewBox="0 0 1280 720" preserveAspectRatio="none"><path :d="meshPath" /></svg><span class="glow g1" /><span class="glow g2" /><span class="glow g3" /></div>
    <div class="cover-eyebrow" :class="{ 'is-empty': !eyebrowText }"><span v-if="eyebrowText">{{ eyebrowText }}</span></div>
    <slot />
    <div v-if="author" class="cover-author">{{ author }}</div>
    <div class="cover-foot"><span class="bar" /><span v-if="footer">{{ footer }}</span></div>
  </div>
</template>
