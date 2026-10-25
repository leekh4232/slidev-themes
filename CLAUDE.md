# Slidev Themes 작업 지침

Slidev 테마 `hossam`을 담은 저장소입니다. 덱 헤더의 `style: lecture | talk`로 두 모양(흰 바탕 강의용 · 검정 바탕 발표용)을, `sidebar: true | false`로 목차 사이드바를 고릅니다. 사용자는 이 저장소를 받아 덱 프런트매터에 테마 폴더 경로(`theme: ./slidev-themes/hossam`)를 적어 씁니다. VS Code 확장 **Open with Slidev**(`/Users/leekh/open-with-slidev`)는 테마를 내려받지 않고, 경로로 적힌 테마를 그대로 Slidev에 넘깁니다. `main`에 push한 내용은 사용자가 `git pull`할 때 반영됩니다.

테마는 `@slidev/types` · `@slidev/theme-default` 같은 패키지를 import하지 않습니다. 테마 폴더를 경로로 열 때 그 패키지를 찾지 못해 실행이 멈추거나 스타일이 통째로 빠지기 때문입니다. 필요한 스타일은 테마 안에 복사해 둡니다(`hossam/styles/layouts.css`).

응답과 문서는 한글로 씁니다. 코드, 커밋 메시지는 원래 언어를 유지합니다.

## 폴더

| 경로 | 내용 |
|:--|:--|
| `hossam/` | 테마 본체 (layouts · components · styles · deck.ts · global-top.vue · package.json). 스타일별 CSS는 `styles/lecture.css`(`html.lecture` 아래, `:where()`로 감싸 우선순위를 올리지 않음) · `styles/talk.css`(`html.talk` · `.slidev-layout.talk`) · 공통 토큰 `styles/shared.css` |
| `docs/index.html` | 소개 페이지 https://slidev-themes.hossam.kr (`docs/CNAME`). 다크, 한 페이지 |
| `docs/hossam.html` · `docs/talk.html` | 테마 매뉴얼. hossam.html은 공통 설정·사이드바·lecture, talk.html은 talk 스타일의 레이아웃·컴포넌트. 스타일은 `docs/manual.css` |
| `docs/img/` | 매뉴얼과 소개 페이지의 화면 캡처 (960×540 jpg). Open with Slidev 소개 페이지도 여기 그림을 씁니다 |
| `docs/examples/` | 예제 덱 `lecture-example.md` · `talk-example.md` |
| `README.md` | 배지, 테마 표, 쓰는 법, 예제 덱, 폴더 구조 |

## 테마를 고친 뒤에는 항상 아래 1~3을 이 순서로 합니다

### 1. 문서 갱신

- 레이아웃 · 컴포넌트 · 프롭 · 프런트매터가 바뀌면 `docs/hossam.html` 또는 `docs/talk.html`, 예제 덱, README를 맞춥니다. 화면이 달라졌으면 `docs/img/`의 캡처도 다시 찍습니다.
- 매뉴얼 페이지의 목차(`<nav class="toc">`)는 그 페이지의 `<h2 id>` 목록과 같아야 합니다.
- **제거된 기능은 "제거됨"이라고 쓰지 않고 아예 언급하지 않습니다.**
- 소개 페이지는 테마가 무엇인지만 짧게 씁니다. 자세한 내용은 매뉴얼에 둡니다.

### 2. 테스트

push 전에 반드시 확인합니다. 예제 덱은 프런트매터에 `theme: ../../hossam`처럼 이 저장소의 테마 폴더를 경로로 적어 두었으므로, 빌드하면 고친 테마가 그대로 쓰입니다. `--theme` 플래그는 쓰지 않습니다(프런트매터의 테마가 우선해 플래그가 무시됩니다).

```sh
npx -y -p @slidev/cli -p @slidev/theme-default slidev build docs/examples/lecture-example.md --out /tmp/lecture-dist
npx -y -p @slidev/cli -p @slidev/theme-default slidev build docs/examples/talk-example.md --out /tmp/talk-dist
```

- 빌드 결과 폴더를 루트로 띄워(`python3 -m http.server`) 바뀐 슬라이드를 눈으로 확인합니다. 하위 경로로 열면 자원 경로가 깨져 빈 화면이 나옵니다.
- 또는 VS Code에서 예제 덱을 우클릭 → **Open with Slidev**로 엽니다.

### 3. push

```sh
git add -A && git commit -m "<type>: <요약>" && git push origin main
```

- 커밋 메시지는 영어 Conventional Commits 형식(`feat:` · `fix:` · `docs:`)을 씁니다.
- 테스트에 실패하면 push하지 않습니다.
