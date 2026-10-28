// 흰 슬라이드 위의 어두운 코드 상자에 잘 보이도록 고대비 테마를 쓴다(주석도 밝은 회색).
// defineShikiSetup(@slidev/types)은 받은 함수를 그대로 돌려줄 뿐이라 쓰지 않는다.
// 쓰면 테마 폴더를 경로(theme: ./hossam)로 열 때 그 패키지를 찾지 못해 실행이 멈춘다.
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

// 프롬프트 상자(````md) 안의 ```python 은 python 문법이 먼저 불려 와 있을 때만 칠해진다(빌드마다 들쭉날쭉).
// markdown 을 불러올 때 python 을 함께 불러오게 한다. 'shiki' 를 바로 import 하면 테마 폴더에서 못 찾으므로
// 실행 중인 slidev 위치에서 문법 파일을 찾고, 못 찾으면 기본 동작으로 둔다.
function markdownWithPython() {
  try {
    const req = createRequire(process.argv[1])
    const load = (name: string) => import(pathToFileURL(req.resolve(`@shikijs/langs/${name}`)).href).then(m => m.default)
    const markdown = async () => ({ default: [...await load('python'), ...await load('markdown')] })
    return { markdown, md: markdown }
  }
  catch {
    return undefined
  }
}

export default () => ({
  themes: { dark: 'github-dark-high-contrast', light: 'github-dark-high-contrast' },
  langs: markdownWithPython(),
})
