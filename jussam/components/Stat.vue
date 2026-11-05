<script setup lang="ts">
// 큰 숫자. 프롭에 따라 두 모양 중 하나를 그린다.
//  - value 를 주면 타일: value 숫자(글), unit 단위(작게), label 아래 한 줄 설명, color: py | ai | ok. 슬롯에 보충 설명. 여러 개는 Grid 로 나란히 둔다.
//  - n 을 주면 큰 숫자 카드: n 숫자(파트 그라디언트 글자), unit 단위, label 설명, fill 미터 채움 %(있으면 미터 표시), mark 미터 위 기준선 %,
//    scale 미터 오른쪽 끝 라벨(기본 100%), sm 작은 흰 숫자. 슬롯은 미터 아래 작은 보충 설명.
withDefaults(defineProps<{
  value?: string | number; n?: string | number; unit?: string; label?: string; color?: string
  fill?: number | string; mark?: number | string; scale?: string; sm?: boolean
}>(), { color: 'py', scale: '100%' })
</script>

<template>
  <div v-if="n !== undefined" class="card stat-big" :class="sm ? 'card-sm' : 'card-lg'">
    <div class="n" :class="sm ? 'sm' : 'gp'">{{ n }}<span v-if="unit" class="u">{{ unit }}</span></div>
    <div v-if="label" class="l">{{ label }}</div>
    <template v-if="fill !== undefined">
      <div class="meter-track mt-[18px]">
        <div v-if="mark !== undefined" class="meter-ref" :style="{ left: `${mark}%` }" />
        <div class="meter-fill is-part" :style="{ '--w': `${fill}%` }" />
      </div>
      <div class="meter-scale"><span class="axis-t">0</span><span class="axis-t">{{ scale }}</span></div>
    </template>
    <div v-if="$slots.default" class="s"><slot /></div>
  </div>
  <div v-else class="stat" :class="color">
    <div class="stat-value">{{ value }}<span v-if="unit" class="stat-unit">{{ unit }}</span></div>
    <div v-if="label" class="stat-label">{{ label }}</div>
    <div v-if="$slots.default" class="stat-body"><slot /></div>
  </div>
</template>

<style scoped>
.stat { display: flex; flex-direction: column; justify-content: center; text-align: center; padding: 1.2rem 1.4rem; margin: 0.4rem 0; background: var(--card); box-shadow: var(--sh); position: relative; overflow: hidden; }   /* 둥근 타일(jussam.css 가 모서리를 준다) */
.stat::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 2px; background: var(--c); }
.stat.py { --c: var(--py); }
.stat.ai { --c: var(--ai); }
.stat.ok { --c: var(--ok); }
.stat-value { font-family: var(--mono); font-size: 3rem; font-weight: 600; letter-spacing: -0.045em; line-height: 1.1; color: var(--c); font-variant-numeric: tabular-nums; }
.stat-unit { font-size: 1.2rem; font-weight: 600; margin-left: 0.2em; color: var(--muted); letter-spacing: 0; }
.stat-label { font-size: 1rem; font-weight: 600; color: var(--fg); margin-top: 0.4rem; }
.stat-body { font-size: 0.9rem; color: var(--fg-2); margin-top: 0.3rem; }
.stat-body :deep(p) { margin: 0; font-size: 0.9rem; }
</style>
