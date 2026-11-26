---
theme: ../../mitten
title: 겨울 나들이 · 눈 오는 토요일 실내 코스
author: 동네 산책 모임
layout: cover
colorMode: light
eyebrow: winter day trip · 2026
footer: 동네 산책 모임 / 2026년 12월
---

<!--
mitten 테마 예제 덱 (가상의 장소와 수치, 그림은 자리표시). title 의 " · " 앞은 사이드바 위 머리말, 뒤는 단원 이름이 된다.
레이아웃: cover(eyebrow · footer · mesh · source · author) · section(part · eyebrow) · default(eyebrow · part · source) · place(no · kind · region · late · image · caption · facts · navi · addr · tel) · photos(photos) · cards(cols) · magazine(::right::) · infographic
발표 컴포넌트: Hero · Spacer · Agenda/NumList/Item · Timeline(events) · Gauge · Slope · Card · Stat(n) · Kicker · Funnel · BeforeAfter/Side · HBar · Bars · Meter · Mul · Formula · Note · Roadmap
기본 컴포넌트: Callout · Prompt · Steps · Flow · Grid · Stat(value) · Tile · Core · Chip
헤더 옵션: sidebar · exportDark · colorMode · fontScale · manuscript · vivid
-->

# 눈 오는 토요일,<br>**실내에서 만 보**

온실 · 도서관 · 수족관을 하루에 잇는 따뜻한 산책

---
layout: cover
mesh: soft
eyebrow: today's goal
source: 지난겨울 모임 걸음 수 기록 (가상의 수치)
---

<Hero n="12,000" unit="보" caption="바깥 걷기는 합쳐서 15분 이하">

## 춥지 않게, 하루 만 이천 걸음

세 곳 모두 지하철역에서 5분 안쪽<br>실내 동선만으로 목표 걸음을 채운다

</Hero>

<Spacer />

### 오늘의 **세 곳**

---
eyebrow: agenda
---

# 오늘의 순서

<Agenda>
<Item part="1" title="솔빛 온실">열대 식물관 한 바퀴, 오전에 4천 보</Item>
<Item part="2" title="하늘책 도서관">층마다 걷는 책 산책과 창가 찻집</Item>
<Item part="3" title="눈송이 수족관">긴 수중 터널, 저녁까지 여는 곳</Item>
<Item part="4" title="돌아보기">걸음 수와 다음 코스</Item>
</Agenda>

---
layout: section
part: 1
---

# 솔빛 온실

유리 돔 아래에서 시작하는 아침

---
layout: place
no: 1
kind: 식물원
region: 가상시 솔빛동
image: ./img/mitten-greenhouse.jpg
caption: 유리 돔 온실 · 자리표시 그림
navi: 솔빛 온실 주차장
addr: 가상시 솔빛로 12
tel: 000-0000-0001
facts:
  - { k: "🚇 역에서", v: "도보 4분", s: "솔빛역 2번 출구 · 지하 통로로 연결" }
  - { k: "🅿️ 주차", v: "120대", s: "2시간 무료 · 10시 전 도착", tone: warn }
  - { k: "🕘 여는 시간", v: "09:00~18:00", s: "입장 마감 17:00 · 월요일 휴관" }
  - { k: "🎫 입장료", v: "2,000원", s: "65세 이상 무료", tone: ok }
---

# 솔빛 온실

바깥은 영하여도 안은 24도, 열대관부터 사막관까지 한 줄로 걸어요.

---
layout: photos
photos:
  - { src: ./img/mitten-greenhouse.jpg, cap: 유리 돔 외관 }
  - { src: ./img/mitten-leaves.jpg, cap: 열대 식물관 }
  - { src: ./img/mitten-cafe.jpg, cap: 온실 안 찻집 }
  - { src: ./img/mitten-yard.jpg, cap: 눈 덮인 앞마당 }
  - { src: ./img/mitten-gallery.jpg, cap: 식물 세밀화 전시 }
  - { src: ./img/mitten-library.jpg, cap: 씨앗 도서 코너 }
---

### 01-1 · 미리보기 사진

<p class="src">그림: 예제용 자리표시 그림 (실제 사진 아님)</p>

---
part: 1
eyebrow: key numbers
source: 지난겨울 모임 기록 (가상의 수치)
---

# 온실 한 바퀴, **숫자로 보기**

<Grid cols="3">
<Stat n="4,200" unit="보" label="온실 한 바퀴" :fill="35" :mark="33" scale="12,000보">눈금은 하루 목표의 3분의 1</Stat>
<Stat n="24" unit="℃" label="열대관 기온" :fill="80" scale="30℃">외투는 입구 보관함에</Stat>
<Stat n="70" unit="분" label="천천히 돌기" :fill="58" scale="2시간">사진 찍으며 걸을 때</Stat>
</Grid>

<Kicker lead>오전에 하루 목표의 3분의 1을 채우고 점심을 먹는다</Kicker>

---
layout: section
part: 2
---

# 하늘책 도서관

책장 사이를 걷는 오후

---
layout: place
no: 2
kind: 도서관
region: 가상시 하늘동
late: 토요일은 21시까지
image: ./img/mitten-library.jpg
caption: 4층 열람실 책장 · 자리표시 그림
navi: 하늘책 도서관
addr: 가상시 하늘로 34
facts:
  - { k: "🚇 온실에서", v: "지하철 2정거장", s: "약 15분 · 환승 없음", tone: py }
  - { k: "🕘 여는 시간", v: "09:00~21:00", s: "일요일은 18시까지" }
  - { k: "☕ 찻집", v: "1층 창가", s: "따뜻한 유자차 4,500원", tone: ai }
---

# 하늘책 도서관

계단으로 1층부터 5층까지, 층마다 책장 한 줄씩 걸어요.

---
layout: photos
photos:
  - { src: ./img/mitten-library.jpg, cap: 4층 열람실 }
  - { src: ./img/mitten-cafe.jpg, cap: 1층 창가 찻집 }
  - { src: ./img/mitten-gallery.jpg, cap: 그림책 원화 전시 }
  - { src: ./img/mitten-yard.jpg, cap: 옥상 정원의 눈사람 }
  - { src: ./img/mitten-leaves.jpg, cap: 실내 정원 }
---

### 02-1 · 사진 다섯 장이면 첫 장이 크게

<p class="src">그림: 예제용 자리표시 그림 (실제 사진 아님)</p>

---
part: 2
eyebrow: compare
---

# 세 곳, **다른 매력**

<Grid cols="2" gap="18">
<Card acc k="온실" t="아침에 가요">가장 따뜻하고 붐비지 않는다<br>10시 전이면 주차도 여유</Card>
<Card acc k="도서관" t="오후에 쉬어 가요">찻집에서 30분 쉬고 다시 걷는다<br>토요일은 21시까지</Card>
<Card acc k="수족관" t="저녁에 마무리">터널 한 바퀴가 1,500보<br>19시 이후 입장권 할인</Card>
<Card dim k="피할 곳" t="야외 공원">오늘은 영하 8도, 빙판길<br>다음 주말로 미룬다</Card>
</Grid>

---
part: 2
eyebrow: before · after
---

# 겨울 주말, **걷는 법 바꾸기**

<BeforeAfter>
<Side from k="평소 주말" v="집에서 쉬기">

- 하루 걸음 3천 보 아래
- 추워서 나가기 싫다

</Side>
<Side to k="실내 만보" v="세 곳 잇기">

- 하루 1만 2천 보
- 바깥 걷기는 15분 이하

</Side>
</BeforeAfter>

<Kicker>추위가 아니라 동선이 문제였다</Kicker>

---
layout: section
part: 3
---

# 눈송이 수족관

물속 터널에서 하루를 마무리

---
part: 3
eyebrow: steps by place
source: 모임 다섯 명의 걸음 수 앱 평균 (가상의 수치)
---

# 어디서 **얼마나 걸었나**

<Grid cols="3" gap="16" style="margin-bottom:30px">
<Stat sm n="4,200" unit="보" label="솔빛 온실" />
<Stat sm n="3,600" unit="보" label="하늘책 도서관" />
<Stat sm n="3,100" unit="보" label="눈송이 수족관" />
</Grid>

<HBar title="장소 사이 이동 포함 · 단위 천 보" :rows="[['온실', 4.2, true], ['도서관', 3.6], ['수족관', 3.1], ['이동', 1.3]]" :max="5" />

<Note>참고 · 이동은 역 안 통로와 환승 걸음</Note>

---
part: 3
eyebrow: this winter
timeline:
  start: 2026-12-01
  end: 2027-03-01
  events:
    - date: 2026.12.12
      name: 온실 · 도서관 · 수족관
      org: 첫 번째 코스
      desc: 오늘 소개한 코스
      hl: true
    - date: 2027.01.09
      name: 미술관 두 곳
      org: 두 번째 코스
      desc: 전시실 층을 오르내리며
    - date: 2027.02.06
      name: 실내 시장 산책
      org: 세 번째 코스
      desc: 점심은 시장 안에서<br>오후는 지하상가
---

# 이번 겨울 **나들이 일정**

<Timeline v-bind="$frontmatter.timeline" />

---
part: 4
eyebrow: day flow
roadmap:
  stages: ['출발', '온실', '도서관', '수족관', '귀가']
  bands:
    - { label: 오전, from: 0, to: 2, row: 1 }
    - { label: 오후 · 저녁, from: 2, to: 5, row: 1 }
  rows:
    - { label: 지하철 이동, from: 0, to: 1 }
    - { label: 열대관 · 사막관, from: 1, to: 2 }
    - { label: 찻집에서 쉬기, from: 2, to: 3 }
    - { label: 수중 터널, from: 3, to: 4 }
---

# 하루의 **흐름**

<Roadmap v-bind="$frontmatter.roadmap" />

---
eyebrow: steps · tile · core
---

# 출발 전 **준비 순서**

<Flow>
<li><b>날씨</b>아침 기온과 눈 예보</li>
<li><b>옷차림</b>벗기 쉬운 겉옷 한 벌</li>
<li><b>앱</b>걸음 수 앱 0으로 맞추기</li>
</Flow>

<Grid cols="3">
<Tile tag="goal" title="하루 걸음" value="12,000" />
<Tile tag="limit" title="바깥 걷기" value="15분" color="ai" />
<Tile tag="budget" title="한 사람" value="2만 원" color="ok" kind="soft" />
</Grid>

<Core>따뜻한 곳에서 걷고, 이동은 지하로</Core>

---
eyebrow: callout · prompt
---

# 다음 코스를 **AI에게 묻기**

<Grid cols="2fr 1fr">
<div>

<Prompt title="코스 찾기">

````md
## 조건
{동네 이름}에서 지하철로 30분 안쪽, 실내 장소 세 곳
## 목표
하루 1만 보, 바깥 걷기 15분 이하
````

</Prompt>

</div>
<div>

<Callout kind="tip">

여는 시간과 휴관일은 **공식 누리집**에서 다시 확인한다

</Callout>

<Callout kind="warn" title="빙판길">

역 출구 계단은 미끄럽다

</Callout>

</div>
</Grid>

---
layout: cards
cols: 3
---

# 가방에 **넣을 것**

<div class="py">

#### 🧤 장갑과 목도리
역 사이를 걸을 때만 꺼낸다

- 실내에서는 가방에 넣는다
- 목도리는 얇은 것 하나

</div>
<div class="ai">

#### 🧴 작은 보온병
도서관 찻집이 붐빌 때를 대비

- 따뜻한 보리차 300mL
- 수족관 안에서는 마시지 않는다

</div>
<div class="ok">

#### 🔋 보조 배터리
추우면 휴대폰이 빨리 꺼진다

- 걸음 수 앱이 하루 종일 켜져 있다
- 사진도 많이 찍는다

</div>

---
layout: magazine
---

# 걸음보다 **쉬는 자리**

오래 걸으려면 앉을 곳을 먼저 정한다

| 장소 | 쉬는 곳 | 좌석 |
|:--|:--|--:|
| 온실 | 사막관 벤치 | 20석 |
| 도서관 | 1층 찻집 | 40석 |
| 수족관 | 터널 끝 쉼터 | 30석 |

::right::

<Callout kind="real">

한 곳에서 **한 번은 앉아** 쉰다<br>그래야 마지막 장소까지 걷는다

</Callout>

---
layout: infographic
---

# 지난겨울보다 **더 걸었다**

<Grid cols="330px 1fr">
<Gauge :value="86" label="목표 걸음 달성률" note="다섯 명 중 네 명이 1만 보 넘음" />
<Slope k="weekend steps" t="주말 하루 평균 걸음" :from="['작년', 4]" :to="['올해', 11]" :max="12" unit="천 보" />
</Grid>

---
layout: cover
mesh: soft
eyebrow: closing
---

## 다음 주말에도 따뜻하게

미술관 두 곳 · 실내 시장 산책 · 지하상가 한 바퀴

<Spacer />

### **추운 날엔 바깥 말고<br>안에서 만 보**
