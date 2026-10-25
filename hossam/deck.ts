// 덱 헤더(첫 슬라이드 프런트매터)의 테마 옵션을 읽는다.
//   style: lecture(기본, 흰 바탕 강의용) | talk(검정 바탕 발표용)
//   sidebar: true | false (기본: lecture 는 켬, talk 는 끔)
// 스타일별 CSS 는 <html> 의 lecture / talk 클래스 아래에 묶여 있어서, 이 함수를 쓰는 곳(레이아웃·global-top)이 클래스를 붙인다.
import { computed, watchEffect } from 'vue'
import { useNav } from '@slidev/client'

export function useDeckOptions() {
  const { slides } = useNav()
  const fm = computed(() => (slides.value[0]?.meta?.slide?.frontmatter ?? {}) as Record<string, unknown>)
  const style = computed(() => (fm.value.style === 'talk' ? 'talk' : 'lecture'))
  const sidebar = computed(() => {
    const v = fm.value.sidebar
    if (v === undefined || v === null || v === '') return style.value === 'lecture'
    return v === true || v === 'true'
  })
  if (typeof document !== 'undefined') {
    watchEffect(() => {
      const c = document.documentElement.classList
      c.toggle('talk', style.value === 'talk')
      c.toggle('lecture', style.value === 'lecture')
    })
  }
  return { style, sidebar }
}
