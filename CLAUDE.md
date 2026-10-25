# Slidev Themes 작업 지침

Slidev 테마 `jussam` · `hossam`을 담은 저장소입니다. VS Code 확장 **Open with Slidev**(`/Users/leekh/open-with-slidev`)가 실행 중에 이 저장소의 `main`을 tar.gz로 내려받아 씁니다. 그래서 **`main`에 push하면 곧바로 사용자에게 배포됩니다.** 다음 VS Code 세션의 첫 실행 때 새 커밋을 받습니다.

응답과 문서는 한글로 씁니다. 코드, 커밋 메시지는 원래 언어를 유지합니다.

## 폴더

| 경로 | 내용 |
|:--|:--|
| `jussam/` · `hossam/` | 테마 본체 (layouts · components · styles · global-top.vue · package.json) |
| `docs/index.html` | 소개 페이지 https://slidev-themes.hossam.kr (`docs/CNAME`). 다크, 한 페이지 |
| `docs/jussam.html` · `docs/hossam.html` | 테마 매뉴얼 (레이아웃 · 컴포넌트 · 프롭 · 예제 코드 · 화면). 스타일은 `docs/manual.css` |
| `docs/img/` | 매뉴얼과 소개 페이지의 화면 캡처 (960×540 jpg). Open with Slidev 소개 페이지도 여기 그림을 씁니다 |
| `docs/examples/` | 예제 덱 `jussam-example.md` · `hossam-example.md` |
| `README.md` | 배지, 테마 표, 쓰는 법, 예제 덱, 폴더 구조 |

## 테마를 고친 뒤에는 항상 아래 1~3을 이 순서로 합니다

### 1. 문서 갱신

- 레이아웃 · 컴포넌트 · 프롭 · 프런트매터가 바뀌면 `docs/jussam.html` 또는 `docs/hossam.html`, 예제 덱, README를 맞춥니다. 화면이 달라졌으면 `docs/img/`의 캡처도 다시 찍습니다.
- 매뉴얼 페이지의 목차(`<nav class="toc">`)는 그 페이지의 `<h2 id>` 목록과 같아야 합니다.
- **제거된 기능은 "제거됨"이라고 쓰지 않고 아예 언급하지 않습니다.**
- 소개 페이지는 테마가 무엇인지만 짧게 씁니다. 자세한 내용은 매뉴얼에 둡니다.
- 테마 이름을 더하거나 바꾸면 Open with Slidev의 `themes.json`과 드롭다운도 바꿔야 합니다. 그 저장소의 CLAUDE.md를 따릅니다.

### 2. 테스트

push가 곧 배포이므로 반드시 먼저 확인합니다.

```sh
npx -y -p @slidev/cli -p @slidev/theme-default slidev build docs/examples/jussam-example.md --theme ./jussam --out /tmp/jussam-dist
npx -y -p @slidev/cli -p @slidev/theme-default slidev build docs/examples/hossam-example.md --theme ./hossam --out /tmp/hossam-dist
```

- 빌드 결과 폴더를 루트로 띄워(`python3 -m http.server`) 바뀐 슬라이드를 눈으로 확인합니다. 하위 경로로 열면 자원 경로가 깨져 빈 화면이 나옵니다.
- 또는 VS Code에서 예제 덱을 우클릭 → **Open with Slidev**로 엽니다. 이때는 확장이 받아 둔 캐시가 아니라 이 폴더를 쓰도록 덱의 프런트매터에 `theme: ./jussam`처럼 경로를 적어 시험합니다.

### 3. push

```sh
git add -A && git commit -m "<type>: <요약>" && git push origin main
```

- 커밋 메시지는 영어 Conventional Commits 형식(`feat:` · `fix:` · `docs:`)을 씁니다.
- 테스트에 실패하면 push하지 않습니다.
