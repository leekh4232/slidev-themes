<script setup lang="ts">
// 간지. 연세블루 색면 위에 아주 큰 번호(no)와 굵은 흰 제목, 제목 다음 문단은 부제.
import { useDeckOptions } from '../deck'
defineProps<{ no?: string | number }>()
useDeckOptions()
</script>

<template>
  <div class="slidev-layout section">
    <div v-if="no !== undefined" class="section-no">{{ String(no).padStart(2, '0') }}</div>
    <div class="section-body"><slot /></div>
  </div>
</template>
