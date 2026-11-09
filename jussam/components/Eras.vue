<script setup lang="ts">
// 시대 축 위에 겹쳐 쌓이는 영역도(예: AI ⊃ ML ⊃ DL). 바깥 영역부터 차례로 적고, 안쪽 영역은 오른쪽 · 아래로 들어가며 겹친다.
//   ticks: 아래 시대 축 눈금 이름 배열(같은 간격). layers: [{ title, items, from }] from = 그 영역이 시작하는 눈금 순번(0부터).
//   items 의 항목은 글 하나(Rule-Based Systems) 또는 { t: 영문 이름, d: 아래 작게 붙는 한글 설명 } 이다.
//   height: 영역도 높이(px, 기본 380, 축 제외). step: 안쪽 영역이 아래로 내려오는 간격(px, 기본 64).
// 영역은 반투명 파트 색 그라디언트라 바탕(메시 · 색 번짐)이 비친다. 안쪽일수록 진하다.
withDefaults(defineProps<{
  ticks: string[]
  layers: { title: string; items?: (string | { t: string; d?: string })[]; from: number }[]
  height?: number; step?: number
}>(), { height: 380, step: 64 })
</script>

<template>
  <div class="eras">
    <div class="eras-stage" :style="{ height: `${height}px` }">
      <div
        v-for="(l, i) in layers" :key="l.title" class="era" :class="`era-${i + 1}`"
        :style="{ left: `${(l.from / ticks.length) * 100}%`, top: `${i * step}px`, '--era-w': `${(((layers[i + 1]?.from ?? ticks.length) - l.from) / (ticks.length - l.from)) * 100}%` }"
      >
        <div class="era-body">
          <div class="era-t" v-html="l.title" />
          <ul v-if="l.items?.length" class="era-items">
            <li v-for="it in l.items" :key="typeof it === 'string' ? it : it.t">
              <template v-if="typeof it === 'string'">{{ it }}</template>
              <template v-else>{{ it.t }}<small v-if="it.d" class="era-d">{{ it.d }}</small></template>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="eras-axis">
      <span v-for="(t, i) in ticks" :key="t" class="era-tick" :style="{ left: `${(i / ticks.length) * 100}%` }"><i />{{ t }}</span>
    </div>
  </div>
</template>
