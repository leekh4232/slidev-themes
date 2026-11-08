<script setup lang="ts">
// 그림 한 장. 슬롯에 <img src="./img/…" alt="…"> 를 넣는다(빌드 때 그림이 함께 묶이도록 경로는 img 태그에 둔다).
// caption: 그림 아래 한 줄. paper: 흰 받침(투명 배경에 어두운 글자가 있는 그림을 검정 바탕에서도 읽히게). 받침은 그림 크기에 딱 맞는다.
// h: 그림 칸 높이(px). 주지 않으면 슬라이드 직계 블록일 때 남은 세로 공간을 모두 채운다. Grid 칸 안에서는 h 를 준다.
// 그림은 비율 그대로 칸 안에서 가장 크게, 가운데에 놓인다.
defineProps<{ caption?: string; paper?: boolean; h?: number | string }>()
</script>

<template>
  <figure class="fig" :class="{ 'fig-fill': !h, paper }">
    <div class="fig-box" :style="h ? { height: `${h}px`, flex: 'none' } : undefined">
      <div class="fig-in"><slot /></div>
    </div>
    <figcaption v-if="caption" class="fig-cap">{{ caption }}</figcaption>
  </figure>
</template>
