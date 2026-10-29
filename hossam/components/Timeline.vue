<script setup lang="ts">
// Steps type="timeline" 의 짧은 이름. 타임라인. color: py | ai | ok, vertical: 세로
import Steps from './Steps.vue'
withDefaults(defineProps<{ color?: string; vertical?: boolean }>(), { color: 'py', vertical: false })
</script>

<template>
  <Steps type="timeline" :color="color" :vertical="vertical"><slot /></Steps>
</template>
