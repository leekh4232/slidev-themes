<script setup lang="ts">
// 질문별 흐름 띠. lanes: [{ tag, title, steps: [{ kicker, text }] }] 를 위아래 줄로 놓고, 줄마다 왼쪽 연세블루 꼬리표 뒤에 단계를 화살표로 잇는다.
// heads: 단계 열 이름(위 머리줄). 마지막 단계 칸은 금색 윗선으로 강조한다.
defineProps<{ lanes: { tag: string; title?: string; steps: { kicker?: string; text: string }[] }[]; heads?: string[] }>()
</script>

<template>
  <div class="ed-lanes">
    <div v-if="heads" class="hrow"><span /><span v-for="h in heads" :key="h">{{ h }}</span></div>
    <div v-for="(ln, i) in lanes" :key="i" class="lane" :style="{ '--n': ln.steps.length }">
      <div class="tag"><b>{{ ln.tag }}</b><small v-if="ln.title">{{ ln.title }}</small></div>
      <div v-for="(s, j) in ln.steps" :key="j" class="step" :class="{ last: j === ln.steps.length - 1 }">
        <span v-if="s.kicker" class="kicker">{{ s.kicker }}</span>
        <p>{{ s.text }}</p>
      </div>
    </div>
  </div>
</template>
