---
theme: ../../lab
title: LAB-05 · AI 활용 학습 활동
author: ITWILL · 홍길동 강사
palette: teal
colorMode: light
layout: cover
---

<!--
lab 테마의 청록 · 남색 색 묶음 예제. 덱 헤더에 palette: teal 을 적으면 덱 전체의 색이 바뀐다.
밝은 테마(colorMode: light)에서 흰 바탕에 청록 · 남색, 어두운 테마(d 키)에서는 청록 강조색만 바뀐다.
-->

# AI 활용 학습 활동

내가 만든 모듈을 점검하고, 그 모듈로 데이터를 분석한다

총 예상 소요시간 135분 (모듈 점검 + 5문제)

<p class="sub">[LAB-05] PBT - 데이터 품질 점검 / 통계 분석 과정</p>

---

## #01. 중복 행 점검

<Problem tier="필수" source="직접 만든 문제" time="25">

- 같은 매물이 두 번 올라온 행이 있는지부터 확인한다
- 내가 만든 모듈로 중복 행의 수를 세고, 중복을 지운 뒤 데이터 크기를 다시 확인한다

</Problem>

<Grid cols="2" align="start">
<div>

<span class="kicker">요구사항</span>

<Steps color="pastel">
<li>데이터의 크기를 출력한다</li>
<li><code>my_qtcheck</code>의 중복 점검 함수로 중복을 지운다</li>
<li>df의 크기를 다시 출력한다</li>
</Steps>

</div>
<div>

```python
print(df.shape)
df = check_duplicates(df)
print(df.shape)
```

<Output>

```text
(412, 9)
(400, 9)
```

</Output>

</div>
</Grid>

---
class: dense
---

## #02. 코드 점검 템플릿

<Prompt title="코드 점검 템플릿" tag="모듈 점검">

````md
## 맥락
{배우는 단원} 단원에서 수업 모듈 {모듈 이름}의 함수를 직접 만들었어. 코드는 내가 고칠게.

## 상황
테스트 결과는 {같음 · 다른 값 · 에러 메시지 전체}이고, 내가 만든 코드는 아래와 같아.
```python
{내가 만든 함수 코드}
```

## 질문
내 코드가 기준 코드와 같은 일을 하는지 점검하고, 다른 곳이 있으면 어디가 어떻게 다른지 알려줘.

## 제약
- 주석 · 빈 줄 · 변수 이름만 다른 곳은 빼고, 결과가 달라지는 곳만
````

</Prompt>

<Callout kind="warn" title="「같음」이어도 점검을 건너뛰지 않는다" class="small">
테스트는 데이터 하나로만 확인한다. 다른 데이터에서 달라질 곳은 코드를 읽어야 찾을 수 있다.
</Callout>

---

## #03. 점검할 함수

<Grid cols="3" gap="16">
<Tile tag="변환" title="set_type" kind="soft">자료형 변환</Tile>
<Tile tag="중복" title="check_duplicates" kind="fill" color="vi">중복 검사와 제거</Tile>
<Tile tag="결측치" value="18%" color="ai">사고이력 열의 빈 값 비율</Tile>
</Grid>

<Core>모듈이 틀리면 문제의 실행 결과도 틀린다. 문제를 풀기 전에 점검한다</Core>

---
layout: cards
cols: 3
---

## #04. 결측치 처리 세 갈래

<div>

#### 🗑️ 행 지우기

- 빈 값이 아주 적을 때
- 잃는 행 수를 먼저 센다

</div>
<div class="ai">

#### 🏷️ 따로 표시

- 「모름」 같은 값으로 남긴다
- 빈 것 자체가 정보일 때

</div>
<div class="ok">

#### 🧮 채우기

- 중앙값 · 최빈값으로
- 분포가 바뀌는지 확인한다

</div>
