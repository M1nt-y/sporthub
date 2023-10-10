<template>
  <div class="video-header">
    <h3>Adding a new video</h3>
    <div class="video-header__btn">
      <TheButton
        :text="'Publish'"
        :disabledBtn="disabled"
        :padding="14"
        :width="180"
      />
      <LogoIcon
        class="video-header__btn-svg"
        :class="{'video-header__btn-svg_disabled': disabled}"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import TheButton from '@/components/UI/Buttons/TheButton.vue';
import LogoIcon from '@/assets/icons/VideoCreate/IconBtn.vue';

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
  
  &__btn
    display flex
    align-items center
    grid-gap 16px

    &-svg
      cursor pointer

      path
        fill #AD7955

      rect
        stroke #AD7955
      
      &_disabled
        cursor default
        pointer-events none
        path
          fill #BBB
        rect
          stroke #BBB
</style>