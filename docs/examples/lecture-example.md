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
컴포넌트: Callout(kind: eli5·real·tip·warn·danger·ai·prompt·output·plain · title·icon·color·n·tag·copy·cols) · Prompt(4개 백틱 text 펜스) · Output(Callout의 짧은 이름) · Steps(type: list·flow·timeline · color: py·ai·ok·pastel · start·vertical · li class="ai") · Flow · Timeline(Steps의 짧은 이름, li.now · center) · Grid · Stat · Tile(kind: plain·surface·soft·fill · color·tag·title·value) · Core(color) · Chip(kind: soft·outline·dashed·fill · color)
클래스: .card(.py .ai .ok) · .kicker(.ai .lab) · .muted · .small · .tight · .flush · .compact · .labels · .comic(.panel) · 표지의 .sub · .fill-img · .hl(.ai .ok .warn .danger .ink, v-click) · .blank(data-ph, v-click)
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

## 상자와 번호 — 프롭으로 바꾸기

<Callout icon="📌" title="오늘의 약속" color="ok">코드는 내가 쓴다. AI에게는 방향 · 해석 · 오류 원인만 묻는다</Callout>

<Callout n="3" title="내 분류 채점받기" tag="초안 검토" color="ai"><b>언제?</b> 비슷한 것들이 헷갈릴 때. 내가 먼저 나눠 보고, 정답이 아니라 나누는 기준을 받는다</Callout>

<Grid cols="2" align="start">
<div>

<Steps start="4">
<li>앞 슬라이드의 3번에 이어 <b>4번부터</b></li>
<li>번호는 <code>start</code>로 잇는다</li>
</Steps>

</div>
<div>

<Steps type="flow" color="pastel" start="4">
<li><carbon:pen /><b>설계</b>입력 · 출력 정하기</li>
<li><carbon:code /><b>코드</b>한 줄씩 쓴다</li>
<li class="ok"><carbon:checkmark-outline /><b>확인</b>이 항목만 초록</li>
</Steps>

</div>
</Grid>

---

## 칸 간격과 여백 — gap · tight

<Callout kind="warn" title="이렇게는 안 쓴다">
<Grid cols="2" gap="6 32">
<div>문제를 통째로 주고 정답 코드 받기</div>
<div>내 코드를 AI가 직접 고치게 하기</div>
<div>보고서를 통째로 대신 쓰게 하기</div>
<div>검증하지 않고 그대로 믿기</div>
</Grid>
</Callout>

<Grid cols="2" align="start">
<div class="tight">

<span class="kicker">tight 칸</span>

- 블록 사이가 0.35rem
- 짧은 메모를 촘촘하게

<Callout kind="tip">콜아웃도 바짝 붙는다</Callout>

</div>
<div>

<span class="kicker">기본 칸</span>

- 블록 사이가 1.1rem
- 본문 읽기에 맞는 간격

<Callout kind="tip">콜아웃 위에 여백이 남는다</Callout>

</div>
</Grid>

---

## 타일 · 핵심 한 줄 · 칩 — Tile · Core · Chip

<p><Chip color="ai">자료형</Chip> int · float · str · bool · <Chip kind="fill">함수</Chip> type() · <Chip kind="outline" color="ink">필수</Chip> <Chip kind="dashed" color="muted">선택</Chip></p>

<Grid cols="3" gap="12">
<Tile tag="입력" title="값 하나" kind="soft">age = 20 처럼 = 로 넣는다</Tile>
<Tile tag="변환" title="이름표 붙이기" kind="fill" color="ai">변수 이름으로 값을 다시 꺼낸다</Tile>
<Tile tag="결과" value="4" color="ok">기본 자료형의 수</Tile>
</Grid>

변수 하나 = <span class="hl" v-click>이름</span> + <span class="hl ink" v-click>값</span> + <span class="hl ok" v-click>자료형</span>

<span class="blank" data-ph="○○" v-click>int</span> 는 정수를, <span class="blank ai" data-ph="△△" v-click>str</span> 은 글자를 담는다

<Core>값에 이름표를 붙이면, 이름만으로 값을 꺼내 쓴다</Core>

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
