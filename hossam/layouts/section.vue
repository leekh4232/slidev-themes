<script setup lang="ts">
// 파트 표지. Slidev 기본 section.
import { useDeckOptions } from '../deck'
useDeckOptions()
</script>

<template>
  <div class="slidev-layout section">
    <slot />
  </div>
</template>
