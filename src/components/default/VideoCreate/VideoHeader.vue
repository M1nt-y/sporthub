<template>
  <div class="video-header">
    <h3 v-if="$route.name === 'video-create'">Adding a new video</h3>
    <h3 v-else>Edit video</h3>
    <div class="video-header__btn">
      <TheButton
        v-if="$route.name === 'video-create'"
        :text="'Publish'"
        :disabledBtn="disabled"
        :padding="14"
        :width="180"
        @click="sendVideo"
      />
      <TheButton
        v-else
        :text="'Edit'"
        :disabledBtn="disabled"
        :padding="14"
        :width="180"
        @click="sendVideo"
      />

      <div 
        class="video-header__btn-dropdown"
        :class="{'video-header__btn-dropdown_disabled': disabled}"
        >
        <LogoIcon
          class="video-header__btn-svg"
          @click.stop = "isOpened = !isOpened"
        />

        <div 
          class="dropdown"
          :class="{'dropdown_active': isOpened}"
          >
          <p class="item"   @click.stop="savedData">Save as draft</p>
          <p class="item" @click.stop="deleteData">Delete</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref, watchEffect } from 'vue'
import TheButton from '@/components/UI/Buttons/TheButton.vue';
import LogoIcon from '@/assets/icons/VideoCreate/IconBtn.vue';

const isOpened = ref(false);
watchEffect(() => {
  if (isOpened.value) {
    const closeDropdown = () => {
      isOpened.value = false;
    };
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }
});

const emits = defineEmits(['saveInfo', 'send', 'delete'])

function savedData(){
  emits('saveInfo');
  isOpened.value = false
}

function deleteData(){
  emits('delete');
  isOpened.value = false
}

function sendVideo(){
  emits('send');
}

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  }
})
</script>

<style lang="stylus">
.video-header
  display flex
  justify-content space-between
  align-items center

  h3
    color #FFF
    font-size 24px
    font-weight 500

    @media(max-width: 575px)
      font-size 18px
  
  &__btn
    display flex
    align-items center
    grid-gap 16px

    @media(max-width: 575px)
      gap 10px

    button
      @media(max-width: 575px)
        width 100px !important

    &-dropdown
      position relative

      .dropdown
        display none
        position absolute
        right  0
        top 50px
        z-index 5
        border-radius 8px
        width 240px
        background #222
        overflow hidden

        @media(max-width: 575px)
          width 157px

        &_active
          display block

        p
          padding 14px 10px
          color #FFF
          font-size 16px
          font-weight 400
          transition all .25s
          cursor pointer
          

          &:hover
            color  #BBB
            background rgba(187, 187, 187, 0.2)  

      &_disabled
        & ^[0]__btn-svg
          cursor default
          pointer-events none

          path
            fill #BBB
          rect
            stroke #BBB

    &-svg
      cursor pointer
      transition all .25s

      path
        fill #AD7955
        transition all .25s

      rect
        stroke #AD7955
        transition all .25s
      
      &:hover

        path
          fill #BBB
        rect
          stroke #BBB
        
</style>