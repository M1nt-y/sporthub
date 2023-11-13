<template>
 <div class="all-video">
  <div class="all-video__item"
    v-for="item in array"
  >
  <router-link :to="{ path: `/creator-video/${item.videoId}` }">
    <div class="all-video__item-img">
      <div class="img">
        <img :src="item.photo" alt="">
      </div>
      <IconsPlay/>
      <p class="all-video__duration">{{ item.duration }}</p>
    </div>

    <div class="all-video__item-info">
      <h3>{{ item.title }}</h3>
      <p>{{ formatHoursDifference(calculateHoursAgo(item.uploaded)) }}</p>
    </div>
  </router-link>
  </div>
 </div>
</template>

<script setup lang="ts">
import IconsPlay from '@/assets/icons/video/Play.vue'
import type { PropType } from 'vue'
import type {ShortVideoType} from '@/types/types'


defineProps({
  array: {
    type: Array as PropType<ShortVideoType[]>,
    default: [],
  },
})

function calculateHoursAgo(timestamp: any) {
  const currentTime = new Date().getTime();
  const targetTime = new Date(timestamp).getTime();
  const timeDifference = currentTime - targetTime; 
  const hoursAgo = timeDifference / (1000 * 60 * 60); 
  return hoursAgo;
}

function formatHoursDifference(hours: any) {
  const absoluteHours = Math.abs(hours);
  const displayHours = Math.floor(absoluteHours);
  return `${displayHours} час/ов`;
}

</script>

<style lang="stylus">
.all-video
  display grid
  grid-template-columns repeat(4, 1fr)
  grid-gap 24px
  margin-top 90px
  margin-bottom 40px

  @media(max-width: 1100px)
    grid-template-columns repeat(3, 1fr)

  @media(max-width: 700px)
    grid-template-columns repeat(2, 1fr)
  
  @media(max-width: 500px)
    grid-template-columns repeat(1, 1fr)

  &__item
    max-width 331px
    cursor pointer
    transition all .25s

    @media(max-width: 500px)
      max-width 100%

    &:hover
      svg
        opacity 1
      
      & ^[-1]-info
        background #AD7955
        border-radius 0 0 8px 8px

    &-img
      position relative
      aspect-ratio 1.4
    
    & ^[0]__duration
      font-family Times
      border-radius: 7.212px;
      background rgba(0, 0, 0, 0.40)
      backdrop-filter blur(1.803108811378479px)
      position absolute
      right 8px
      bottom 8px
      color white
      z-index 1
      padding 4px 8px
    
    svg
      position absolute
      transition all .25s
      z-index 1
      width 50px
      height 30px
      top 50%
      left 50%
      margin-left -22px
      margin-top -25px
      opacity 0
      pointer-events none


    .img
      position absolute
      left 0
      top 0
      width 100%
      height 100%

      img
        width 100%
        height 100%

    &-info
      padding 7px
      transition all .25s

      h3
        color #FFF
        font-size 14px;
        font-weight: 500
        line-height 16px
      
      p
        color #999
        font-family Times
        font-size 12px
        font-weight 400


</style>