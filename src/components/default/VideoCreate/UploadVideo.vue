<template>
  <VideoHeader
    class="head-video"
    :disabled="true"
  />
  <UploadVideo/>
</template>


<script setup lang="ts">
import VideoHeader from '@/components/default/VideoCreate/VideoHeader.vue'
import UploadVideo from '@/components/UI/UploadVideo/UploadVideo.vue'
</script>

<style lang="stylus">
.head-video
  @media(max-width: 576px)
    display none
</style>