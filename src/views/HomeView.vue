<template>
<div class="home">
  <div class="home__categories">
    <div class="home__categories-item"></div>

    <div class="home__categories-item"></div>

    <div class="home__categories-item"></div>
  </div>

  <div class="home__title-wrapper">
    <div class="home__title">Video List</div>
  </div>

  <div class="home__videos">
    <div
        class="home__videos-item"
        v-for="item in array"
        :key="item.id"
    >
      <router-link :to="{ path: `/videos/${item.id}` }">
        <div class="home__videos-item-img">
          <div class="img">
            <img :src="item.preview.link" alt="">
          </div>
          <IconsPlay/>
          <p class="home__videos-duration">{{ item.duration }}</p>
        </div>

        <div class="home__videos-item-info">
          <h3>{{ item.title }}</h3>
          <p>{{ formatTimeDifference(calculateHoursAgo(item.uploaded)) }}</p>
        </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import IconsPlay from '@/assets/icons/video/Play.vue'
import type {ShortVideoType} from '@/types/types'
import {onMounted, ref} from "vue";


const array:ShortVideoType[] = ref([])

async function getVideos() {
  const querySnapshot = await getDocs(collection(db, "videos"))

  querySnapshot.forEach((doc) => {
    array.value.push(<ShortVideoType>doc.data())
  })
}

onMounted(async () => {
  await getVideos()
})

function calculateHoursAgo(timestamp: Date): number {
  const currentTime = new Date().getTime();
  const targetTime = new Date(timestamp).getTime();
  const timeDifference = currentTime - targetTime;
  return Math.floor(timeDifference / (1000 * 60 * 60));
}

function formatTimeDifference(hours: number): string {
  const absoluteHours = Math.abs(hours);

  const days = Math.floor(absoluteHours / 24);
  const remainingHours = absoluteHours % 24;

  if (days > 0) {
    return `${days} дней назад`;
  } else if (remainingHours > 0) {
    return `${remainingHours} час/ов назад`;
  } else {
    return 'Только что';
  }
}
</script>

<style scoped lang="stylus">
.home
  width 100%
  margin-left 260px
  padding-right 24px

  &__categories
    display flex
    padding 24px 0

    &-item
      margin-right 26px
      border-radius 8px
      background #AD7955
      aspect-ratio 1 / 0.652
      width calc(100% / 3 - 18px)

      &:nth-child(2) {
        background #8F5334
      }

      &:last-child
        margin-right 0
        background #653012

  &__title
    color #FFF
    font-size 24px
    font-weight 500

    &-wrapper
      height 44px
      display flex
      align-items center
      margin-bottom 16px

  &__videos
    display grid
    grid-gap 24px
    grid-template-columns repeat(3, 1fr)

    @media (max-width: 1100px)
      grid-template-columns repeat(3, 1fr)

    @media (max-width: 700px)
      grid-template-columns repeat(2, 1fr)

    @media (max-width: 500px)
      grid-template-columns repeat(1, 1fr)

    &-item
      cursor pointer
      transition all .25s

      @media (max-width: 500px)
        max-width 100%

      &:hover
        svg
          opacity 1

        & ^[-1]-info
          background #AD7955
          border-radius 0 0 8px 8px

      &-img
        width 100%
        position relative
        aspect-ratio 1.4

      & ^[0]-duration
        border-radius: 7px;
        background rgba(0, 0, 0, 0.40)
        backdrop-filter blur(2px)
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
          object-fit cover

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
          font-size 12px
          font-weight 400
</style>
