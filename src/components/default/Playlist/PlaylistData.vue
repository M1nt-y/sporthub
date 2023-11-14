<template>
  <div class="playlist-data">
    <div class="playlist-data__inputs">
      <div class="input">
          <p>Playlist name</p>

          <TheInput
            v-model="data.name"
            :placeholder="'Enter playlist name'"
            :padding="16"
          />
      </div>

      <div class="input">
          <p>Description</p>

          <TheInput
            v-model="data.description"
            :placeholder="'Description'"
            :padding="16"
          />
      </div>

      <div class="input">
          <p>Category</p>

          <TheInput
            v-model="data.category"
            :placeholder="'Category'"
            :padding="16"
          />
      </div>
    </div>
    <div class="playlist-data__videos">
      <TheInput
        :search="true"
        :searchLeft="true"
        :padding="10"
        :placeholder="'Search'"
        v-model="data.search"
      />

      <div class="playlist-data__videos-item">
        <div class="video"
          v-for="(item, idx) in video"
          @click="emitsPressed(item.videoId, item)"
          :class="{ 'video_active': activeVideo.includes(item.videoId) }"
        >
        <IconChecked class="video__checked"/>
        <div class="video__photo">
          <div class="video__photo-img">
            <img :src="item.photo" alt="">
          </div>

          <div class="video__duration">
            <p>{{ item.duration }}</p>
          </div>
        </div>

        <div class="video__info">
          <h3>{{ item.title }}</h3>
          <p>{{formatHoursDifference(calculateHoursAgo(item.uploaded)) }}</p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ShortVideoType } from '@/types/types';
import TheInput from '@/components/UI/Inputs/TheInput.vue';
import IconChecked from '@/assets/icons/PlayList/Checked.vue'

defineProps({
  data: {
    type: Object,
    default: {
      name: '',
      description: '',
      category: '',
      search: '',
    }
  },
  video: {
    type: Array as () => ShortVideoType[],
    default: [],
  },
  activeVideo: {
    type: Array as () => string[],
    default: () => [],
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

const emits = defineEmits(['pressed']);


function emitsPressed(id: string, item:  ShortVideoType,) {
  emits('pressed', id, item);
}
</script>

<style lang="stylus">
.playlist-data
  display flex
  justify-content space-between
  margin-top 27px
  min-height 100vh

  &__inputs
    max-width 430px
    width 100%

    .input
      margin-bottom 25px
      p
        margin-bottom 4px
        color #FFF
        font-family Uto
        font-size 14px
        font-weight 400
  
  &__videos
    max-width 412px
    width 100%

    &-item
      margin-top 30px

      .video
        border-radius 8px
        margin-bottom 24px
        cursor pointer
        position relative

        &__checked
          display none

        &_active
          outline 4px solid #AD7955

          .video__checked
            display inline
            position absolute
            right 0
            top 0
            z-index 1
            
        &__photo
          position relative
          aspect-ratio 1.4

          &-img
            position absolute
            left 0
            top 0
            width 100%
            height 100%

            img
              width 100%
              height 100%
              border-radius 8px 8px 0 0

        &__duration
          position absolute
          z-index 1
          right 10px
          bottom 10px
          border-radius 9px
          background rgba(0, 0, 0, 0.40)
          backdrop-filter blur(2.2391304969787598px)    
          padding 8px

          p
            color #FFF
            font-family Uto
            font-size 13px
            font-weight 400

        &__info
          border-radius 0 0 8px 8px
          background #222
          padding 9px

          h3
            color #FFF
            font-family Uto
            font-size 18px
            font-weight 500
            line-height 20px
            margin-bottom 8px
          
          p
            color #999
            font-family Arial
            font-size 16px
            font-weight 400
</style>