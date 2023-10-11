<template>
  <div class="video-create">
      <UploadVideo v-if="!ONE_STEP"/>
      <StateVieo v-else/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {stateVideo} from '@/stores/video-create'
import UploadVideo from '@/components/default/VideoCreate/UploadVideo.vue'
import StateVieo from '@/components/default/VideoCreate/SendVideo.vue'

const videoState = stateVideo();

const ONE_STEP = ref(true);

watch(
  () => videoState.stateVideo,
  (newStateVideo) => {
    if (newStateVideo !== null) {
      ONE_STEP.value = false; 
    }
  }
);
</script>

<style lang="stylus">
.video-create
  max-width 920px
  margin 0 auto
  padding-top 23px

  @media(max-width: 1024px)
    max-width 100%
    padding 0 20px
    padding-top 23px

  @media(max-width: 576px)
    display flex
    margin-top auto
    justify-content center
    align-items center
    min-height 100vh
</style>