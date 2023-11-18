<template>
  <div class="video-info">
    <div class="video-block">
      <video :controls="progresVideo == 100" width="920" height="518">
        <source :src="video" type="video/mp4">
      </video>

      <div class="video-block__content" v-if="progresVideo !== 100">
        <h3>Processing will begin shortly</h3>
        <h5>{{ Math.round(progresVideo) }} %</h5>
        <p>{{ videoName }}</p>
      </div>
    </div>

    <div class="video-info__users">
      <div class="video-info__users-inputs">
        <div class="input">
          <p>Title</p>

          <TheInput
              v-model="data.title"
              :placeholder="'Video Name'"
              :padding="16"
          />
        </div>

        <div class="input">
          <p>Category</p>

          <TheInput
              v-model="data.category"
              :placeholder="'Select category'"
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
          <p>Add Shopify link</p>

          <TheInput
              v-model="data.link"
              :placeholder="'Add Shopify link'"
              :padding="16"
          />
        </div>
      </div>

      <div class="video-info__users-img"
           @dragover.prevent
           @drop="handleDrop($event)"
           @dragenter="dragEnter"
           @dragleave="dragLeave"
           @click="openFileInput"
           :class="{ 'video-info__users-img_using': isDragging }"
      >
        <IconUpload/>

        <h3 v-if="!img">Drag and drop photo to upload</h3>

        <p v-if="!img">Information about adding photo. Amet minim mollit non deserunt ullamco est sit </p>

        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" accept="image/*">

        <div class="img" v-if="img">
          <img v-if="img" :src="URL.createObjectURL(img)" alt="">
        </div>
        <div class="img" v-else>
          <img v-if="typeof videoState.preview === 'string'" :src="videoState.preview" alt="">
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue';

import IconUpload from '@/assets/icons/VideoCreate/IconUpload.vue'

import TheInput from '@/components/UI/Inputs/TheInput.vue';

import {stateVideo} from '@/stores/video-create';
const videoState = stateVideo();


const {URL} = window;


const img = ref(null as File | null)

const URL_IMAGE = ref('')

const isDragging = ref(false)

const imgUpdate = ref(null as Boolean | null);

const fileInput = ref<HTMLInputElement | null>(null);

const openFileInput = () => {
  const filesInput = fileInput.value;
  if (filesInput) {
    filesInput.click();
    imgUpdate.value = true;
  }
};

const handleFileChange = (event: any) => {
  const files = event.target.files;
  if (files && files.length === 1) {
    img.value = files[0];
    videoState.preview = files[0];
  }
};

async function handleDrop(event: DragEvent) {
  event.preventDefault();
  const files = event.dataTransfer?.files;

  if (files && files.length === 1) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      isDragging.value = false;
      img.value = file;
      videoState.preview = file;
      console.log(`Добавлено фото:: ${URL_IMAGE.value}`);
    } else {
      console.log(`Неверный тип файла: ${file.type}`);
      isDragging.value = false;
    }
  } else {
    console.log("Пожалуйста, перетащите только одно изображение.");
    isDragging.value = false;
  }
}

function dragEnter() {
  isDragging.value = true;
}

function dragLeave() {
  isDragging.value = false;
}


defineProps({
  data: {
    type: Object,
    default: {
      title: '',
      category: '',
      description: '',
      link: '',
    }
  },
  video: {
    type: String,
    default: '',
  },
  videoName: {
    type: String,
    default: '',
  },
  progresVideo: {
    type: Number,
    default: 0,
  }
})

videoState.preview = null;
</script>

<style lang="stylus">
.video-info
  margin-top 20px
  margin-bottom 20px

  &__users
    margin-top 32px
    display flex
    align-items flex-start
    justify-content space-between

    @media (max-width: 680px)
      flex-direction column

    &-inputs
      max-width 430px
      width 100%

      @media (max-width: 680px)
        max-width 100%

      .input
        margin-bottom 36px

        @media (max-width: 680px)
          margin-bottom 24px

        p
          color #FFF
          font-size 14px
          font-weight 400
          margin-bottom 4px

    &-img
      position relative
      cursor pointer
      max-width 442px
      width 100%
      border-radius 8px
      background #653012
      height 250px
      display flex
      flex-direction column
      justify-content center
      align-items center
      margin-left 48px
      transition all .25s

      .img
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        border-radius 8px
        pointer-events none

        img
          width 100%
          height 100%
          border-radius 8px

      &_using
        background none
        outline 4px solid #653012

        svg
          path
            fill white

      &:hover
        background none
        outline 4px solid #653012

        svg
          path
            fill white

      @media (max-width: 680px)
        max-width 100%
        margin-left 0

      svg
        width 38px
        height 38px
        margin-top 10px
        pointer-events none
        user-select none

        @media (max-width: 680px)
          margin-top 0

      h3
        color #FFF
        text-align center
        font-size 16px
        font-weight 400
        max-width 175px
        line-height 1.2
        margin-top 16px
        margin-bottom 8px
        pointer-events none
        user-select none

      p
        color #EEE
        text-align center
        font-size 12px
        font-weight 400
        max-width 292px
        line-height 1.2
        pointer-events none
        user-select none

.video-block
  position relative
  padding-bottom 57%
  border-radius 16px

  video
    position absolute
    width 100%
    height 100%
    left 0
    border-radius 16px
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

      @media (max-width: 575px)
        font-size 16px

    h5
      margin-top 20px
      color #FFF
      font-size 20px
      font-family Times

      @media (max-width: 575px)
        font-size 15px

    p
      margin-top 40px
      font-family Times
      color #FFF
      font-size 18px
      font-weight 500

      @media (max-width: 575px)
        font-size 12px
</style>
