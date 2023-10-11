<template>
  <div class="video-create">
    <VideoHeader
      class="head-video"
      :disabled="true"
    />
    <UploadVideo/>
  </div>
</template>


<script setup lang="ts">
import VideoHeader from '@/components/default/VideoCreate/VideoHeader.vue'
import UploadVideo from '@/components/UI/UploadVideo/UploadVideo.vue'
</script>

<style lang="stylus">
.head-video
  @media(max-width: 576px)
    display none

.video-create
  @media(max-width: 576px)
    display flex
    margin-top auto
    justify-content center
    align-items center
    min-height 100vh
</style>