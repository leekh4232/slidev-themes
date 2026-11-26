---
theme: ../../lab
title: LAB-02 · AI 활용 학습 활동
author: ITWILL · 홍길동 강사
layout: cover
footer: 파이썬 기초 과정
---

<!--
lab 테마 예제 덱. title 의 " · " 앞은 표지 머리말 알약과 사이드바 위 과정 이름, 뒤는 단원 이름이 된다.
슬라이드의 첫 제목이 왼쪽 목차에 올라간다. ### 제목 슬라이드는 한 단계, # 간지 뒤의 항목은 간지보다 한 단계 들여 쓴다.
레이아웃: cover(author · eyebrow · footer) · section(간지) · default(본문) · cards(cols)
컴포넌트: Callout(kind: eli5·real·tip·warn·danger·ai·prompt·output·plain · title·icon·color·n·tag·copy·cols) · Prompt · Output · Problem(tier·level·id·source·time) · Steps(type: list·flow·timeline) · Flow · Timeline · Grid · Tile · Core · Chip
헤더 옵션: sidebar · exportDark · colorMode · fontScale · manuscript · palette(teal)
클래스: .card(.ai .ok .danger .muted) · .kicker(.big .ai .ok .danger .muted) · .muted · .small · .tight · .flush · .compact · .labels · .io · .hl · .dense · .fill-img · 표지의 .sub
-->

# AI 활용 학습 활동

코딩 테스트 문제의 풀이 과정을 AI의 도움으로 찾아간다

총 예상 소요시간 80분 (3문제)

<p class="sub">[LAB-02] 변수・함수 / 파이썬 기초 과정</p>

---
layout: section
---

# 변수와 출력 다시 보기

문제를 풀기 전에 오늘 쓸 문법을 짚는다

---

## #01. 변수 — 값에 붙이는 이름표

- 변수는 값을 담는 **이름표**다. `=` 로 값을 넣는다
- 이름은 뜻이 드러나게 짓는다: `age`, `user_name`
  - 숫자로 시작할 수 없다
  - 파이썬 예약어(`if`, `for`)는 쓸 수 없다

```python
age = 20          # 정수
name = "하늘"     # 문자열
print(f"{name}님은 {age}살")
```

<Callout kind="eli5">
상자에 이름표를 붙여 두면, 나중에 상자를 열지 않아도 이름만으로 찾을 수 있다.
</Callout>

---

## #02. 상자 여섯 가지 — Callout kind

<Grid cols="2" gap="14 24">
<Callout kind="eli5" class="small">어려운 개념을 쉬운 말로 풀어 쓴다</Callout>
<Callout kind="real" class="small">실무에서 같은 문법을 어떻게 쓰는지 적는다</Callout>
<Callout kind="tip" class="small">막혔을 때 먼저 확인할 것을 적는다</Callout>
<Callout kind="warn" class="small">

`"3" + 4` 는 오류다. 글자와 숫자는 더할 수 없다

</Callout>
<Callout kind="danger" class="small">개인 정보, 비밀번호, 회사 코드</Callout>
<Callout kind="ai" class="small">설명은 AI에게 묻고, 코드는 내가 쓴다</Callout>
</Grid>

---

### #02-1. 상자 변형 — 번호 머리띠와 한 줄 상자

<Callout n="1" title="문제를 내 말로 다시 적기" tag="이해">
<b>언제?</b> 문제를 읽고 무엇을 return 해야 하는지 헷갈릴 때
</Callout>

<Callout n="2" title="입출력 예를 손으로 따라가기" tag="확인" color="ai">
<b>언제?</b> 식을 세웠는데 결과가 예와 맞는지 모를 때
</Callout>

<Callout icon="📌" title="오늘의 약속" color="ok">코드는 내가 쓴다. AI에게는 방향만 묻는다</Callout>

<Callout kind="plain" color="muted" icon="▶" title="다음 쪽에서 원인 묻기 프롬프트로 이어집니다" class="small" />

---
class: dense
---

## #03. 원인 묻기 — Prompt

<Prompt title="원인 묻기 템플릿" tag="틀린 결과">

````md
## 상황
solution 함수를 실행했더니 입출력 예와 결과가 달라.

| num1 | num2 | 기대한 결과 | 내 결과 |
+------+------+-------------+---------+
| 3    | 2    | 1500        | 1500.0  |
| 7    | 3    | 2333        | 2333.33 |
+------+------+-------------+---------+

## 질문
{내 코드}의 어느 줄 때문에 결과가 다른지 이유만 알려 줘. 고친 코드는 주지 마.
````

</Prompt>

<Callout kind="tip" class="small">

`+---+` · `| a | b |` 처럼 `+` 나 `|` 로 시작하고 끝나는 줄은 고정폭 글꼴로 그려 칸이 맞는다. `## 상황` 같은 섹션 이름 줄은 강조색으로 칠한다

</Callout>

---

## #04. 실행 결과 — Output

<Grid cols="2" align="start">
<div>

<span class="kicker">코드</span>

```python
def solution(num1, num2):
    return int(num1 / num2 * 1000)

print(solution(3, 2))
print(solution(7, 3))
```

</div>
<div>

<span class="kicker">실행 결과</span>

<Output>

```text
1500
2333
```

</Output>

<Output label="오류">

```text
TypeError: unsupported operand type(s) for /: 'str' and 'int'
```

</Output>

</div>
</Grid>

---
layout: section
---

# 코딩 테스트 문제 풀기

프로그래머스 문제를 AI와 함께 푼다

---

## #05. 맛보기 — 두 수의 나눗셈

<Problem tier="맛보기" level="0" id="120806" time="15">

정수 `num1`과 `num2`가 매개변수로 주어질 때, `num1`을 `num2`로 나눈 값에 1,000을 곱한 후 정수 부분을 return 하도록 solution 함수를 완성해주세요.

</Problem>

<Grid cols="2" align="start">
<div>

<span class="kicker">제한사항</span>

- 0 < `num1` ≤ 100
- 0 < `num2` ≤ 100

<span class="kicker">기본 코드</span>

```python
def solution(num1, num2):
    answer = 0
    return answer
```

</div>
<div>

<span class="kicker">입출력 예</span>

<div class="io">

| num1 | num2 | result |
|:--|:--|:--|
| 3 | 2 | 1500 |
| 7 | 3 | 2333 |
| 1 | 16 | 62 |

</div>

</div>
</Grid>

---

## #06. 필수와 도전

<Problem tier="필수" level="0" id="120830" time="15">

- 양꼬치는 1인분에 12,000원, 음료수는 2,000원이다. 10인분을 먹으면 음료수 하나를 서비스로 준다
- 양꼬치 `n`인분과 음료수 `k`개를 먹었을 때 낼 돈을 return 하도록 solution 함수를 완성해주세요

</Problem>

<Problem tier="도전" level="1" source="직접 만든 문제" time="25">

- 메뉴판(딕셔너리)과 주문 목록(리스트)이 주어질 때, 메뉴판에 없는 메뉴는 빼고 총액을 return 하세요
- 같은 메뉴를 여러 번 주문할 수 있다

</Problem>

<Callout kind="plain" color="muted" icon="▶" title="입출력 예는 다음 쪽에 이어집니다" class="small" />

---

### #06-1. 문제 2의 입출력 예

<span class="kicker big">입출력 예 · 양꼬치</span>

<div class="io">

| n | k | result | 설명 |
|:--|:--|:--|:--|
| 10 | 3 | 124000 | 10인분이라 음료수 하나가 서비스. 120,000 + 4,000 |
| 64 | 6 | 768000 | 64인분이라 음료수 여섯 개가 서비스. 768,000 + 0 |

</div>

<Callout kind="ai" title="AI에게 물을 것">
서비스 음료수 개수를 구하는 식만 물어본다. <code>n // 10</code> 이 왜 맞는지 설명을 들은 뒤 코드는 직접 쓴다.
</Callout>

---

## #07. 오늘 배운 문법 — Tile

<Grid cols="3" gap="16">
<Tile tag="입력" title="매개변수" kind="soft">함수가 받는 값. <code>num1</code>, <code>num2</code></Tile>
<Tile tag="계산" title="연산자" kind="fill" color="ai">나눗셈 <code>/</code>, 몫 <code>//</code>, 곱셈 <code>*</code></Tile>
<Tile tag="결과" value="3" color="ok">오늘 푼 문제의 수</Tile>
<Tile tag="형 변환" title="int()" kind="surface">소수점 아래를 버리고 정수로</Tile>
<Tile tag="출력" title="return" color="vi">함수 밖으로 값을 돌려준다</Tile>
<Tile tag="확인" value="80" color="pastel-2">총 예상 소요시간(분)</Tile>
</Grid>

---

## #08. 문제 고르기 — Chip과 Core

<p><Chip color="vi">맛보기</Chip> 처음 보는 문법을 한 번 써 보는 문제. 시간 안에 못 풀어도 된다</p>

<p><Chip>필수</Chip> 오늘 배운 문법만으로 풀 수 있다. 모두 풀고 넘어간다</p>

<p><Chip color="ai">도전</Chip> 다음 단원 문법이 조금 섞인다. 필수를 다 풀었을 때만</p>

상태 표시: <Chip kind="fill" color="ok">통과</Chip> <Chip kind="outline" color="warn">다시 풀기</Chip> <Chip kind="dashed" color="muted">건너뜀</Chip>

<Core>필수 문제를 모두 통과해야 다음 LAB으로 넘어간다</Core>

---

## #09. 풀이 순서 — Steps

<Grid cols="2" align="start">
<div>

<Steps>
<li><b>문제를 내 말로 다시 적는다</b><br/><span class="muted small">무엇을 받고 무엇을 return 하는지 한 줄로</span></li>
<li><b>입출력 예를 손으로 따라간다</b><br/><span class="muted small">식이 예와 같은 값을 내는지 확인</span></li>
<li><b>코드를 쓰고 실행한다</b><br/><span class="muted small">결과가 다르면 원인 묻기 프롬프트로</span></li>
</Steps>

</div>
<div>

<Steps color="pastel" start="4">
<li><b>제출한다</b><br/><span class="muted small">앞 칸의 3번에 이어 4번부터</span></li>
<li class="ai"><b>다른 풀이를 본다</b><br/><span class="muted small">이 항목만 주황</span></li>
</Steps>

</div>
</Grid>

---

## #10. 흐름도 — Flow

<Flow color="pastel">
<li>📖<b>읽기</b>문제와 제한사항</li>
<li>✍️<b>정리</b>입력 · 출력 한 줄</li>
<li>🧮<b>계산</b>입출력 예 손 계산</li>
<li>⌨️<b>코딩</b>기본 코드 채우기</li>
<li>✅<b>제출</b>채점 결과 확인</li>
</Flow>

<Flow color="ai">
<li><b>원인 묻기</b>틀린 결과를 AI에게</li>
<li><b>고치기</b>코드는 직접</li>
<li><b>다시 제출</b>통과할 때까지</li>
</Flow>

---

## #11. 오늘의 일정 — Timeline

<Timeline>
<li><b>0분</b>문법 다시 보기</li>
<li><b>15분</b>맛보기 문제</li>
<li class="now"><b>30분</b>필수 문제</li>
<li><b>55분</b>도전 문제</li>
<li><b>80분</b>정리</li>
</Timeline>

<Timeline color="ok" vertical>
<li><b>LAB-01</b>파이썬 설치와 첫 코드</li>
<li class="now"><b>LAB-02</b>변수 · 함수</li>
<li><b>LAB-03</b>프로그램 흐름제어</li>
</Timeline>

---
layout: cards
cols: 3
---

## #12. AI에게 물을 것과 묻지 않을 것

<div>

#### 🧭 방향 묻기

- 어떤 연산자를 쓰면 되는지
- 식을 세우는 순서

</div>
<div class="ai">

#### 🔍 원인 묻기

- 결과가 다른 까닭
- 오류 메시지의 뜻

</div>
<div class="danger">

#### ⛔ 묻지 않을 것

- 정답 코드 전체
- 제출할 코드 대신 쓰기

</div>

<Callout kind="real" class="small">현업에서도 AI가 준 코드는 내가 읽고 이해한 뒤에만 쓴다</Callout>

---

## #13. 연산자 정리 — 표

| 연산자 | 뜻 | 예 | 결과 |
|:--|:--|:--|:--|
| `/` | 나눗셈 | `7 / 2` | `3.5` |
| `//` | 몫 | `7 // 2` | `3` |
| `%` | 나머지 | `7 % 2` | `1` |
| `**` | 거듭제곱 | `2 ** 3` | `8` |
| `int()` | 정수로 바꾸기 | `int(3.9)` | `3` |

<Callout kind="warn" class="small">

`int()` 는 반올림이 아니라 소수점 아래를 버린다. `int(-3.9)` 는 `-3` 이다

</Callout>

---

## #14. 다음 LAB 미리 보기

<span class="kicker big">LAB-03 · 프로그램 흐름제어</span>

조건에 따라 다른 코드를 실행하고, 같은 코드를 여러 번 되풀이한다.

<Grid cols="2" align="start">
<div>

<span class="kicker ai">배울 문법</span>

- `if` · `elif` · `else`
- `for` · `while`

</div>
<div>

<span class="kicker ok">미리 할 것</span>

- 오늘 푼 문제를 다시 풀어 본다
- 막힌 곳을 한 줄로 적어 둔다

</div>
</Grid>

<Core color="vi">오늘 배운 변수와 함수 위에 흐름제어를 얹는다</Core>

---
layout: cover
hideInToc: true
---

# 수고하셨습니다

질문은 수업 게시판에 남긴다

<p class="sub">[LAB-02] 변수・함수 끝</p>
