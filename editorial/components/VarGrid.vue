<script setup lang="ts">
// 변수 카드판. target: 종속변수 하나(왼쪽 연세블루 큰 칸), items: 독립변수 카드(오른쪽 격자, cols 열).
// 각 변수: { name, type(연속형 · 범주형), src(원본 · 새로 만듦 · 새로 가져옴 같은 꼬리표), text }. src 가 '원본'이 아니면 금색 꼬리표.
type V = { name: string; type: string; src?: string; text: string }
defineProps<{ target: V; items: V[]; cols?: number; targetLabel?: string; itemsLabel?: string }>()
</script>

<template>
  <div class="ed-vargrid">
    <div class="target">
      <span class="role">{{ targetLabel ?? '종속변수' }}</span>
      <b>{{ target.name }}</b>
      <span class="badges"><i>{{ target.type }}</i><i v-if="target.src" :class="{ new: target.src !== '원본' }">{{ target.src }}</i></span>
      <p>{{ target.text }}</p>
    </div>
    <div class="items">
      <span class="role">{{ itemsLabel ?? '독립변수' }}</span>
      <div class="cards" :style="{ '--cols': cols ?? 2 }">
        <div v-for="v in items" :key="v.name" class="card">
          <div class="top"><b>{{ v.name }}</b><span class="badges"><i>{{ v.type }}</i><i v-if="v.src" :class="{ new: v.src !== '원본' }">{{ v.src }}</i></span></div>
          <p>{{ v.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
