<script setup lang="ts">
// 표지. 가운데 정렬 표지 + 장식(색 번짐 · 점 무늬 · 원호). eyebrow 를 주지 않으면 덱 제목의 " · " 앞부분(과목명)을 머리말로 쓴다. footer 는 아래 그라디언트 막대 옆 작은 글.
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useDeckOptions } from '../deck'
const props = defineProps<{ eyebrow?: string; footer?: string }>()
useDeckOptions()
const { slides } = useNav()
const deckTitle = computed(() => (slides.value[0]?.meta?.slide?.frontmatter?.title ?? '') as string)
const lab = computed(() => (deckTitle.value.includes(' · ') ? deckTitle.value.split(' · ')[0] : ''))
const eyebrowText = computed(() => props.eyebrow || lab.value)
</script>

<template>
  <div class="slidev-layout cover">
    <div class="cover-bg" aria-hidden="true">
      <span class="blob b1" /><span class="blob b2" /><span class="blob b3" />
      <span class="dots" />
      <span class="ring" /><span class="ring r2" />
    </div>
    <div class="cover-eyebrow" :class="{ 'is-empty': !eyebrowText }"><span v-if="eyebrowText">{{ eyebrowText }}</span></div>
    <div class="cover-body"><slot /></div>
    <div class="cover-foot"><span class="bar" /><span v-if="footer" class="txt">{{ footer }}</span></div>
  </div>
</template>
