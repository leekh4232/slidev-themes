<script setup lang="ts">
// 표지. 위 머리말 · 메시 그라디언트 장식 · 왼쪽 정렬 큰 제목.
//   eyebrow: 위 머리말(주지 않으면 덱 제목의 " · " 앞부분), footer: 아래 머리말, mesh: soft(옅게) | none(없음), source: 아래 출처 각주.
// 덱 헤더의 author 는 첫 표지(1쪽)에만 제목 아래 작성자 줄(사람 아이콘과 함께)로 붙는다(훅 · 맺음 · 질문 표지에는 붙지 않는다). author 는 Slidev 헤드매터 예약 키라 prop 으로 오지 않으므로 title 처럼 첫 슬라이드 프런트매터에서 읽는다.
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import { useDeckOptions } from '../deck'
const props = defineProps<{ eyebrow?: string; footer?: string; mesh?: string; source?: string }>()
useDeckOptions()
const { slides } = useNav()
const { $page } = useSlideContext()
const deckTitle = computed(() => (slides.value[0]?.meta?.slide?.frontmatter?.title ?? '') as string)
const author = computed(() => (slides.value[0]?.meta?.slide?.frontmatter?.author ?? '') as string)
const lab = computed(() => (deckTitle.value.includes(' · ') ? deckTitle.value.split(' · ')[0] : ''))
const eyebrowText = computed(() => props.eyebrow || lab.value)
</script>

<template>
  <div class="slidev-layout cover">
    <div v-if="mesh !== 'none'" class="mesh" :class="{ 'is-soft': mesh === 'soft' }" aria-hidden="true" />
    <div v-if="eyebrowText" class="eyebrow">{{ eyebrowText }}</div>
    <div class="spacer" />
    <slot />
    <div v-if="author && $page === 1" class="cover-author"><span class="avatar" aria-hidden="true" /><span>{{ author }}</span></div>
    <div class="spacer" />
    <div v-if="footer" class="eyebrow foot">{{ footer }}</div>
    <div v-if="source" class="src">출처 · {{ source }}</div>
  </div>
</template>
