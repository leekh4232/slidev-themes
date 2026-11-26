# Slidev Themes

[![Slidev theme](https://img.shields.io/badge/Slidev-theme-2b90b6)](https://sli.dev)
![theme hossam](https://img.shields.io/badge/theme-hossam-ff3d9a)
![theme jussam](https://img.shields.io/badge/theme-jussam-007cf0)
![theme lab](https://img.shields.io/badge/theme-lab-2f6bf2)
![theme editorial](https://img.shields.io/badge/theme-editorial-1f4e9e)
![theme noel](https://img.shields.io/badge/theme-noel-1f6b45)
![theme mitten](https://img.shields.io/badge/theme-mitten-c2416b)
[![Last commit](https://img.shields.io/github/last-commit/leekh4232/slidev-themes?color=7c5cff)](https://github.com/leekh4232/slidev-themes/commits/main)
[![Open with Slidev](https://img.shields.io/badge/Open%20with%20Slidev-VS%20Code-007ACC)](https://marketplace.visualstudio.com/items?itemName=leekh.open-with-slidev)
[![License MIT](https://img.shields.io/badge/license-MIT-2ea44f)](LICENSE)

🌐 **소개 페이지 · [slidev-themes.hossam.kr](https://slidev-themes.hossam.kr/)**

[Slidev](https://sli.dev) 테마 여섯 가지를 담은 저장소입니다. 테마는 서로 의존하지 않는 독립 폴더입니다. 저장소를 받아 테마 폴더를 경로로 지정해 씁니다. VS Code에서는 [Open with Slidev](https://marketplace.visualstudio.com/items?itemName=leekh.open-with-slidev)로 바로 열 수 있습니다.

| 테마 | 종류 | 어울리는 덱 | 미리보기 · 사용법 |
|:--|:--|:--|:--|
| `hossam` | 강의 | 코딩 수업 교안. 코드 · 프롬프트 · 출력이 많은 쪽 | [hossam.html](https://slidev-themes.hossam.kr/hossam.html) |
| `lab` | 실습 | LAB 실습 덱. 문제 상자(Problem), 흰 바탕 과목은 `palette: teal` | [lab.html](https://slidev-themes.hossam.kr/lab.html) |
| `jussam` | 발표 | 특강 · 세미나. 큰 숫자와 차트로 말하는 발표 | [jussam.html](https://slidev-themes.hossam.kr/jussam.html) |
| `editorial` | 발표 | 분석 보고서 평가 · 피드백. 근거를 표 · 인포그래픽으로 정리 | [editorial.html](https://slidev-themes.hossam.kr/editorial.html) |
| `noel` | 시즌 | 크리스마스 · 연말 모임. jussam 컴포넌트 그대로 | [noel.html](https://slidev-themes.hossam.kr/noel.html) |
| `mitten` | 시즌 | 겨울 나들이 · 여행 계획. 장소(place) · 사진(photos) 레이아웃 | [mitten.html](https://slidev-themes.hossam.kr/mitten.html) |

각 매뉴얼 맨 위의 **미리보기**에 그 테마가 그리는 쪽 모양(레이아웃 · 컴포넌트)이 그림으로 모여 있어, 테마를 고를 때 비교해 볼 수 있습니다.

`hossam`은 코딩 강의용 테마입니다. 처음 열면 어두운 바탕이고 d 키(🌙/☀️ 버튼)로 밝게 바꿉니다. 상자는 모두 직각(1px 가는 선 · 4px 윗선, 그림자 없음)입니다. 목차 사이드바(폭 조절 · 접기 · 확대/축소 · 다크), 표지 · 간지 · 카드형 · 웹진형 · 인포그래픽 레이아웃, 상자(Callout: 콜아웃 · 프롬프트 · 출력 · 번호 머리띠를 `kind`와 프롭으로 조정) · 타일(Tile: 라벨 · 제목 · 큰 숫자 · 본문을 쌓는 직각 상자, `kind`로 바탕 조정) · 핵심 한 줄(Core) · 칩(Chip) · 번호 목록(Steps: 단계 · 흐름도 · 타임라인을 `type`으로 조정) · 격자 · 큰 숫자 · 유튜브 썸네일 컴포넌트와 형광펜(`.hl`) · 빈칸(`.blank`) 클래스가 있고, 모든 슬라이드 오른쪽 아래에 쪽 번호(현재/전체)가 붙고, 덱 헤더(첫 슬라이드 프런트매터)의 `sidebar`로 사이드바를 켜고 끕니다(켜도 처음에는 접힌 채 열리고 ☰ 버튼 · s 키로 펼칩니다). 슬라이드는 항상 16:9 비율로 창에 맞춰 확대·축소되고, 넘치는 내용은 스크롤 없이 잘리며 빨간 테두리로 표시됩니다. 자세한 내용은 [hossam 사용법](https://slidev-themes.hossam.kr/hossam.html)에 있습니다.

![hossam 표지와 목차 사이드바](docs/img/lecture-cover.jpg)

`jussam`은 특강·발표용 테마입니다. 처음 열면 검정 바탕이고 d 키로 밝게 바꿉니다. 메시 그라디언트 표지 · 파트별 시그니처 색(`part: 1~4`) · 둥근 카드(12px)와 그림자가 특징이고, 카드(Card) · 큰 숫자(Stat `n`) · 히어로(Hero) · 목차(Agenda · NumList · Item) · 전후 비교(BeforeAfter · Side) · 맺음말(Kicker) · 차트(Gauge · Slope · Meter · HBar · Bars · Funnel · Branch · Mul · Formula · 날짜 축 Timeline `events`) · 단계 로드맵(Roadmap) · 좌표 흐름도(NodeMap) · 시대 영역도(Eras) · 그림 채우기(Figure, 흰 받침 `paper`) 컴포넌트가 있습니다. 목차 사이드바 · 원고 보기 · 확대/축소 · 넘침 표시 · 쪽 번호, 카드형 · 웹진형 · 인포그래픽 레이아웃, Callout · Prompt · Output · Steps · Tile · Core · Chip 같은 기본 컴포넌트는 hossam과 같은 방식으로 들어 있습니다. 자세한 내용은 [jussam 사용법](https://slidev-themes.hossam.kr/jussam.html)에 있습니다.

![jussam 표지](docs/img/jussam-cover.jpg)

`lab`은 LAB 실습용 테마입니다. hossam의 사이드바 · 원고 보기 · 직각 상자를 쓰면서 상자를 옅은 색 면으로 칠하고, 코딩 테스트 문제 상자(Problem: `tier` 맛보기 · 필수 · 도전, `level` · `id`(프로그래머스 번호) · `source` · `time`(예상 소요시간))가 있습니다. 덱 헤더에 `palette: teal`을 적으면 흰 바탕에 어울리는 청록 · 남색으로 바뀝니다. 자세한 내용은 [lab 사용법](https://slidev-themes.hossam.kr/lab.html)에 있습니다.

![lab 문제 상자](docs/img/lab-problem.jpg)

`editorial`은 보고서 · 평가 자료처럼 숫자와 근거를 차분하게 보여 주는 발표용 테마입니다. 연세블루 색면과 금색 가는 선, 굵은 제목과 가는 큰 번호를 대비시킨 편집 디자인이고 상자는 모두 직각입니다. 표지 · 간지 · 블록형(blocks) 레이아웃과, 배열만 넘기면 그려지는 인포그래픽 컴포넌트 12종(Bars · Trend · Dumbbell · Flow · Lanes · Hypo · HypoGrid · VarGrid · Stats · Checklist · CanCannot · Review)이 있습니다. 자세한 내용은 [editorial 사용법](https://slidev-themes.hossam.kr/editorial.html)에 있습니다.

![editorial 표지](docs/img/editorial-cover.jpg)

`noel`과 `mitten`은 jussam을 바탕으로 만든 시즌 테마입니다. `noel`은 짙은 전나무색 밤 바탕에 금색 가는 선 · 빨강 포인트 · 명조 제목을 쓰고 눈이 천천히 내리는 크리스마스 테마입니다. `mitten`은 눈송이와 목도리 줄무늬로 꾸민 귀여운 겨울 테마로, 장소 소개(place)와 사진 모음(photos) 레이아웃이 더 있습니다. 두 테마 모두 jussam의 레이아웃과 컴포넌트를 자체 사본으로 갖고 있어 테마 경로만 바꾸면 jussam 덱을 그대로 열 수 있습니다. 자세한 내용은 [noel 사용법](https://slidev-themes.hossam.kr/noel.html) · [mitten 사용법](https://slidev-themes.hossam.kr/mitten.html)에 있습니다.

![noel 표지](docs/img/noel-cover.jpg)
![mitten 장소 소개](docs/img/mitten-place.jpg)

## 쓰는 법

이 저장소를 받은 뒤, 슬라이드 md 파일의 프런트매터에 테마 폴더 경로를 적습니다. 경로는 md 파일이 있는 폴더 기준입니다.

```sh
git clone https://github.com/leekh4232/slidev-themes.git
```

```md
---
theme: ./slidev-themes/hossam   # lab · jussam · editorial · noel · mitten
sidebar: true        # 생략하면 켬. 처음엔 접힌 채 열리고 s 키로 펼침
exportDark: true     # 생략하면 켬. PDF·PNG 내보내기를 어두운 테마로
colorMode: dark      # 생략 가능. light | dark, 덱을 열 때의 테마(d 키로 바꿀 수 있음)
fontScale: 1        # 생략 가능. 0.6~2, 덱을 열 때의 본문 배율
manuscript: true     # 생략하면 켬(false 면 끔). 사이드바에 📄 원고 버튼(덱 원고 md를 깃헙 스타일 문서로 보기)
title: 과정 이름 · 단원 이름
author: 홍길동 강사    # 생략 가능. 표지 부제 아래 작성자
---
```

VS Code에서는 md 파일을 우클릭 → **Open with Slidev**로 열고, 터미널에서는 `npx slidev slides.md`로 엽니다. 테마 폴더를 고치면 다시 열 때 그대로 반영됩니다. 새 버전은 `git pull`로 받습니다.

## 예제 덱

- [docs/examples/lecture-example.md](docs/examples/lecture-example.md): hossam · 파이썬 기초 3강. 간지 · 카드형 · 웹진형 · 인포그래픽 레이아웃, 콜아웃 · 프롬프트(터미널 표) · 출력 · 번호 머리띠 · 타일 · 핵심 한 줄 · 칩 · 형광펜 · 빈칸 · 단계 목록 · 흐름도 · 타임라인 · 큰 숫자 타일과 사이드바.
- [docs/examples/lab-example.md](docs/examples/lab-example.md): lab · 파이썬 LAB 실습. 문제 상자 · 프롬프트 · 출력 · 타일 · 단계 목록. [lab-teal-example.md](docs/examples/lab-teal-example.md)는 `palette: teal` 판.
- [docs/examples/jussam-example.md](docs/examples/jussam-example.md): jussam · 분기 개발 생산성 리뷰(가상의 수치). 표지 · 파트 간지 · 발표 컴포넌트 전부와 기본 컴포넌트, 카드형 · 웹진형 레이아웃.
- [docs/examples/editorial-example.md](docs/examples/editorial-example.md): editorial · 분석 보고서 평가 가이드(가상의 조). 레이아웃 4종과 인포그래픽 컴포넌트 12종.
- [docs/examples/noel-example.md](docs/examples/noel-example.md): noel · 연말 가족 여행 계획(가상).
- [docs/examples/mitten-example.md](docs/examples/mitten-example.md): mitten · 겨울 실내 나들이 코스(가상). 장소 · 사진 레이아웃.

## 폴더 구조

```
hossam/     강의 테마. layouts/(cover · section · default · cards · magazine · infographic) · components/ · setup/ · styles/(lecture.css · shared.css) · deck.ts · global-top.vue · package.json
lab/        실습 테마. layouts/(cover · section · default · cards) · components/(Problem …) · styles/(lecture.css · shared.css: palette-teal)
jussam/     발표 테마. layouts/(cover · section · default · cards · magazine · infographic) · components/ · styles/(jussam.css · shared.css)
editorial/  보고서 발표 테마. layouts/(cover · section · default · blocks) · components/ · styles/
noel/       크리스마스 테마(jussam 바탕). styles/(noel.css · noel-skin.css)
mitten/     겨울 테마(jussam 바탕). layouts/ 에 place · photos 추가
docs/       소개 페이지 · 테마별 매뉴얼(<테마>.html) · 화면(img/) · 예제 덱(examples/)
tools/      capture.py: 예제 덱 빌드 결과에서 매뉴얼용 미리보기 그림을 찍는다
```

각 테마의 `package.json` `slidev.defaults`에 화면 비율 · 캔버스 폭 · 글꼴 기본값이 있습니다. 컴포넌트의 프롭은 각 `.vue` 파일 머리 주석과 매뉴얼에 있습니다.

## 라이선스

MIT
