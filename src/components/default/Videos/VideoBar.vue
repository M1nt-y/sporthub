<template>
  <div class="video-bar">
    <div class="video-bar__left">
      <div class="video-bar__left-likes">
        <div class="like">
          <IconLikes/>
          <p>5.7K</p>
        </div>
        <div class="dislike">
          <IconLikes/>
          <p>469</p>
        </div>
      </div>
      <div class="video-bar__left-comment"></div>
    </div>
    <div class="video-bar__right">
      <div class="video-bar__right-date"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconLikes from '@/assets/icons/video/Like.vue'
</script>

<style lang="stylus">
.video-bar
  display flex
  justify-content space-between
  margin-top 22px
  
  &__left
    &-likes
      display flex
      align-items center
      gap 32px
      border-radius 8px
      background #222
      padding 8px 16px

      .like,
      .dislike
        display flex
        align-items center
        gap 8px
        cursor pointer
        
        p
          color: #FFF
          font-family Montserrat
          font-size 16px
          font-weight 500
</style>