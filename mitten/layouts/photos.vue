<script setup lang="ts">
// 미리보기 사진 모음. 사진 4~6장을 벽에 붙인 사진처럼 늘어놓고, 장마다 왼쪽 아래에 설명 딱지를 단다. 제목과 출처 줄은 슬롯으로 받는다.
//   photos: [{ src: 경로, cap: 설명 }] — 6장 3×2, 5장은 첫 장을 크게, 4장 2×2
import { useDeckOptions } from '../deck'
defineProps<{ photos?: { src: string; cap?: string }[] }>()
useDeckOptions()
</script>

<template>
  <div class="slidev-layout photos">
    <slot />
    <div v-if="photos?.length" class="ph-wall" :class="`n${photos.length}`">
      <figure v-for="(p, i) in photos" :key="p.src" :class="`t${i % 4}`">
        <img :src="p.src" :alt="p.cap ?? ''" />
        <figcaption v-if="p.cap">{{ p.cap }}</figcaption>
      </figure>
    </div>
  </div>
</template>
