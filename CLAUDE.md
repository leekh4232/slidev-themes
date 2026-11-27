# Slidev Themes 작업 지침

Slidev 테마 여섯 가지를 담은 저장소입니다: `hossam`(코딩 강의용, 직각 상자) · `lab`(LAB 실습용, hossam 사이드바 + 옅은 색 면 · 문제 상자, `palette: teal`) · `jussam`(특강·발표용, 검정 바탕 메시 그라디언트 · 둥근 카드 · 차트 컴포넌트) · `editorial`(보고서 발표용 편집 디자인 · 인포그래픽 컴포넌트) · `noel` · `mitten`(jussam 바탕의 시즌 테마). 모두 덱 헤더의 `sidebar: true | false`로 목차 사이드바를 켜고 끕니다. 사용자는 이 저장소를 받아 덱 프런트매터에 테마 폴더 경로(`theme: ./slidev-themes/hossam` 등)를 적어 씁니다.

VS Code 확장 **Open with Slidev**(`/Users/leekh/open-with-slidev`)는 테마를 내려받지 않고, 경로로 적힌 테마를 그대로 Slidev에 넘깁니다. `main`에 push한 내용은 사용자가 `git pull`할 때 반영됩니다.

**테마는 서로 독립입니다.** 한쪽 폴더의 파일을 다른 쪽에서 import하거나 경로로 참조하지 않습니다. 사이드바 · 원고 보기 · 넘침 표시 · 기본 컴포넌트처럼 같은 기능은 폴더마다 따로 사본을 둡니다. 공통 기능(사이드바 `global-top.vue` · Callout 등)을 고치면 같은 코드를 가진 모든 테마 폴더에 반영하고, 예제 덱을 모두 빌드해 확인합니다.

테마는 `@slidev/types` · `@slidev/theme-default` 같은 패키지를 import하지 않습니다. 테마 폴더를 경로로 열 때 그 패키지를 찾지 못해 실행이 멈추거나 스타일이 통째로 빠지기 때문입니다. 필요한 스타일은 테마 안에 복사해 둡니다(`<테마>/styles/layouts.css`).

**테마를 고치면 그 테마를 설명하는 html도 반드시 함께 고칩니다.** 테마 폴더(`<테마>/`)의 파일을 하나라도 바꿨으면 같은 커밋에서 매뉴얼 `docs/<테마>.html`을 맞추고, 화면이 달라졌으면 `docs/img/`의 캡처도 다시 찍습니다. 소개 페이지 `docs/index.html`에 실린 내용이 달라졌으면 그것도 고칩니다. 겉으로 드러나는 변화가 없어 고칠 문장이 없을 때도 매뉴얼을 열어 확인한 뒤에 넘어갑니다. html을 맞추지 않은 테마 변경은 push하지 않습니다. 자세한 순서는 아래 「1. 문서 갱신」에 있습니다.

응답과 문서는 한글로 씁니다. 코드, 커밋 메시지는 원래 언어를 유지합니다.

## 폴더

| 경로 | 내용 |
|:--|:--|
| `hossam/` | 테마 본체 (layouts · components · styles · deck.ts · global-top.vue · package.json). CSS는 `styles/lecture.css`(`html.lecture` 아래, `:where()`로 감싸 우선순위를 올리지 않음) · 공통 토큰 `styles/shared.css` |
| `lab/` | hossam 사이드바(`global-top.vue`)에 별도 디자인의 스타일 · 컴포넌트. `html.lecture` 아래. `Problem`(문제 상자) 컴포넌트, 덱 헤더 `palette: teal` → `deck.ts`가 `html.palette-teal`을 붙이고 `styles/shared.css` 끝의 토큰이 색을 바꿈. 출처: ai-learning-activity 13번 테마(파랑) + 14번 stat14 테마(청록). 두 테마의 원본은 2026-11-27에 그 저장소에서 지웠고 이 폴더가 원본임 |
| `jussam/` | 테마 본체 (구조는 hossam과 같음). CSS는 `styles/jussam.css`(`html.jussam` 아래, `:where()`) · 공통 토큰 `styles/shared.css`. 발표 컴포넌트(Card · Hero · Agenda · 차트 …)가 더 있고, `Stat`(n/value) · `Timeline`(events/li)은 프롭에 따라 두 모양을 그립니다 |
| `editorial/` | 보고서 발표 테마. `html.editorial` 아래. 레이아웃 blocks, 인포그래픽 컴포넌트 12종. `feedback-viz-followup` 스킬이 씁니다 |
| `noel/` · `mitten/` | jussam 사본을 바탕으로 한 시즌 테마. 색 · 장식은 `styles/noel-skin.css` · `styles/mitten-skin.css`. mitten은 `place` · `photos` 레이아웃이 더 있음 |
| `docs/index.html` | 소개 페이지 https://slidev-themes.hossam.kr (`docs/CNAME`). 라이트, 한 페이지. 테마 고르기 표와 테마별 미리보기 썸네일 |
| `docs/llms.txt` · `docs/robots.txt` · `docs/sitemap.xml` | AI · 크롤러용. `llms.txt`는 사이트 요약(마크다운)과 문서 링크. 각 html `<head>`에는 JSON-LD 구조화 데이터와 `llms.txt` 링크가 있습니다 |
| `docs/<테마>.html` | 테마 매뉴얼(미리보기 · 설정 · 사이드바 · 글쓰기 · 레이아웃 · 컴포넌트). 맨 위 `#preview`에 쪽 모양 미리보기 격자(`.gallery`). 스타일은 `docs/manual.css`(라이트, 왼쪽 사이드바에 문서 링크와 목차). 코드 블록은 Prism.js로 칠하고 색은 `docs/code.css`(html 공통) |
| `docs/img/` | 매뉴얼과 소개 페이지의 화면 캡처 (960×540 jpg, `<테마>-<이름>.jpg`. hossam의 옛 캡처는 `lecture-*`). Open with Slidev 소개 페이지도 여기 그림을 씁니다 |
| `docs/examples/` | 예제 덱 `lecture-example.md`(hossam) · `lab-example.md` · `lab-teal-example.md` · `jussam-example.md` · `editorial-example.md` · `noel-example.md` · `mitten-example.md`. 예제 그림은 `img/` |
| `tools/capture.py` | 빌드한 예제 덱에서 미리보기 그림을 찍는 도구(사용법은 파일 머리 주석) |
| `README.md` | 배지, 테마 고르기 표, 쓰는 법, 예제 덱, 폴더 구조 |

## 테마를 고친 뒤에는 항상 아래 1~3을 이 순서로 합니다

### 1. 문서 갱신

- 레이아웃 · 컴포넌트 · 프롭 · 프런트매터가 바뀌면 그 테마의 매뉴얼(`docs/<테마>.html`), 예제 덱, README를 맞춥니다. 화면이 달라졌으면 `tools/capture.py`로 `docs/img/`의 캡처를 다시 찍고, 매뉴얼의 미리보기 격자도 맞춥니다. 새 테마를 더하면 매뉴얼(미리보기 포함) · 예제 덱 · 소개 페이지 카드 · 모든 매뉴얼의 사이드바 문서 링크를 함께 만듭니다.
- 매뉴얼 페이지의 목차(`<nav class="toc">`)는 그 페이지의 `<h2 id>` 목록과 같아야 합니다.
- **제거된 기능은 "제거됨"이라고 쓰지 않고 아예 언급하지 않습니다.**
- 기능 · 명령 · 메뉴 · 요구 버전이 바뀌면 `docs/llms.txt`의 요약과 html `<head>`의 JSON-LD(`description` · `softwareRequirements`)도 맞춥니다. 페이지를 더하거나 빼면 `docs/sitemap.xml`도 고칩니다.
- 소개 페이지는 테마가 무엇인지만 짧게 씁니다. 자세한 내용은 매뉴얼에 둡니다.

### 2. 테스트

push 전에 반드시 확인합니다. 예제 덱은 프런트매터에 `theme: ../../hossam`처럼 이 저장소의 테마 폴더를 경로로 적어 두었으므로, 빌드하면 고친 테마가 그대로 쓰입니다. `--theme` 플래그는 쓰지 않습니다(프런트매터의 테마가 우선해 플래그가 무시됩니다). 고친 테마의 예제 덱을 빌드하고, 공통 기능을 고쳤으면 모든 예제 덱을 빌드합니다.

```sh
for f in lecture lab lab-teal jussam editorial noel mitten; do
  npx -y -p @slidev/cli -p @slidev/theme-default slidev build docs/examples/$f-example.md --out /tmp/$f-dist
done
python3 tools/capture.py /tmp/lab-dist /tmp/lab-check "1:cover,2:section"   # 넘친 쪽은 ⚠ 내용 넘침 으로 알려 줌
```

- 빌드 결과 폴더를 루트로 띄워(`python3 -m http.server`) 바뀐 슬라이드를 눈으로 확인합니다. 하위 경로로 열면 자원 경로가 깨져 빈 화면이 나옵니다.
- 또는 VS Code에서 예제 덱을 우클릭 → **Open with Slidev**로 엽니다.

### 3. push

```sh
git add -A && git commit -m "<type>: <요약>" && git push origin main
```

- 커밋 메시지는 영어 Conventional Commits 형식(`feat:` · `fix:` · `docs:`)을 씁니다.
- 테스트에 실패하면 push하지 않습니다.
