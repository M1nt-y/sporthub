<template>
<div class="all-list">
  <div class="all-list__content">
    <div class="item"
    v-for="item in array"
    >
      <div class="item__title">
        <h4><router-link :to="{ path: `/playlist-edit/${item.id}` }">{{ item.name }}</router-link></h4>
      </div>

      <div class="item__video">
        <div class="video" v-for="video in item.videos">
          <div class="video__img">
            <div class="img">
              <img :src="video.photo" alt="">
            </div>
            <div class="duration">
              <p>{{ video.duration }}</p>
            </div>
          </div>
          <div class="video__info">
            <h5>{{ video.title }}</h5>
            <p>{{ formatTimeDifference(calculateHoursAgo(video.uploaded)) }}</p>
          </div>
        </div>

        <div class="item__video-text" v-if="item.videos.length < 1">
          <p>Простите пожалуйста, но вы сюда пока что не добавили не одного видеоролика, кликните по заголовку чтоб добавить видео</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type {PlaylistType} from '@/types/types'


defineProps({
  array: {
    type: Array as PropType<PlaylistType[]>,
    default: [],
  },
})

function calculateHoursAgo(timestamp: Date): number {
  const currentTime = new Date().getTime();
  const targetTime = new Date(timestamp).getTime();
  const timeDifference = currentTime - targetTime;
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  return hoursAgo;
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


<style lang="stylus">
.all-list
  margin-top 100px

  &__content
    .item
      margin-bottom 30px

      &__title
        cursor pointer
        h4
          color #FFF
          font-family Uto
          font-size 20px
          font-weight 600
      
      &__video
        display grid
        grid-template-columns repeat(3,1fr)
        grid-gap 20px
        margin-top 24px

        @media(max-width: 1020px)
          display flex
          flex-direction column

        &-text
          grid-column span 3

          p
            color #FFF
            min-height 180px
            text-align center
            display flex
            align-items center
            justify-content center
            flex-direction column


        .video
          cursor pointer
         
          &:nth-child(n+4)
            display: none
  
          &__img
            position relative
            aspect-ratio 1.4

            .duration
              position absolute
              right  10px
              bottom 10px
              border-radius: 7.212px;
              background rgba(0, 0, 0, 0.40)
              backdrop-filter blur(1.803108811378479px)
              padding 8px

              p
                color #FFF
                font-family Uto
                font-size 10px;
                font-style normal

            .img
              position absolute
              left 0
              top 0
              width 100%
              height 100%

              img
                width 100%
                height 100%
          
          &__info
            padding 8px
            background #222
            border-radius 0 0 8px 8px
            h5
              color #FFF
              font-family Uto
              font-size 14px
              font-weight 500
              line-height 16px
            p
              margin-top 8px
              color #999
              font-family Arial
              font-size 12px;
              font-weight 400

</style>