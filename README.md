# Slidev Themes · hossam

[![Slidev theme](https://img.shields.io/badge/Slidev-theme-2b90b6)](https://sli.dev)
![theme hossam](https://img.shields.io/badge/theme-hossam-ff3d9a)
[![Last commit](https://img.shields.io/github/last-commit/leekh4232/slidev-themes?color=7c5cff)](https://github.com/leekh4232/slidev-themes/commits/main)
[![Open with Slidev](https://img.shields.io/badge/Open%20with%20Slidev-VS%20Code-007ACC)](https://marketplace.visualstudio.com/items?itemName=leekh.open-with-slidev)
[![License MIT](https://img.shields.io/badge/license-MIT-2ea44f)](LICENSE)

🌐 **소개 페이지 · [slidev-themes.hossam.kr](https://slidev-themes.hossam.kr/)**

[Slidev](https://sli.dev) 테마 `hossam`을 담은 저장소입니다. 저장소를 받아 테마 폴더를 경로로 지정해 씁니다. VS Code에서는 [Open with Slidev](https://marketplace.visualstudio.com/items?itemName=leekh.open-with-slidev)로 바로 열 수 있습니다.

`hossam`은 코딩 강의용 테마입니다. 처음 열면 어두운 바탕이고 d 키(🌙/☀️ 버튼)로 밝게 바꿉니다. 목차 사이드바(폭 조절 · 접기 · 확대/축소 · 다크), 표지 · 간지 · 카드형 · 웹진형 · 인포그래픽 레이아웃, 상자(Callout: 콜아웃 · 프롬프트 · 출력 · 번호 머리띠를 `kind`와 프롭으로 조정) · 번호 목록(Steps: 단계 · 흐름도 · 타임라인을 `type`으로 조정) · 격자 · 큰 숫자 · 유튜브 썸네일 컴포넌트가 있고, 모든 슬라이드 오른쪽 아래에 쪽 번호(현재/전체)가 붙고, 덱 헤더(첫 슬라이드 프런트매터)의 `sidebar`로 사이드바를 켜고 끕니다. 슬라이드는 항상 16:9 비율로 창에 맞춰 확대·축소되고, 넘치는 내용은 스크롤 없이 잘리며 빨간 테두리로 표시됩니다. 자세한 내용은 [hossam 사용법](https://slidev-themes.hossam.kr/hossam.html)에 있습니다.

![hossam 표지와 목차 사이드바](docs/img/lecture-cover.jpg)

## 쓰는 법

이 저장소를 받은 뒤, 슬라이드 md 파일의 프런트매터에 테마 폴더 경로를 적습니다. 경로는 md 파일이 있는 폴더 기준입니다.

```sh
git clone https://github.com/leekh4232/slidev-themes.git
```

```md
---
theme: ./slidev-themes/hossam
sidebar: true        # 생략하면 켬
exportDark: true     # 생략하면 켬. PDF·PNG 내보내기를 어두운 테마로
colorMode: dark      # 생략 가능. light | dark, 덱을 열 때의 테마(d 키로 바꿀 수 있음)
fontScale: 1        # 생략 가능. 0.6~2, 덱을 열 때의 본문 배율
title: 과정 이름 · 단원 이름
author: 홍길동 강사    # 생략 가능. 표지 부제 아래 작성자
---
```

VS Code에서는 md 파일을 우클릭 → **Open with Slidev**로 열고, 터미널에서는 `npx slidev slides.md`로 엽니다. 테마 폴더를 고치면 다시 열 때 그대로 반영됩니다. 새 버전은 `git pull`로 받습니다.

## 예제 덱

- [docs/examples/lecture-example.md](docs/examples/lecture-example.md): 파이썬 기초 3강. 간지 · 카드형 · 웹진형 · 인포그래픽 레이아웃, 콜아웃 · 프롬프트 · 출력 · 번호 머리띠 · 단계 목록 · 흐름도 · 타임라인 · 큰 숫자 타일과 사이드바.

## 폴더 구조

```
hossam/   layouts/(cover · section · default · cards · magazine · infographic) · components/ · setup/ · styles/(lecture.css · shared.css) · deck.ts · global-top.vue · package.json
docs/     소개 페이지 · 매뉴얼(hossam.html) · 화면(img/) · 예제 덱(examples/)
```

`hossam/package.json`의 `slidev.defaults`에 화면 비율 · 캔버스 폭 · 글꼴 기본값이 있습니다. 컴포넌트의 프롭은 각 `.vue` 파일 머리 주석과 매뉴얼에 있습니다.

## 라이선스

MIT
