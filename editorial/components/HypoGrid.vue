<script setup lang="ts">
// 가설 카드 격자. items: [{ label, tag, h0, h1, note }] 를 cols 열(기본 2) 카드로 놓고, 카드 안에 H0(차이가 없다)·H1(차이가 있다)을 위아래로 쌓는다.
defineProps<{ items: { label: string; tag?: string; h0: string; h1: string; note?: string }[]; cols?: number }>()
</script>

<template>
  <div class="ed-hypogrid" :style="{ '--cols': cols ?? 2 }">
    <div v-for="(it, i) in items" :key="i" class="card">
      <div class="head"><span class="no">{{ String(i + 1).padStart(2, '0') }}</span><b>{{ it.label }}</b><small v-if="it.tag">{{ it.tag }}</small></div>
      <div class="hy hy0"><i>H0</i><span>{{ it.h0 }}</span></div>
      <div class="hy hy1"><i>H1</i><span>{{ it.h1 }}</span></div>
      <em v-if="it.note">{{ it.note }}</em>
    </div>
  </div>
</template>
