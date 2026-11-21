<script setup lang="ts">
// 장소 개요(엽서 + 승차권). 왼쪽은 번호 · 종류 딱지 · 제목 · 한 줄 소개와 점선으로 나뉜 승차권 모양 정보 띠, 오른쪽은 테이프로 붙인 기울어진 사진 한 장.
//   no: 번호(01),  kind: 종류(역사 박물관),  region: 지역,  late: true 면 "늦은 오후 OK" 딱지
//   image · caption: 오른쪽 사진과 그 아래 손글씨풍 설명
//   facts: 승차권 칸 [{ k: 라벨, v: 큰 값, s: 작은 설명, tone: ok | warn | danger | py | ai }] (3~4칸)
//   navi · addr · tel: 아래 한 줄(내비 검색어 · 주소 · 전화)
import { useDeckOptions } from '../deck'
defineProps<{
  no?: string | number; kind?: string; region?: string; late?: boolean | string
  image?: string; caption?: string
  facts?: { k: string; v: string; s?: string; tone?: string }[]
  navi?: string; addr?: string; tel?: string
}>()
useDeckOptions()
</script>

<template>
  <div class="slidev-layout place">
    <div class="pl-main">
      <div class="pl-top">
        <span v-if="no" class="pl-no">{{ String(no).padStart(2, '0') }}</span>
        <span v-if="kind" class="pl-tag">{{ kind }}</span>
        <span v-if="region" class="pl-tag soft">{{ region }}</span>
        <span v-if="late" class="pl-tag late">🌙 {{ late === true ? '늦은 오후에도 좋아요' : late }}</span>
      </div>
      <div class="pl-head"><slot /></div>
      <div v-if="facts?.length" class="pl-ticket" :style="{ '--n': facts.length }">
        <div v-for="f in facts" :key="f.k" class="pl-cell" :class="f.tone">
          <div class="k">{{ f.k }}</div>
          <div class="v">{{ f.v }}</div>
          <div v-if="f.s" class="s">{{ f.s }}</div>
        </div>
      </div>
      <div v-if="navi || addr || tel" class="pl-foot">
        <span v-if="navi"><b>내비</b>{{ navi }}</span>
        <span v-if="addr"><b>주소</b>{{ addr }}</span>
        <span v-if="tel"><b>☎</b>{{ tel }}</span>
      </div>
    </div>
    <figure v-if="image" class="pl-photo">
      <i class="tape" aria-hidden="true" />
      <img :src="image" :alt="caption ?? ''" />
      <figcaption v-if="caption">{{ caption }}</figcaption>
    </figure>
  </div>
</template>
