// 덱 헤더(첫 슬라이드 프런트매터)의 테마 옵션을 읽는다.
//   sidebar: true | false (기본: 켬)
//   exportDark: true | false (기본: 켬) — PDF·PNG 내보내기를 어두운 테마로
// 테마 CSS 는 <html> 의 lecture 클래스 아래에 묶여 있어서, 이 함수를 쓰는 곳(레이아웃·global-top)이 클래스를 붙인다.
import { computed } from 'vue'
import { useNav } from '@slidev/client'

export function useDeckOptions() {
  const { slides } = useNav()
  const fm = computed(() => (slides.value[0]?.meta?.slide?.frontmatter ?? {}) as Record<string, unknown>)
  const flag = (key: string) => computed(() => {
    const v = fm.value[key]
    if (v === undefined || v === null || v === '') return true
    return v === true || v === 'true'
  })
  const sidebar = flag('sidebar')
  const exportDark = flag('exportDark')
  if (typeof document !== 'undefined') document.documentElement.classList.add('lecture')
  return { sidebar, exportDark }
}
