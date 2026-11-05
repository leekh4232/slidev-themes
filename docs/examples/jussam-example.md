---
theme: ../../jussam
title: 엔지니어링 리뷰 · 분기 개발 생산성
author: 플랫폼팀
layout: cover
eyebrow: engineering review · 2026 Q3
footer: 플랫폼팀 / 2026년 10월
---

<!--
jussam 테마 예제 덱 (가상의 수치). title 의 " · " 앞은 사이드바 위 머리말, 뒤는 단원 이름이 된다.
레이아웃: cover(eyebrow · footer · mesh · source · author) · section(part · eyebrow) · default(eyebrow · part · source) · cards(cols) · magazine(::right::) · infographic
발표 컴포넌트: Hero · Spacer · Agenda/NumList/Item · Timeline(events) · Gauge · Slope · Card(k · t · acc · sm · lg · dim) · Stat(n · fill · mark · scale · sm) · Kicker(lead · muted) · Funnel · Branch · BeforeAfter/Side · HBar · Bars · Meter · Mul · Formula · Note
기본 컴포넌트: Callout · Prompt · Output · Steps · Flow · Timeline(li) · Grid · Stat(value) · Tile · Core · Chip · YoutubeCard
헤더 옵션: sidebar · exportDark · colorMode · fontScale · manuscript
-->

# 분기 개발 생산성,<br>**숫자로 돌아보기**

배포 주기 · 리뷰 시간 · 장애 복구, 세 지표의 세 달

---
layout: cover
mesh: soft
eyebrow: hook
source: 사내 배포 로그 (2026년 7~9월)
---

<Hero n="42" unit="회" caption="7월 11회 → 9월 42회">

## 한 달 배포 횟수, 세 달 만에 네 배

배포 자동화를 켠 뒤 생긴 변화<br>이번 리뷰는 이 숫자가 어디서 왔는지 따라간다

</Hero>

<Spacer />

### 무엇이 바뀌었나

---
eyebrow: agenda
---

# 오늘의 순서

<Agenda>
<Item part="1" title="배포 파이프라인">자동화 전후, 배포 주기와 실패율</Item>
<Item part="2" title="코드 리뷰">리뷰 대기 시간과 리뷰어 분포</Item>
<Item part="3" title="장애 대응">복구 시간과 재발 방지</Item>
<Item part="4" title="다음 분기">우선순위 세 가지</Item>
</Agenda>

---
layout: section
part: 1
---

# 배포 파이프라인

자동화 전후를 같은 자로 재기

---
part: 1
eyebrow: timeline
source: 플랫폼팀 변경 이력
timeline:
  start: 2026-07-01
  end: 2026-10-01
  events:
    - date: 2026.07.14
      name: CI 캐시 도입
      org: platform
      desc: 빌드 시간 14분 → 6분
    - date: 2026.08.05
      name: 자동 배포 전환
      org: platform
      desc: 승인 버튼 하나로 스테이징 → 운영
    - date: 2026.09.22
      name: 카나리 배포
      org: platform · sre
      desc: 5% 트래픽으로 먼저 검증<br>문제 시 자동 롤백
      hl: true
---

# 세 달 동안 **바뀐 것 세 가지**

<Timeline v-bind="$frontmatter.timeline" />

<Kicker style="margin-top:8px">마지막 변화가 가장 컸다</Kicker>

---
part: 1
eyebrow: automation
source: CI 대시보드
---

# 자동화 이후 **배포는 일상**

<Grid cols="330px 1fr">
<Gauge :value="91" label="자동 배포 비율" note="수동 배포는 핫픽스뿐" />
<Slope k="deploy frequency" t="주당 배포 횟수" :from="['7월', 3]" :to="['9월', 11]" :max="12" unit="회" />
</Grid>

<Grid cols="3">
<Card sm>

빌드 시간 **6분**<br>캐시 도입 전 14분

</Card>
<Card sm>

배포 실패율 **2.1%**<br>롤백 자동화로 영향 최소화

</Card>
<Card sm>

핫픽스 리드타임 **40분**<br>전 분기 3시간

</Card>
</Grid>

---
part: 1
eyebrow: key numbers
source: 사내 배포 로그
---

# 지표 **세 개로 요약**

세 지표 모두 목표선을 넘었다

<Grid cols="3">
<Stat n="42" unit="회" label="9월 배포 횟수" :fill="84" :mark="50" scale="50회">눈금은 분기 목표 25회 지점</Stat>
<Stat n="2.1" unit="%" label="배포 실패율" :fill="21" scale="10%">목표 5% 이하</Stat>
<Stat n="40" unit="분" label="핫픽스 리드타임" :fill="33" scale="2시간">목표 1시간 이하</Stat>
</Grid>

<Kicker lead>실패율은 낮아졌지만, 실패 한 건당 영향 범위는 아직 측정하지 않았다</Kicker>

---
layout: section
part: 2
---

# 코드 리뷰

기다리는 시간을 줄이기

---
part: 2
eyebrow: review · four teams
source: 코드 호스팅 통계
---

# 네 팀, **다른 병목**

<Grid cols="2" gap="18">
<Card acc k="web" t="리뷰어 쏠림">리뷰의 70%가 두 사람에게 몰린다<br>리뷰어 순환 규칙 도입 검토</Card>
<Card acc k="mobile" t="큰 PR">PR 평균 900줄, 리뷰 대기 2.5일<br>기능 단위로 쪼개는 가이드 필요</Card>
<Card acc k="data" t="테스트 부재">리뷰어가 직접 돌려 봐야 해서 느리다<br>파이프라인 테스트 템플릿 제공</Card>
<Card acc k="platform" t="문제 없음">대기 4시간, PR 200줄 이하<br>다른 팀의 기준점으로 삼는다</Card>
</Grid>

<Kicker>팀마다 처방이 다르다</Kicker>

---
part: 2
eyebrow: so what
---

# 리뷰 규칙 **세 가지 제안**

<NumList>
<Item title="PR은 400줄 이하">넘으면 자동으로 분할 요청 코멘트</Item>
<Item title="리뷰어 자동 배정">최근 2주 리뷰 수가 적은 사람부터</Item>
<Item title="24시간 안에 첫 코멘트">넘기면 채널에 알림</Item>
</NumList>

<Kicker muted>규칙보다 먼저, 리뷰를 기다리는 시간이 보이게 만든다</Kicker>

---
layout: section
part: 3
---

# 장애 대응

복구 시간과 재발 방지

---
part: 3
eyebrow: incident funnel
source: 장애 관리 도구
---

# 알림에서 **복구까지**

<Grid cols="1fr 400px" gap="44" align="start">
<Funnel title="분기 장애 처리 단계 · 건수" :rows="[['알림 발생', '184', 100], ['사람이 확인', '61', 72], ['장애로 분류', '12', 46], ['포스트모템', '5', 30]]" note="폭은 단계별 건수 비율" />
<Grid cols="1" gap="16">
<Card sm k="mttr" t="평균 복구 48분">전 분기 1시간 50분<br>카나리 자동 롤백 효과</Card>
<Card sm k="repeat" t="재발 2건">같은 원인 장애 2건<br>포스트모템 액션 아이템 미완료</Card>
</Grid>
</Grid>

<Kicker style="margin-top:26px">알림의 3분의 2는 사람이 볼 필요가 없었다</Kicker>

---
part: 3
eyebrow: alert noise
source: 알림 설정 검토
---

# 알림 184건은 **세 갈래로**

알림 기준을 손보면 사람이 보는 알림을 절반 아래로 줄일 수 있다

<Branch src="알림 184건">
<Card k="01" t="자동 복구 가능">재시도 · 스케일 아웃으로 해결<br>사람 알림 없이 기록만</Card>
<Card k="02" t="정보성">임계치 근접 경고<br>일일 요약으로 묶는다</Card>
<Card k="03" t="즉시 대응">실제 장애 후보<br>온콜에게만 보낸다</Card>
</Branch>

---
part: 3
eyebrow: wrap-up
---

# 장애 대응의 **목적 전환**

<BeforeAfter>
<Side from k="before" v="빨리 끄기">복구 시간만 재고 끝<br>같은 장애가 다음 달에 또 난다</Side>
<Side to k="after" v="다시 안 나게">포스트모템 액션 아이템을 추적<br>재발 건수를 지표로 본다</Side>
</BeforeAfter>

<Kicker lead>복구 시간은 결과이고<br>재발 방지는 과정이다. 다음 분기 지표는 과정 쪽에 둔다</Kicker>

---
layout: section
part: 4
---

# 다음 분기

우선순위 세 가지

---
part: 4
eyebrow: capacity
source: 분기 계획 설문
---

# 시간은 **어디에 쓰였나**

<Grid cols="3" gap="16" style="margin-bottom:30px">
<Stat sm n="38" unit="%" label="기능 개발" />
<Stat sm n="27" unit="%" label="운영 · 장애" />
<Stat sm n="35" unit="%" label="리뷰 · 회의" />
</Grid>

<HBar title="운영 시간 중 비중 · 단위 %" :rows="[['알림 확인', 18.5, true], ['배포 작업', 6.2], ['장애 대응', 11.8]]" :max="25" />

<Kicker style="margin-top:36px">알림 확인이 배포 작업의 세 배</Kicker>

<Note>참고 · 설문 응답 31명, 주 단위 자기 보고 기준<br>회의 시간은 캘린더 집계와 10% 안팎 차이</Note>

---
part: 4
eyebrow: review wait · two teams
source: 코드 호스팅 통계 / mobile 팀 7월은 이관 중이라 집계 없음
bars:
  labels: ['7월', '8월', '9월']
  max: 60
  unit: 시간
  groups:
    - name: web
      legend: web 리뷰 대기
      values: [52, 31, 18]
      foot: 두 달 연속 감소
    - name: mobile
      legend: mobile 리뷰 대기
      values: [null, 58, 49]
      foot: 아직 이틀 이상
---

# 리뷰 대기, **갈리는 중**

<Bars v-bind="$frontmatter.bars" />

<Kicker lead style="margin-top:28px; font-size:18px">web 팀 규칙을 mobile 팀에 그대로 적용하는 것이 다음 분기 첫 과제</Kicker>

---
part: 4
eyebrow: test coverage
source: CI 리포트
---

# 먼저 바뀐 것은 **테스트**

<Grid cols="1.15fr .85fr" gap="52" align="start">
<Grid cols="1" gap="24" title="자동 테스트가 있는 저장소 비중 · 9월 기준">
<Meter label="서비스 저장소" value="64%" :fill="64" scale="전체 100%" foot="분기 초 41%" />
<Meter label="라이브러리 저장소" value="83%" :fill="83" scale="전체 100%" foot="분기 초 70%" />
</Grid>
<Card lg acc k="why it matters" t="리뷰가 빨라진 이유">

테스트가 있으면 리뷰어가 직접 돌려 보지 않아도 된다<br>리뷰 대기 시간 감소의 절반은 여기서 왔다

남은 36%는 레거시 서비스. 다음 분기에 우선 처리

</Card>
</Grid>

---
part: 4
eyebrow: priorities
---

# 세 축은 **덧셈이 아니라 곱셈**

<Mul>
<Card lg acc k="axis 01" t="자동화">배포 · 테스트 · 롤백<br>사람이 반복하는 일을 없앤다</Card>
<Card lg acc k="axis 02" t="가시성">대기 시간 · 재발 건수<br>보이지 않으면 고칠 수 없다</Card>
<Card lg acc k="axis 03" t="규칙">PR 크기 · 리뷰 배정 · 알림 기준<br>팀마다 다르게, 그러나 명시적으로</Card>
</Mul>

<Formula :tokens="['자동화', '×', '가시성', '×', '0', '=', '0']" note="하나라도 0이면 결과도 0" />

---
part: 4
eyebrow: faq · onboarding
---

# 새 팀원 온보딩, **문서보다 첫 PR**

<BeforeAfter>
<Side from k="흔한 방식" v="문서 100쪽">

- 아키텍처 문서를 먼저 다 읽게 한다
- 첫 PR까지 평균 3주
- 질문할 사람이 정해져 있지 않다

</Side>
<Side to k="바꾼 방식" v="첫날 첫 PR">

- 작은 이슈 하나를 첫날 배정
- 리뷰어가 곧 온보딩 담당
- 문서는 PR 과정에서 필요한 부분만

</Side>
</BeforeAfter>

<Kicker>읽은 문서 양이 아니라, 올린 PR 수가 온보딩의 지표</Kicker>

---
layout: section
eyebrow: appendix
---

# 기본 컴포넌트

콜아웃 · 프롬프트 · 단계 · 타일도 같은 바탕에서

---
eyebrow: callout · prompt · output
---

# 회고 질문을 **AI에게 맡기기**

<Grid cols="2fr 1fr">
<div>

<Prompt title="회고 질문 뽑기">

````md
## 목표
이번 분기 배포 지표로 회고 질문 5개를 만들어 줘

## 자료
배포 42회 · 실패율 {실패율} · 핫픽스 40분
````

</Prompt>

</div>
<div>

<Callout kind="tip">

숫자는 **원문 그대로** 붙여 넣는다

</Callout>

<Output>

```text
1. 실패한 2.1% 는 어떤 변경이었나?
```

</Output>

</div>
</Grid>

---
eyebrow: steps · tile · core
---

# 다음 분기 **진행 순서**

<Flow>
<li><b>측정</b>재발 건수 집계</li>
<li><b>규칙</b>PR 400줄 · 리뷰어 배정</li>
<li><b>점검</b>월말 지표 리뷰</li>
</Flow>

<Grid cols="3">
<Tile tag="goal" title="재발 장애" value="0건" />
<Tile tag="goal" title="첫 코멘트" value="24h" color="ai" />
<Tile tag="goal" title="사람이 본 알림" value="-50%" color="ok" kind="soft" />
</Grid>

<Core>측정 → 규칙 → 점검을 한 달 주기로 돈다</Core>

---
layout: cards
cols: 3
---

# 팀별 **다음 행동**

<div class="py">

#### web
리뷰어 순환 규칙을 mobile 팀에 공유한다

</div>
<div class="ai">

#### mobile
<span class="hl ai">PR 400줄</span> 규칙부터 적용한다

</div>
<div class="ok">

#### data
파이프라인 테스트 템플릿을 배포한다

</div>

---
layout: magazine
---

# 숫자보다 **질문**

지표는 다음 행동을 고르는 도구다

| 지표 | 9월 | 목표 |
|:--|--:|--:|
| 배포 횟수 | 42회 | 25회 |
| 실패율 | 2.1% | 5% |

```python
rate = failed / total * 100   # 실패율(%)
```

::right::

<Callout kind="real">

회고 회의는 **지표 하나당 질문 하나**로 시작한다

</Callout>

---
layout: cover
mesh: soft
eyebrow: closing
---

## 다음 분기에 볼 숫자 세 개

재발 장애 건수 · 리뷰 첫 코멘트까지 시간 · 사람이 본 알림 수

<Spacer />

### **지표는 결과를 재는 게 아니라,<br>다음 행동을 고르는 도구**

---
layout: cover
eyebrow: q & a
---

# **질문**

Q&A
