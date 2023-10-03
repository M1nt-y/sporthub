<template>
  <button
   class="ui-button"
   :class="{
    'ui-button_default': defaultBtn, // стандартная
    'ui-button_coffe': coffeBtn, //коричневая
    'ui-button_dissabled': disabledBtn, //дисаблед
    'ui-button_default-bg' : defaultBtn && background, // стндарт + без фона
    'ui-button_coffe-bg' : coffeBtn && background, // кофейная + без фона
    'ui-button_dissabled-bg' : disabledBtn && background, // дисаблен + без фона
    }"

   :style="{
      width: width + 'px',
      paddingTop: padding + 'px',
      paddingBottom: padding + 'px',
    }"
    @click="emitsPressed">
    <span
    class="ui-button__span"
    :class="{'ui-button__span_search': searchRight}">
      <IconSearch 
      v-if="isSearch"
      style="
      width: 18px;
      height: 18px;"
      :class="{'svg_none': text.length < 1}"/>
      {{ text }}
    </span>
  </button>
</template>

<script setup lang="ts">
import IconSearch from '@/assets/icons/Button/Search.vue';

defineProps({
  width:{
    type: Number,
    default: 100,
  },
  padding:{
    type: Number,
    default: 0,
  },
  isSearch: {
    type: Boolean,
    default: false,
  },
  searchRight:{
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
  defaultBtn: {
    type: Boolean,
    default: true,
  },
  coffeBtn: {
    type: Boolean,
    default: false,
  },
  disabledBtn:{
    type: Boolean,
    default: false,
  },
  background:{
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['pressed']);
function emitsPressed(){
  emits('pressed');
}
</script>

<style lang="styl">
.ui-button
  display block
  cursor pointer
  color #FFF
  text-align center
  font-family Uto
  font-size 16px
  font-weight 600
  border-radius 8px
  transition background 0.55s

  &__span
    display flex
    align-items center
    width 100%
    justify-content center

    svg
      margin-right 10px

    &_search
      flex-direction row-reverse

      svg
        margin-right 0
        margin-left 10px

  &_default
    border 1px solid #AD7955
    background #AD7955

    &:hover
      background rgba(100, 100, 100, 0)
      color #AD7955

      svg
        path
          fill #AD7955
    
    &-bg
      background rgba(100, 100, 100, 0)
      color #AD7955

      svg
        path
          fill #AD7955
      
      &:hover
        background #AD7955
        color #FFF

        svg
          path
            fill #FFF

  &_coffe
    border 1px solid #8F5334
    background #8F5334

    &:hover
      background rgba(100, 100, 100, 0)
      color #8F5334

      svg
        path
          fill #8F5334

    &-bg
      background rgba(100, 100, 100, 0)
      color #8F5334

      svg
        path
          fill #8F5334
      
      &:hover
        background #8F5334
        color #FFF

        svg
          path
            fill #FFF
  
  &_dissabled
    border 1px solid #777
    pointer-events none
    opacity 0.6
    background #777

    &-bg
      background rgba(100, 100, 100, 0)
      color #BBB

      svg
        path
          fill #BBB

.svg_none
  margin 0 !important
</style>