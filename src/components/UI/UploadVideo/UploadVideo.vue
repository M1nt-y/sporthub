<template>
  <div class="upload-video"
       @dragover.prevent
       @drop="handleDrop($event)"
       @dragenter="dragEnter"
       @dragleave="dragLeave"
       :class="{ 'upload-video_using': isDragging }"
  >
    <div class="upload-video__img">
      <IconUpload/>
    </div>

    <div class="upload-video__text">
      <h4>Drag and drop videos to upload</h4>
    </div>

    <div class="upload-video__btn">
      <input
          type="file"
          ref="fileInput"
          style="display: none"
          @change="handleFileInputChange($event)"
          accept="video/*"
      />

      <TheButton
          :width="180"
          :text="'Or choose files'"
          :padding="10"
          :disabledBtn="isDragging"
          @click="openFileInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {stateVideo} from '@/stores/video-create'
import IconUpload from '@/assets/icons/VideoCreate/IconUpload.vue'
import TheButton from '@/components/UI/Buttons/TheButton.vue';


const videoState = stateVideo();

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

function handleDrop(event: DragEvent) {
  event.preventDefault();
  const files = event.dataTransfer?.files;

  if (files && files.length === 1) {
    const file = files[0];
    if (file.type.startsWith('video/')) {
      isDragging.value = false;
      videoState.video = file;
      videoState.stateVideo = true;
      console.log(`Добавлен видеофайл: ${file.name}`);
    } else {
      console.log(`Неверный тип файла: ${file.type}`);
      isDragging.value = false;
    }
  } else {
    console.log("Пожалуйста, перетащите только один видеофайл.");
    isDragging.value = false;
  }
}

function dragEnter() {
  isDragging.value = true;
}

function dragLeave() {
  isDragging.value = false;
}

function handleFileInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files) {
    videoState.video = files[0];
    videoState.stateVideo = true;
  }
}

function openFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

videoState.video = null;
videoState.stateVideo = null;
</script>

<style lang="stylus">
.upload-video
  margin-top 24px
  border-radius 16px
  background #222
  display flex
  flex-direction column
  align-items center
  padding 60px 0
  margin-bottom 100px
  cursor pointer
  transition all .25s

  @media (max-width: 576px)
    background none
    padding 0
    justify-content center

  &_using
    background #AD7955

    @media (max-width: 576px)
      background none

    & ^[0]__img
      svg
        transition all .25s

        path
          fill white

  &__img
    margin-top 57px
    pointer-events none
    user-select none

    @media (max-width: 576px)
      margin-top 0

    svg
      transition all .25s

  &__text
    max-width 367px
    margin-top 44px
    pointer-events none
    user-select none

    @media (max-width: 576px)
      margin-top 0

    h4
      color #FFF
      text-align center
      font-size 36px
      font-weight 500
      line-height 1.2

  &__btn
    margin-top 45px
    margin-bottom 60px

</style>
