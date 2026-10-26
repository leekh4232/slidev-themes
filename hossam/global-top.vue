<script setup lang="ts">
// 덱 헤더의 sidebar 가 켜져 있으면 모든 슬라이드 왼쪽에 고정되는 목차 사이드바를, style: talk 이면 맨 아래 진행 바를 그린다.
//  - 제목이 있는 슬라이드를 나열하고 현재 위치를 강조, 클릭하면 이동
//  - 오른쪽 가장자리를 드래그해 폭 조절(더블클릭 = 기본 폭), ◀/☰ 버튼 또는 s 키로 접기/펼치기
//  - 폭과 접힘 상태는 브라우저에 기억된다
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useDarkMode, useNav } from '@slidev/client'
import { useDeckOptions } from './deck'

const { style, sidebar } = useDeckOptions()

const { currentPage, total, slides, go, nextSlide, prevSlide, clicks, clicksTotal } = useNav()
// ---- 밝음/어두움 테마 (Slidev 내장 다크 모드를 그대로 쓴다: d 키와 같은 동작, 브라우저에 기억됨) ----
const { isDark, toggleDark } = useDarkMode()
// 목차용 짧은 제목: 앞의 이모지 제거, "—" 이후의 부제는 뗀다 ("5. 문자열 변수 — 글자를 담기" → "5. 문자열 변수")
function shortTitle(raw: string) {
  return raw.replace(/<[^>]+>/g, '').replace(/[`*]/g, '').replace(/^[^\p{L}\p{N}]+/u, '').split(/\s+[—–-]\s+/)[0].trim()   // HTML 태그·마크다운 기호(` **) 제거
}
// 표지(1쪽)와 프런트매터 hideInToc: true 인 슬라이드(종료 페이지 등)는 목록에 넣지 않는다
const items = computed(() =>
  slides.value
    .map(s => ({ no: s.no, title: s.no === 1 || s.meta?.slide?.frontmatter?.hideInToc ? '' : shortTitle(s.meta?.slide?.title ?? ''), sub: (s.meta?.slide?.level ?? 2) >= 3 }))
    .filter(s => s.title),
)
// ---- ### 항목 접기: 바로 위 ## 항목(parent) 아래로 묶고, 펼친 묶음만 보인다 ----
const tocItems = computed(() => {
  let parent = 0
  const list = items.value.map(it => { if (!it.sub) parent = it.no; return { ...it, parent } })
  const kids = new Set(list.filter(it => it.sub).map(it => it.parent))
  return list.map(it => ({ ...it, hasKids: kids.has(it.no) }))
})
// 한 번에 한 묶음만 펼친다 (-1 = 모두 접힘). 다른 묶음을 열면 앞의 묶음은 닫힌다
const openGroup = ref(-1)
function toggleGroup(no: number) { openGroup.value = openGroup.value === no ? -1 : no }
// 현재 슬라이드가 접힌 묶음 안에 있으면 그 ## 항목을 현재 위치로 강조
const hiddenCurParent = computed(() => {
  const cur = tocItems.value.find(it => it.no === currentPage.value)
  return cur?.sub && openGroup.value !== cur.parent ? cur.parent : -1
})
// 슬라이드를 옮기면 그 슬라이드가 든 묶음을 펼친다 (묶음이 없으면 모두 접는다)
watch([currentPage, tocItems], () => {
  const cur = tocItems.value.filter(it => it.no <= currentPage.value).pop()
  openGroup.value = !cur ? -1 : cur.sub ? cur.parent : cur.hasKids ? cur.no : -1
}, { immediate: true })
// 목차를 현재 위치로 자동 스크롤 (현재 항목을 목록 가운데로)
const listEl = ref<HTMLElement | null>(null)
function scrollToCurrent(behavior: ScrollBehavior = 'smooth') {
  const list = listEl.value, li = list?.querySelector<HTMLElement>('li.current')
  if (list && li) list.scrollTo({ top: li.offsetTop - (list.clientHeight - li.offsetHeight) / 2, behavior })
}
watch([currentPage, openGroup], () => nextTick(() => scrollToCurrent()))
const deckTitle = computed(() => (slides.value[0]?.meta?.slide?.frontmatter?.title ?? '') as string)
const lab = computed(() => deckTitle.value.split(' · ')[0])
const unit = computed(() => deckTitle.value.split(' · ').slice(1).join(' · '))

// ---- 웹페이지식 배치: 메인 발표 화면에서만 html.fluid 를 켠다 (스타일은 base.css) ----
const isPlay = typeof location !== 'undefined' && !/^\/(presenter|overview|print|export|notes|entry)/.test(location.pathname)

// ---- 폭·접힘 상태 ----
const MIN_W = 180, MAX_W = 520, DEFAULT_W = 260
const panelW = ref(DEFAULT_W)
const open = ref(true)
// 사이드바가 꺼져 있으면 본문 왼쪽 여백(--sidebar-w)을 0 으로 둔다. 켜져 있으면 마운트 전(인쇄·발표자 화면 포함)에도 기본 폭을 비워 둔다.
if (typeof document !== 'undefined') document.documentElement.style.setProperty('--sidebar-w', sidebar.value ? `${DEFAULT_W}px` : '0px')
function apply() {
  // --sidebar-w 는 본문 왼쪽 여백에 쓰인다. 접히면 0.
  document.documentElement.style.setProperty('--sidebar-w', open.value ? `${panelW.value}px` : '0px')
  try {
    localStorage.setItem('pyai-sidebar-w', String(panelW.value))
    localStorage.setItem('pyai-sidebar-open', open.value ? '1' : '0')
  } catch { /* 저장 불가 환경 무시 */ }
}
watch([panelW, open], apply)
function setWidth(px: number) { panelW.value = Math.round(Math.min(MAX_W, Math.max(MIN_W, px))) }
function toggle() { open.value = !open.value }
function resetWidth() { setWidth(DEFAULT_W) }

// ---- 본문 확대/축소 (사이드바는 그대로, .slidev-layout 에 CSS zoom) ----
const zoom = ref(1)
function applyZoom() {
  document.documentElement.style.setProperty('--zoom', String(zoom.value))
  try { localStorage.setItem('pyai-zoom', String(zoom.value)) } catch { /* 무시 */ }
}
function setZoom(z: number) { zoom.value = Math.round(Math.min(2, Math.max(0.6, z)) * 10) / 10; applyZoom() }
function zoomIn() { setZoom(zoom.value + 0.1) }
function zoomOut() { setZoom(zoom.value - 0.1) }
function zoomReset() { setZoom(1) }

// ---- 본문 폭: 고정(최대 1920px, 가운데) / 100%(창 전체, 기본) ----
const wide = ref(true)
function applyWide() {
  document.documentElement.classList.toggle('wide', wide.value)
  try { localStorage.setItem('pyai-width', wide.value ? 'full' : 'fixed') } catch { /* 무시 */ }
}
function toggleWide() { wide.value = !wide.value; applyWide() }

// ---- 애니메이션 켬/끔 ----
//  끔: 클릭 단계 없이 슬라이드의 모든 내용이 바로 보이고(클릭 수를 최대로), →/← 가 슬라이드 단위로 이동, 전환 효과 없음
const CLICKS_MAX = 99999
const anim = ref(true)
function applyAnim() {
  document.documentElement.classList.toggle('no-anim', !anim.value)
  try { localStorage.setItem('pyai-anim', anim.value ? '1' : '0') } catch { /* 무시 */ }
  if (!anim.value) go(currentPage.value, CLICKS_MAX, true)
}
function toggleAnim() { anim.value = !anim.value; applyAnim() }
function goTo(no: number) { go(no, anim.value ? 0 : CLICKS_MAX) }
watch(currentPage, () => { if (!anim.value && clicks.value < clicksTotal.value) go(currentPage.value, CLICKS_MAX) })
// ---- 방향키: 슬라이드가 화면보다 길면 먼저 스크롤, 끝에 닿으면 다음 클릭/슬라이드 (←는 위로 스크롤 후 이전) ----
const NEXT_KEYS = ['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter']
const PREV_KEYS = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']
function activePage(): HTMLElement | null {
  return [...document.querySelectorAll<HTMLElement>('#slide-content .slidev-page')].find(el => el.style.display !== 'none') ?? null
}
function scrollStep(dir: 1 | -1): boolean {
  const el = activePage(); if (!el) return false
  const step = Math.round(el.clientHeight * 0.85)
  if (dir > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 2) { el.scrollBy({ top: step, behavior: 'smooth' }); return true }
  if (dir < 0 && el.scrollTop > 2) { el.scrollBy({ top: -step, behavior: 'smooth' }); return true }
  return false
}
watch(currentPage, () => { requestAnimationFrame(() => { const el = activePage(); if (el) el.scrollTop = 0 }) })
function onKeyCapture(e: KeyboardEvent) {
  if (e.ctrlKey || e.metaKey || e.altKey) return
  const t = e.target as HTMLElement | null
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  const next = NEXT_KEYS.includes(e.key), prev = PREV_KEYS.includes(e.key)
  if (!next && !prev) return
  // 1) 스크롤할 내용이 남아 있으면 스크롤만 하고 끝
  if (scrollStep(next ? 1 : -1)) { e.preventDefault(); e.stopImmediatePropagation(); return }
  // 2) 애니메이션 끔이면 슬라이드 단위로 이동
  if (!anim.value) { e.preventDefault(); e.stopImmediatePropagation(); next ? nextSlide(true) : prevSlide(true) }
  // 3) 그 외엔 Slidev 기본 동작(다음 클릭/슬라이드)
}

function startDrag(e: PointerEvent) {
  e.preventDefault()
  const handle = e.currentTarget as HTMLElement
  handle.setPointerCapture(e.pointerId)
  const left = (handle.parentElement as HTMLElement).getBoundingClientRect().left
  document.body.style.userSelect = 'none'; document.body.style.cursor = 'col-resize'
  const move = (ev: PointerEvent) => setWidth(ev.clientX - left)
  const stop = () => {
    handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', stop)
    document.body.style.userSelect = ''; document.body.style.cursor = ''
  }
  handle.addEventListener('pointermove', move); handle.addEventListener('pointerup', stop)
}
function onKey(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  if (e.ctrlKey || e.metaKey || e.altKey) return
  if (e.key === 's') { e.preventDefault(); toggle() }
  if (e.key === 'a') { e.preventDefault(); toggleAnim() }
  if (e.key === 'w') { e.preventDefault(); toggleWide() }
  if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomIn() }
  if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomOut() }
  if (e.key === '0') { e.preventDefault(); zoomReset() }
}

// ---- 표 첫 열: 기본은 nowrap(항목 열). 첫 열이 표 폭의 30% 를 넘을 만큼 길면 table.first-long 을 붙여 줄바꿈을 허용한다.
//  슬라이드 프런트매터 class: tbl-wrap / tbl-nowrap 이면 자동 판정을 건너뛴다(CSS 가 강제). 슬라이드 전환·창 크기·배율 변화마다 다시 잰다.
const FIRST_COL_MAX = 0.3
function measureTables() {
  const tables = document.querySelectorAll<HTMLTableElement>('#slide-content .slidev-layout table, #slide-content .slidev-layout .first-long')
  tables.forEach(t => {
    if (t.closest('.tbl-wrap, .tbl-nowrap')) return
    t.classList.remove('first-long')
    const cell = t.querySelector<HTMLElement>('tr > :first-child')
    const tw = t.getBoundingClientRect().width
    if (!cell || tw <= 0) return
    if (cell.getBoundingClientRect().width / tw > FIRST_COL_MAX) t.classList.add('first-long')
  })
}
function scheduleMeasure() { nextTick(() => requestAnimationFrame(measureTables)) }
watch([currentPage, zoom, wide, open, panelW], scheduleMeasure)
onMounted(() => {
  scheduleMeasure(); setTimeout(measureTables, 400)   // 글꼴 로딩 뒤 한 번 더
  window.addEventListener('resize', scheduleMeasure)
  if (typeof document !== 'undefined' && 'fonts' in document) (document as any).fonts?.ready?.then(measureTables)
})
onUnmounted(() => window.removeEventListener('resize', scheduleMeasure))

onMounted(() => {
  if (!isPlay || !sidebar.value) return
  document.documentElement.classList.add('fluid')
  try {
    const w = Number(localStorage.getItem('pyai-sidebar-w')); if (w) panelW.value = Math.min(MAX_W, Math.max(MIN_W, w))
    const o = localStorage.getItem('pyai-sidebar-open'); if (o === '0') open.value = false
    if (localStorage.getItem('pyai-anim') === '0') anim.value = false
    if (!localStorage.getItem('slidev-color-schema')) isDark.value = false   // 처음엔 밝은 테마
    const z = Number(localStorage.getItem('pyai-zoom')); if (z) zoom.value = z
    // 예전 키(pyai-wide)는 열 때마다 '0'이 저장돼 기본값을 덮으므로 읽지 않는다
    if (localStorage.getItem('pyai-width') === 'fixed') wide.value = false
  } catch { /* 무시 */ }
  apply(); applyAnim(); applyZoom(); applyWide()
  setTimeout(() => scrollToCurrent('auto'), 300)   // 새로 열었을 때도 현재 항목이 보이게
  window.addEventListener('keydown', onKey)
  window.addEventListener('keydown', onKeyCapture, true)
})
onUnmounted(() => {
  document.documentElement.classList.remove('fluid')
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('keydown', onKeyCapture, true)
  document.documentElement.classList.remove('no-anim')
  document.documentElement.classList.remove('wide')
})
</script>

<template>
  <div v-if="style === 'talk'" class="talk-bar"><i :style="{ width: `${(currentPage / total) * 100}%` }" /></div>
  <template v-if="sidebar">
  <aside class="toc" :class="{ collapsed: !open }" :style="{ width: panelW + 'px' }">
    <button class="toc-toggle" title="사이드바 접기 (s)" @click="toggle">◀</button>
    <div class="toc-head" title="표지로 이동" @click="goTo(1)">
      <div class="toc-lab" :title="lab">{{ lab }}</div>
      <div class="toc-unit" :title="unit">{{ unit }}</div>
    </div>
    <ol ref="listEl" class="toc-list">
      <template v-for="it in tocItems" :key="it.no">
        <li
          v-if="!it.sub || openGroup === it.parent"
          :class="{ current: it.no === currentPage || (it.no === hiddenCurParent), done: it.no < currentPage, sub: it.sub }"
          @click="goTo(it.no)"
        >
          <span class="txt" :title="it.title">{{ it.title }}</span>
          <button v-if="it.hasKids" class="caret" :class="{ open: openGroup === it.no }" title="하위 항목 펼치기/접기" @click.stop="toggleGroup(it.no)">▸</button>
        </li>
      </template>
    </ol>
    <div class="toc-foot">
      <span>{{ currentPage }} / {{ total }}</span>
      <span class="foot-btns">
        <button class="anim-btn" :class="{ off: !anim }" :title="anim ? '애니메이션 끄기 (a)' : '애니메이션 켜기 (a)'" @click="toggleAnim">{{ anim ? '✨ 켬' : '⏸ 끔' }}</button>
        <button v-if="style === 'lecture'" class="anim-btn" :title="isDark ? '밝은 테마 (d)' : '어두운 테마 (d)'" @click="toggleDark()">{{ isDark ? '☀️' : '🌙' }}</button>
      </span>
    </div>
    <div class="toc-zoom">
      <span>본문 폭</span>
      <span class="foot-btns">
        <button class="anim-btn" :class="{ on: !wide }" title="고정 폭 (w)" @click="wide && toggleWide()">고정</button>
        <button class="anim-btn" :class="{ on: wide }" title="창 전체 폭 (w)" @click="!wide && toggleWide()">100%</button>
      </span>
    </div>
    <div class="toc-zoom">
      <span>확대/축소</span>
      <span class="foot-btns">
        <button class="anim-btn" title="축소 (-)" @click="zoomOut">－</button>
        <button class="anim-btn" title="원래 크기 (0)" @click="zoomReset">{{ Math.round(zoom * 100) }}%</button>
        <button class="anim-btn" title="확대 (+)" @click="zoomIn">＋</button>
      </span>
    </div>
    <div class="resizer" title="드래그해서 폭 조절 · 더블클릭하면 기본 폭" @pointerdown="startDrag" @dblclick="resetWidth" />
  </aside>
  <button v-if="!open" class="toc-open" title="사이드바 펼치기 (s)" @click="toggle">☰</button>
  <button v-if="!open" class="toc-open anim-float" :class="{ off: !anim }" :title="anim ? '애니메이션 끄기 (a)' : '애니메이션 켜기 (a)'" @click="toggleAnim">{{ anim ? '✨' : '⏸' }}</button>
  <button v-if="!open && style === 'lecture'" class="toc-open dark-float" :title="isDark ? '밝은 테마 (d)' : '어두운 테마 (d)'" @click="toggleDark()">{{ isDark ? '☀️' : '🌙' }}</button>
  <button v-if="!open" class="toc-open zoom-float-out" title="축소 (-)" @click="zoomOut">－</button>
  <button v-if="!open" class="toc-open zoom-float-in" title="확대 (+)" @click="zoomIn">＋</button>
  <button v-if="!open" class="toc-open wide-float" :title="wide ? '고정 폭 (w)' : '창 전체 폭 (w)'" @click="toggleWide">{{ wide ? '⇥⇤' : '⇤⇥' }}</button>
  </template>
</template>

<style scoped>
.talk-bar { position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; background: rgba(255, 255, 255, 0.07); pointer-events: none; z-index: 20; }
.talk-bar i { display: block; height: 2px; background: #e5e5e5; transition: width 0.22s ease; }
@media print { .talk-bar { display: none; } }
.toc {
  position: absolute; left: 0; top: 0; bottom: 0; width: var(--sidebar-w, 260px);
  background: var(--surface, #f3f6fb); border-right: 1px solid var(--line, rgba(10,20,40,.1));
  display: flex; flex-direction: column; padding: 18px 14px 12px; z-index: 5;
  font-family: "Pretendard Variable", Pretendard, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  color: var(--text, #16213a);
  transition: transform .2s ease;
}
.toc.collapsed { transform: translateX(-100%); }
.toc-toggle, .toc-open {
  width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--line, rgba(10,20,40,.1));
  background: var(--card-bg, #fff); color: var(--muted, #5d6b85); cursor: pointer; font-size: 0.8rem; line-height: 1;
  display: grid; place-items: center;
}
.toc-toggle { position: absolute; top: 12px; right: 12px; }
.toc-toggle:hover, .toc-open:hover { color: var(--py, #0a7fc2); border-color: var(--py, #0a7fc2); }
.toc-open { position: absolute; top: 14px; left: 14px; z-index: 6; box-shadow: 0 2px 8px rgba(11,18,32,.12); }
.toc-head { padding: 0 44px 10px 4px; border-bottom: 1px solid var(--line, rgba(10,20,40,.1)); margin-bottom: 8px; cursor: pointer; }   /* 클릭하면 표지(1쪽)로. 표지는 목록에 넣지 않는다 */
.toc-head:hover .toc-unit { color: var(--py, #0a7fc2); }
.toc-lab { font-size: 0.9rem; font-weight: 800; letter-spacing: .08em; color: var(--py, #0a7fc2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.toc-unit { font-size: 1.05rem; font-weight: 700; line-height: 1.25; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.toc-list { position: relative; list-style: none; margin: 0; padding: 0; flex: 1; overflow-y: auto; }   /* relative: 자동 스크롤이 li.offsetTop 을 목록 기준으로 잰다 */
.toc-list li .txt { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }   /* 항목은 한 줄, 넘치면 말줄임 (전체 제목은 마우스를 올리면 보인다) */
.toc-list li {
  display: flex; align-items: flex-start; gap: 9px; padding: 6px 8px; margin: 2px 0;
  font-size: 0.9rem; line-height: 1.3; border-radius: 7px; cursor: pointer; color: var(--muted, #5d6b85);
}
.toc-list li:hover { background: rgba(10,127,194,.08); }
.toc-list li.sub { padding-left: 24px; }   /* ### 슬라이드: 한 단계 들여쓰기 */
.toc-list li.sub .txt { font-size: .93em; }
.toc-list li .caret {
  margin-left: auto; flex: 0 0 auto; width: 20px; height: 20px; border: none; background: none; padding: 0;
  color: var(--muted, #5d6b85); font-size: .8rem; line-height: 20px; cursor: pointer; border-radius: 5px; transition: transform .15s;
}
.toc-list li .caret:hover { background: rgba(10,127,194,.12); color: var(--py, #0a7fc2); }
.toc-list li .caret.open { transform: rotate(90deg); }
.toc-list li.current { background: var(--py-soft, rgba(10,127,194,.1)); color: var(--text, #16213a); font-weight: 700; }
.resizer {
  position: absolute; top: 0; bottom: 0; right: -4px; width: 8px; cursor: col-resize; z-index: 6;
  background: transparent; transition: background .15s;
}
.resizer:hover, .resizer:active { background: rgba(10,127,194,.35); }
.toc-foot { font-size: 0.9rem; color: var(--muted, #5d6b85); padding: 8px 6px 0; border-top: 1px solid var(--line, rgba(10,20,40,.1)); font-variant-numeric: tabular-nums; display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.foot-btns { display: flex; gap: 4px; }
.anim-btn { font-size: 0.8rem; font-weight: 700; padding: 4px 8px; border-radius: 8px; border: 1px solid var(--line, rgba(10,20,40,.1)); background: var(--card-bg, #fff); color: var(--py, #0a7fc2); cursor: pointer; white-space: nowrap; }
.anim-btn.off { color: var(--ai, #d9611f); }
.anim-btn.on { background: var(--py-soft, rgba(10,127,194,.1)); border-color: var(--py, #0a7fc2); }
.anim-btn:hover { border-color: currentColor; }
.anim-float { left: 52px; }
.dark-float { left: 90px; }
.zoom-float-out { left: 128px; }
.zoom-float-in { left: 166px; }
.wide-float { left: 204px; width: auto; padding: 0 6px; }
.toc-zoom { font-size: 0.9rem; color: var(--muted, #5d6b85); padding: 6px 6px 0; display: flex; align-items: center; justify-content: space-between; gap: 6px; white-space: nowrap; }
.anim-float.off { color: var(--ai, #d9611f); }
</style>
