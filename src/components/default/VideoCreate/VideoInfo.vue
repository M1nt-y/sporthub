<template>
<div class="video-info">
  <div class="video-block">
    <video  width="920" height="518">
      <source v-if="videoState.video" :src="URL.createObjectURL(videoState.video)" type="video/mp4">
    </video>

    <div class="video-block__content">
      <h3>Processing will begin shortly</h3>
      <p v-if="videoState.video !== null">{{ videoState.video.name }}</p>
    </div>
  </div>

  <div class="video-info__users">
    <div class="video-info__users-inputs">
      <div class="input">
        <p>Title</p>
        <TheInput
          v-model="title"
          :placeholder="'Video Name'"
          :padding="16"
        />
      </div>
    </div>

    <div class="video-info__users-img">

    </div>
  </div>
</div>

</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { stateVideo } from '@/stores/video-create';
import TheInput from '@/components/UI/Inputs/TheInput.vue';

const { URL } = window;
const videoState = stateVideo();

const title = ref('');

</script>


<style lang="stylus">
.video-info
  margin-top 20px

  &__users
    margin-top 32px
    display flex
    justify-content space-between

    &-inputs
      max-width 430px
      width 100%
      .input
        p
          color #FFF
          font-size 14px
          font-weight 400
          margin-bottom 4px

.video-block
  position relative
  padding-bottom 57%
  border-radius 16px

  video
    position absolute
    width 100%
    height 100%
    left 0
    top 0

  &__content
    position absolute
    left -1%
    top 0
    width 102%
    height 100%
    background rgba(34, 34, 34, 0.60)
    backdrop-filter blur(6px)
    display flex
    flex-direction column
    justify-content center
    align-items center
    border-radius 16px

    h3
      color #FFF
      font-size 36px
      font-weight 500

      @media(max-width: 575px)
        font-size 16px

    p
      margin-top 40px
      font-family Times
      color #FFF
      font-size 18px
      font-weight 500

      @media(max-width: 575px)
        font-size 12px
</style>