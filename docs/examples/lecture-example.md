---
theme: ../../hossam
title: 파이썬 기초 · 3. 변수와 자료형
author: 홍길동 강사
layout: cover
---

<!--
hossam 테마 예제 덱. title 의 " · " 앞은 사이드바 위 과정 이름, 뒤는 단원 이름이 된다.
슬라이드의 첫 제목이 왼쪽 목차에 올라가고, ### 제목 슬라이드는 한 단계 들여쓴다.
레이아웃: cover(author) · section(간지) · default(본문) · cards(cols) · magazine(::right::) · infographic
컴포넌트: Callout(kind: eli5·real·tip·warn·danger·ai) · Prompt(4개 백틱 text 펜스) · Output · Steps(color: py·ai·ok) · Grid · Flow · Timeline(color, vertical, li.now) · Stat
클래스: .card(.py .ai .ok) · .kicker(.ai .lab) · .muted · .small · 표지의 .sub · .fill-img
-->

# 변수와 자료형

값에 이름을 붙여 두고 다시 쓰는 방법

<p class="sub">파이썬 기초 과정 · 3강</p>

---
layout: section
---

# #01. 변수

값에 이름을 붙이면 다시 꺼내 쓸 수 있다

---

## 변수란 — 값에 붙이는 이름표

- 변수는 값을 담는 **이름표**다. `=` 로 값을 넣는다
- 이름은 뜻이 드러나게 짓는다: `age`, `user_name`

```python
age = 20          # 정수
name = "하늘"     # 문자열
print(name, age)
```

<Callout kind="eli5">
상자에 이름표를 붙여 두면, 나중에 상자를 열지 않아도 이름만으로 찾을 수 있다.
</Callout>

---

## 자료형 네 가지

| 자료형 | 예 | 설명 |
|---|---|---|
| int | `3`, `-10` | 정수 |
| float | `3.14` | 소수 |
| str | `"안녕"` | 글자 |
| bool | `True`, `False` | 참 / 거짓 |

<Callout kind="tip">

`type(값)` 으로 자료형을 바로 확인할 수 있다.

</Callout>

<Callout kind="warn" title="자주 틀리는 것">

`"3" + 4` 는 오류다. 글자와 숫자는 더할 수 없다.

</Callout>

---
layout: cards
cols: 4
---

## 자료형 네 가지 한눈에

<div class="py">

#### 🔢 int

정수. `3`, `-10` 처럼 소수점이 없는 수. 개수·나이·순서를 담는다.

</div>
<div class="py">

#### 🧮 float

소수. `3.14`, `0.5`. 평균·비율처럼 소수점이 필요한 값.

</div>
<div class="ai">

#### 🔤 str

글자. `"안녕"`. 따옴표로 감싼다. 숫자처럼 보여도 글자다.

</div>
<div class="ok">

#### ✅ bool

참/거짓. `True`, `False`. 조건문의 판단 결과가 된다.

</div>

---

## 실습 — 자기소개 출력

<Grid cols="2">
<div>

<Steps>
<li>이름과 나이를 변수에 넣는다</li>
<li>f-문자열로 한 줄을 만든다</li>
<li><code>print()</code> 로 출력한다</li>
</Steps>

<div class="card ok">
<h3>확인</h3>
<p>출력 결과가 오른쪽과 같으면 성공</p>
</div>

</div>
<div>

```python
name = "하늘"
age = 20
print(f"{name}님은 {age}살")
```

<Output>
하늘님은 20살
</Output>

</div>
</Grid>

---
layout: magazine
---

## 좋은 변수 이름은 설명이 필요 없다

이름만 보고도 무엇이 들어 있는지 알 수 있어야 한다. 짧게 줄이지 말고, 뜻이 드러나는 단어를 고른다.

- 소문자와 밑줄로 잇는다: `user_name`, `total_price`
- 숫자로 시작할 수 없고, 예약어(`if`, `for`)는 쓸 수 없다
- 한 글자 이름(`a`, `x`)은 반복문 변수에만

::right::

<div class="card py">
<h3>좋은 예</h3>
<p><code>birth_year</code>, <code>is_member</code></p>
</div>

<div class="card ai">
<h3>나쁜 예</h3>
<p><code>a</code>, <code>data1</code>, <code>temp2</code></p>
</div>

<Callout kind="tip">
읽는 사람이 미래의 나라고 생각하고 짓는다.
</Callout>

---
layout: infographic
---

## 값이 변수가 되기까지

<Flow>
<li>⌨️<b>입력</b>키보드로 받은 글자</li>
<li>🔁<b>변환</b><code>int()</code> 로 숫자로</li>
<li>📦<b>저장</b>변수에 담는다</li>
<li>🖨️<b>출력</b><code>print()</code> 로 화면에</li>
</Flow>

<Grid cols="3">
<Stat value="4" label="기본 자료형" />
<Stat value="1" unit="줄" label="변수를 만드는 데 필요한 코드" color="ai" />
<Stat value="0" unit="원" label="이름표를 붙이는 비용" color="ok">바꿔 달 수도 있다</Stat>
</Grid>

---

## 파이썬이 걸어온 길

<Timeline>
<li><b>1991</b>귀도 반 로섬이 첫 버전을 공개</li>
<li><b>2000</b>파이썬 2.0, 리스트 컴프리헨션</li>
<li><b>2008</b>파이썬 3.0, <code>print()</code>가 함수로</li>
<li class="now"><b>오늘</b>3강 변수와 자료형</li>
</Timeline>

<Timeline color="ai" vertical>
<li><b>1교시</b>변수 만들기 · 이름 규칙</li>
<li class="now"><b>2교시</b>자료형과 <code>type()</code></li>
<li><b>3교시</b>형 변환 실습</li>
</Timeline>

---

## AI와 함께 — 오늘의 프롬프트

<Prompt>

````text
변수 이름을 지을 때 지켜야 할 규칙 3가지를
초등학생도 이해할 수 있게 예시와 함께 설명해 줘.
````

</Prompt>

<Callout kind="ai">
답을 그대로 믿지 말고, 규칙 하나를 골라 직접 코드로 확인해 본다.
</Callout>

<Callout kind="danger">
이름, 전화번호, 계정 같은 개인정보는 프롬프트에 넣지 않는다.
</Callout>

---

### 더 알아보기 — 형 변환

<span class="kicker lab">정리</span>

<div class="card py">
<h3>int("12") → 12</h3>
<p>문자열을 정수로 바꾼다. 숫자가 아닌 글자가 섞이면 오류가 난다.</p>
</div>

- `int()`, `float()`, `str()` 로 서로 바꿀 수 있다
- <span class="muted">다음 시간: 조건문</span>

---
layout: cover
hideInToc: true
---

# 감사합니다

질문과 토론 환영

<p class="sub">파이썬 기초 과정 · 3강 끝</p>
