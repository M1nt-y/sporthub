<template>
  <div class="create-video">
    <StateVieo/>
  </div>
   
</template>

<script setup lang="ts">
import StateVieo from '@/components/default/VideoEdit/SendVideo.vue'
</script>

<style lang="stylus">
.create-video
  max-width 920px
  margin 0 auto
  padding-top 23px

  @media(max-width: 1024px)
    max-width 100%
    padding 0 20px
    padding-top 23px
</style>