<script setup lang="ts">
// 상자 컴포넌트. 콜아웃 · 프롬프트 · 출력 · 번호 머리띠를 한 컴포넌트가 그린다. Prompt · Output 은 이 컴포넌트의 짧은 이름이다.
//   kind:  eli5 | real | tip | warn | danger | ai | prompt | output | plain — 머리말 · 아이콘 · 색의 묶음(아래 PRESETS).
//          생략하면 eli5. 단, n 이나 color 만 주면 plain(아이콘 없는 민무늬 상자).
//   title: 머리말 글(묶음의 기본 머리말을 바꾼다). icon: 머리말 앞 아이콘(이모지 · 글자). "" 를 주면 아이콘을 뺀다.
//   color: 머리말 색. py | vi | ai | ok | yellow | warn | danger | muted | pastel-1 ~ 6 또는 CSS 색. 바탕은 그 색을 옅게 깐다.
//   본문(슬롯) 없이 title 만 주면 머리말 한 줄짜리 상자가 되고 위아래 여백이 같아진다.
//   n:     왼쪽에 붙는 번호 상자(템플릿 번호 · 단계 번호). tag: 머리말 오른쪽 작은 테두리 글(패턴 이름 · 분류).
//   copy:  오른쪽 위 복사 버튼(본문 글을 클립보드로). prompt 는 기본 켬. cols: 본문을 여러 단으로 이어 흘린다(긴 프롬프트).
//   class="small": 본문 글자를 0.82rem 로(프롬프트 · 출력 포함). 상자를 Grid 칸 같은 좁은 자리에 넣을 때.
//   프롬프트 글 안의 {...}(치환할 자리)는 노랑 굵은 글로 칠한다.
import { computed, onMounted, onUpdated, ref } from 'vue'

const props = withDefaults(defineProps<{
  kind?: string; title?: string; icon?: string; color?: string
  n?: string | number; tag?: string; copy?: boolean; cols?: number | string
}>(), { cols: 1 })

// 묶음(preset): 아이콘 · 머리말 · 색 이름
const PRESETS: Record<string, { icon: string; title: string; color: string }> = {
  eli5:   { icon: '💡', title: '풀이',          color: 'yellow' },
  real:   { icon: '🧭', title: '현업에서는',     color: 'py' },
  tip:    { icon: '✅', title: '막히면',         color: 'ok' },
  warn:   { icon: '⚠️', title: '주의',           color: 'warn' },
  danger: { icon: '⛔', title: 'AI에게 주면 안 되는 것', color: 'danger' },
  ai:     { icon: '🤖', title: 'AI와 함께',      color: 'ai' },
  prompt: { icon: '',   title: '프롬프트',       color: 'ai' },
  output: { icon: '',   title: '출력',           color: 'ok' },
  plain:  { icon: '',   title: '',               color: 'py' },
}
const NAMED = ['py', 'vi', 'ai', 'ok', 'yellow', 'warn', 'danger', 'muted', 'pastel-1', 'pastel-2', 'pastel-3', 'pastel-4', 'pastel-5', 'pastel-6']

const kind = computed(() => props.kind ?? ((props.n !== undefined || props.color) ? 'plain' : 'eli5'))
const preset = computed(() => PRESETS[kind.value] ?? PRESETS.plain)
const colorKey = computed(() => props.color ?? preset.value.color)
const accent = computed(() => NAMED.includes(colorKey.value) ? `var(--${colorKey.value})` : colorKey.value)
const icon = computed(() => props.icon ?? (props.n !== undefined ? '' : preset.value.icon))
const title = computed(() => props.title ?? preset.value.title)
const showCopy = computed(() => props.copy ?? kind.value === 'prompt')
const hasHead = computed(() => !!(title.value || props.tag))

const box = ref<HTMLElement | null>(null)
const done = ref(false)
async function copyText() {
  const text = box.value?.innerText ?? ''
  try { await navigator.clipboard.writeText(text) } catch { /* 클립보드 불가 환경 무시 */ }
  done.value = true; setTimeout(() => (done.value = false), 1500)
}

// 프롬프트의 치환 자리 {...} 를 span.ph 로 감싼다. Shiki 가 한 자리를 여러 span 으로 쪼갤 수 있어 줄(.line) 단위로 글자 위치를 모아 감싼다.
// 글은 그대로라 복사 결과는 같다. 이미 감싼 글은 건너뛰므로 다시 불려도 안전하다.
const PH = /\{[^{}\n]+\}/g
function markPlaceholders() {
  if (kind.value !== 'prompt' || !box.value) return
  const lines = box.value.querySelectorAll('.line')
  for (const line of lines.length ? lines : [box.value]) {
    const nodes: Text[] = []
    const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    const ranges = [...nodes.map(n => n.data).join('').matchAll(PH)].map(m => [m.index!, m.index! + m[0].length])
    if (!ranges.length) continue
    let pos = 0
    for (const node of nodes) {
      const start = pos
      pos += node.data.length
      if (node.parentElement?.closest('.ph')) continue
      const cuts = ranges.map(([a, b]) => [Math.max(a, start), Math.min(b, pos)]).filter(([a, b]) => a < b)
      for (const [a, b] of cuts.reverse()) {   // 뒤에서부터 잘라야 앞쪽 위치가 그대로다
        const mid = node.splitText(a - start)
        mid.splitText(b - a)
        const span = document.createElement('span')
        span.className = 'ph'
        mid.replaceWith(span)
        span.append(mid)
      }
    }
  }
}
// 프롬프트 안에 붙여 넣은 터미널 표(+---+ · | … | 로 시작하고 끝나는 줄)는 칸이 맞도록 고정폭 글꼴로 그린다.
// "| 순서 | 절 | 표로" 같은 출력 형식 줄은 | 로 끝나지 않아 대상이 아니다.
// 표 줄은 블록으로 그려 줄 간격을 좁힌다. 블록 뒤의 줄바꿈 글자는 빈 줄이 되므로 지운다(innerText 가 블록 사이에 줄바꿈을 넣어 복사 결과는 같다).
const TERM = /^\s*[+|].*[+|]\s*$/
function markTerminal() {
  if (kind.value !== 'prompt' || !box.value) return
  for (const line of box.value.querySelectorAll('.line')) {
    if (!TERM.test(line.textContent ?? '')) continue
    line.classList.add('term')
    const next = line.nextSibling
    if (next?.nodeType === Node.TEXT_NODE && next.textContent === '\n') next.remove()
  }
}
// 프롬프트의 섹션 이름 줄(## 맥락 · ## 상황 …)에 표시를 붙여 색으로 구분한다
function markSections() {
  if (kind.value !== 'prompt' || !box.value) return
  for (const line of box.value.querySelectorAll('.line')) {
    if (!line.classList.contains('code') && /^\s*#{1,3}\s/.test(line.textContent ?? '')) line.classList.add('sec')
  }
}
// 프롬프트 안의 코드 펜스(``` … ```) 줄에 표시를 붙인다. 표시된 줄은 고정폭 글꼴과 문법 강조 색을 그대로 쓴다
// 펜스 안의 코드 줄은 한 상자(span.codebox)로 묶어 배경을 줄마다가 아니라 상자 하나로 칠한다.
// 상자는 블록이라 앞뒤의 줄바꿈 글자가 빈 줄이 되므로 지운다(innerText 가 블록 앞뒤에 줄바꿈을 넣어 복사 결과는 같다).
function markCode() {
  if (kind.value !== 'prompt' || !box.value) return
  let inside = false
  let run: Element[] = []
  const wrap = () => {
    const [first, last] = [run[0], run[run.length - 1]]
    run = []
    if (!first || first.parentElement?.classList.contains('codebox')) return
    const isNl = (n: Node | null) => n?.nodeType === Node.TEXT_NODE && n.textContent === '\n'
    if (isNl(first.previousSibling)) first.previousSibling!.remove()
    if (isNl(last.nextSibling)) last.nextSibling!.remove()
    const cb = document.createElement('span')
    cb.className = 'codebox'
    first.before(cb)
    for (let n: Node | null = first; n;) {
      const next: Node | null = n === last ? null : n.nextSibling
      cb.append(n)
      n = next
    }
  }
  for (const line of box.value.querySelectorAll('.line')) {
    const fence = /^\s*```/.test(line.textContent ?? '')
    line.classList.toggle('fence', fence)
    line.classList.toggle('code', inside && !fence)
    if (inside && !fence) run.push(line)
    if (fence) { wrap(); inside = !inside }
  }
  wrap()
}
function markAll() { markCode(); markPlaceholders(); markTerminal(); markSections() }
onMounted(markAll)
onUpdated(markAll)
</script>

<template>
  <div class="callout" :class="[kind, { 'has-n': n !== undefined, 'head-only': !$slots.default }]" :style="{ '--c': accent }">
    <div v-if="n !== undefined" class="callout-n">{{ n }}</div>
    <div v-else-if="icon" class="callout-icon" aria-hidden="true">{{ icon }}</div>
    <div class="callout-main">
      <div v-if="hasHead || showCopy" class="callout-head">
        <span v-if="kind === 'prompt'" class="dots" aria-hidden="true"><i /><i /><i /></span>
        <span class="callout-title">{{ title }}</span>
        <span v-if="tag" class="callout-tag">{{ tag }}</span>
        <button v-if="showCopy" class="copy" @click="copyText">{{ done ? '복사됨 ✓' : '복사' }}</button>
      </div>
      <div v-if="$slots.default" ref="box" class="callout-body" :class="{ 'prompt-body': kind === 'prompt', 'output-pre': kind === 'output' }" :style="{ '--prompt-cols': cols }"><slot /></div>
    </div>
  </div>
</template>

<style>
/* 콜아웃: 옅은 색 면의 직각 상자. 왼쪽에 아이콘(또는 번호) 칸 */
html.lecture .callout {
  --c: var(--py);
  display: flex;
  gap: 0.85rem;
  padding: 0.85rem 1.1rem;
  background: color-mix(in srgb, var(--c) 8%, var(--card));
  border: 1px solid color-mix(in srgb, var(--c) 22%, transparent);
  border-radius: var(--r);
  line-height: 1.5;
}
html.lecture .callout.plain { background: var(--card); border-color: var(--line); box-shadow: var(--sh); }
html.lecture .callout-icon, html.lecture .callout-n {
  flex: none;
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  font-size: 1rem;
  background: color-mix(in srgb, var(--c) 16%, transparent);
  border-radius: var(--r-sm);
}
html.lecture .callout-n { font-size: 0.9rem; font-weight: 800; color: var(--c); }
html.lecture .callout-main { flex: 1; min-width: 0; }
html.lecture .callout-head {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 2rem;
  font-size: 0.98rem;
  font-weight: 750;
  color: var(--c);
  letter-spacing: -0.01em;
}
html.lecture .callout.plain .callout-head { color: var(--heading); }
html.lecture .callout-tag {
  padding: 0.05em 0.65em;
  font-size: 0.72rem;
  font-weight: 650;
  color: var(--c);
  border: 1px solid color-mix(in srgb, var(--c) 40%, transparent);
  border-radius: 0;
  white-space: nowrap;
}
html.lecture .callout-body { font-size: 0.95rem; color: var(--fg); }
html.lecture .callout-head + .callout-body { margin-top: 0.15rem; }
html.lecture .callout-body > :first-child { margin-top: 0; }
html.lecture .callout-body > :last-child { margin-bottom: 0; }
html.lecture .slidev-layout .callout-body p, html.lecture .slidev-layout .callout-body li { font-size: 0.95rem; }
/* class="small": 좁은 자리에 넣는 작은 상자. 글자와 아이콘, 위아래 여백을 모두 줄인다 */
html.lecture .callout.small { padding: 0.45rem 0.8rem 0.5rem; gap: 0.6rem; }
html.lecture .callout.small .callout-icon, html.lecture .callout.small .callout-n { width: 1.45rem; height: 1.45rem; font-size: 0.75rem; }
html.lecture .callout.small .callout-head { min-height: 1.45rem; font-size: 0.84rem; }
html.lecture .callout.small .callout-head + .callout-body { margin-top: 0; }
html.lecture .slidev-layout .callout.small .callout-body :is(p, li, td, th) { font-size: 0.8rem; line-height: 1.45; }
html.lecture .slidev-layout .callout.small .callout-body :is(ul, ol) { margin: 0.1rem 0 0; }
html.lecture .slidev-layout .callout.small .callout-body li + li { margin-top: 0.05rem; }
html.lecture .slidev-layout .callout-body table { margin: 0.5rem 0; }
/* 상자 안 목록은 들여쓰지 않는다: 글머리가 상자 글의 왼쪽 끝에 맞는다 */
html.lecture .slidev-layout .callout-body :is(ul, ol) { margin: 0.2rem 0; padding-left: 1.05em; }
html.lecture .slidev-layout .callout-body li { margin-left: 0; padding-left: 0.1em; }
html.lecture .slidev-layout .callout-body li + li { margin-top: 0.15rem; }
html.lecture .slidev-layout .callout-body li::marker { color: var(--c); }
html.lecture .callout .copy {
  margin-left: auto;
  padding: 0.15em 0.75em;
  font-size: 0.72rem;
  font-weight: 650;
  color: var(--fg-2);
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 0;
  cursor: pointer;
}
html.lecture .callout .copy:hover { color: var(--heading); border-color: var(--line-2); }

/* 프롬프트: 머리띠가 있는 창 모양. 본문은 고정폭이 아닌 본문 글꼴로, 치환 자리 {…} 는 노랑 */
html.lecture .callout.prompt {
  display: block;
  padding: 0;
  background: var(--card);
  border: 1px solid var(--line-2);
  border-radius: var(--r-lg);
  box-shadow: var(--sh);
  overflow: hidden;
}
html.lecture .callout.prompt .callout-head {
  min-height: 0;
  padding: 0.5rem 0.9rem;
  font-size: 0.82rem;
  color: var(--fg-2);
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}
html.lecture .callout.prompt .dots { display: inline-flex; gap: 0.3rem; margin-right: 0.2rem; }
html.lecture .callout.prompt .dots i { width: 0.55rem; height: 0.55rem; border-radius: 0; background: var(--line-2); }
html.lecture .callout.prompt .dots i:first-child { background: var(--ai); }
html.lecture .callout.prompt .callout-tag { color: var(--muted); border-color: var(--line-2); }
html.lecture .prompt-body { margin: 0; padding: 0.75rem 1rem 0.85rem; column-count: var(--prompt-cols, 1); column-gap: 2rem; column-rule: 1px solid var(--line); }
html.lecture .slidev-layout .prompt-body .slidev-code, html.lecture .slidev-layout .prompt-body pre.shiki {
  background: none !important;
  border: 0;
  border-radius: 0 !important;
  margin: 0;
  padding: 0 !important;
}
html.lecture .slidev-layout .prompt-body .slidev-code code, html.lecture .slidev-layout .prompt-body .slidev-code .line {
  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--text) !important;
}
html.lecture .slidev-layout .callout.small .prompt-body .slidev-code :is(code, .line) { font-size: 0.78rem; }
html.lecture .slidev-layout .prompt-body .slidev-code .line:not(.code) span { color: inherit !important; font-weight: inherit; font-style: inherit; }
/* 프롬프트 안의 소스코드: 어두운 상자 하나 위에 고정폭 글꼴과 문법 강조 색 */
html.lecture .slidev-layout .prompt-body .slidev-code .codebox {
  display: block;
  padding: 0 0.7em;
  background: var(--code-bg);
  orphans: 1;
  widows: 1;
}
/* palette: teal 은 상자 위아래에 여백을 둔다 */
html.lecture.palette-teal .slidev-layout .prompt-body .slidev-code .codebox { padding: 0.3em 0.7em; }
html.lecture .slidev-layout .prompt-body .slidev-code .line.code {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: #e6edf3 !important;
}
html.lecture .slidev-layout .prompt-body .slidev-code .line.fence { color: var(--muted) !important; font-family: var(--mono); font-size: 0.74rem; }
/* ## 로 시작하는 줄(섹션 이름)은 색과 굵기로 구분한다 */
html.lecture .slidev-layout .prompt-body .slidev-code .line.sec { color: var(--py) !important; font-weight: 750; }
html.lecture .slidev-layout .prompt-body .ph,
html.lecture .slidev-layout .prompt-body .slidev-code .line:not(.code) span.ph { color: var(--yellow) !important; font-weight: 700; }   /* 둘째 선택자: 위의 color: inherit !important 보다 특이도를 높인다 */
html.lecture .slidev-layout .prompt-body .line.term {
  display: block;
  font-family: var(--mono) !important;
  font-size: 0.7rem !important;
  line-height: 1.25 !important;
  white-space: pre;
  color: var(--fg-2) !important;
}

/* 출력: 어두운 터미널 상자 */
html.lecture .callout.output {
  display: block;
  padding: 0.7rem 1rem 0.8rem;
  background: var(--code-bg);
  border: 1px solid var(--code-line);
  border-radius: var(--r);
}
html.lecture .callout.output .callout-head { min-height: 0; margin-bottom: 0.3rem; font-size: 0.72rem; font-weight: 700; color: var(--ok); letter-spacing: 0.04em; }
html.lecture .slidev-layout .output-pre, html.lecture .slidev-layout .output-pre p {
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.5;
  color: #d7deeb;
  white-space: pre-wrap;
  margin: 0;
}
html.lecture .slidev-layout .output .slidev-code, html.lecture .slidev-layout .output pre.shiki {
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>
