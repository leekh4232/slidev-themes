<script setup lang="ts">
// 문제 상자. 코딩 테스트 문제의 구분 · 난이도 · 출처를 머리띠에 적고 본문(슬롯)에 문제 설명을 둔다.
//   tier:  맛보기 | 필수 | 도전 (색이 달라진다).  level: 난이도 숫자(0 ~ 2) 또는 글.  id: 프로그래머스 문제 번호(주면 주소를 함께 적는다)
//   source: 출처 글(id 가 없을 때. 예: "직접 만든 문제")
//   time: 예상 소요시간(분). 주면 "예상 소요시간 N분"을 함께 적는다
import { computed } from 'vue'
const props = withDefaults(defineProps<{ tier?: string; level?: string | number; id?: string | number; source?: string; time?: string | number }>(), { tier: '필수' })
const color = computed(() => ({ 시연: 'var(--vi)', 맛보기: 'var(--vi)', 필수: 'var(--py)', 도전: 'var(--ai)' } as Record<string, string>)[props.tier] ?? 'var(--py)')
const url = computed(() => props.id ? `https://school.programmers.co.kr/learn/courses/30/lessons/${props.id}` : '')
const levelText = computed(() => props.level === undefined || props.level === '' ? '' : (/^\d+$/.test(String(props.level)) ? `Lv.${props.level}` : String(props.level)))
</script>

<template>
  <div class="problem" :style="{ '--c': color }">
    <div class="problem-head">
      <span class="problem-tier">{{ tier }}</span>
      <span v-if="levelText" class="problem-meta">{{ levelText }}</span>
      <span v-if="id" class="problem-meta">프로그래머스 {{ id }}</span>
      <span v-else-if="source" class="problem-meta">{{ source }}</span>
      <span v-if="time" class="problem-meta">예상 소요시간 {{ time }}분</span>
      <a v-if="url" class="problem-link" :href="url" target="_blank" rel="noopener noreferrer" title="새 창에서 문제 열기" @click.stop>{{ url }} ↗</a>
    </div>
    <div class="problem-body"><slot /></div>
  </div>
</template>

<style>
html.lecture .problem {
  --c: var(--py);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  box-shadow: var(--sh);
  overflow: hidden;
}
html.lecture .problem-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1.1rem;
  background: color-mix(in srgb, var(--c) 9%, var(--surface));
  border-bottom: 1px solid var(--line);
  font-size: 0.78rem;
}
html.lecture .problem-tier {
  padding: 0.08em 0.75em;
  font-weight: 750;
  color: var(--bg);
  background: var(--c);
  border-radius: 0;
}
html.lecture .problem-meta { font-weight: 650; color: var(--fg-2); }
html.lecture .problem-meta + .problem-meta::before { content: "·"; margin-right: 0.6rem; color: var(--muted); }
html.lecture .slidev-layout .problem-link {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 0.68rem;
  color: var(--muted);
  border: 0;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
html.lecture .slidev-layout .problem-link:hover { color: var(--py); text-decoration: underline; }
html.lecture .problem-body { padding: 0.85rem 1.2rem 0.95rem; }
html.lecture .problem-body > :first-child { margin-top: 0; }
html.lecture .problem-body > :last-child { margin-bottom: 0; }
html.lecture .slidev-layout .problem-body p, html.lecture .slidev-layout .problem-body li { font-size: 0.98rem; line-height: 1.6; }
html.lecture .slidev-layout .problem-body ul { margin: 0; padding-left: 1.1em; }
html.lecture .slidev-layout .problem-body li::marker { color: var(--c); }
</style>
