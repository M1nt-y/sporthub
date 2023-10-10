<template>
  <div class="video-create">
      <UploadVideo/>
  </div>
</template>

<script setup lang="ts">
import UploadVideo from '@/components/default/VideoCreate/UploadVideo.vue'

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