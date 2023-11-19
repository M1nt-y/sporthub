<template>
<div class="video-player" v-if="video.length > 1">
  <video controls width="920" height="518">
      <source :src="video" type="video/mp4">
    </video>
</div>
</template>

<script setup lang="ts">
defineProps({
  video: {
    type: String,
    default: '',
  },
})
</script>


<style lang="stylus" scoped>
.video-player
  position relative
  padding-bottom 57%
  border-radius 16px
  margin-top 10px
  
  video
    position absolute
    width 100%
    height 100%
    left 0
    border-radius 16px
    top 0
</style>