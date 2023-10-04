<template>
<div class="ui-input"
:class="{
  'ui-input_search': search, // отображение иконки поиска справа
  'ui-input_search-left': searchLeft // отображение иконки поиска слева
  }"
>
  <input
    @input="inputs"
    class="ui-input__item"
    :type="type"
    :placeholder="placeholder"
    :style="{
      paddingTop: padding + 'px',
      paddingBottom: padding + 'px',
      }"
  />
  
  <IconSearch
      v-if="search || searchLeft"
  />
</div>
</template>

<script setup lang="ts">
import IconSearch from '@/assets/icons/Button/Search.vue'
defineProps({
  padding:{
    type: Number,
    default: 10,
  },
  placeholder:{
    type: String,
    default: '',
  },
  type:{
    type: String,
    default: 'text',
  },
  search:{
    type: Boolean,
    default: false,
  },
  searchLeft:{
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['inputs']);
function inputs(){
  emits('inputs');
}
</script>


<style lang="stylus">
.ui-input
  position relative

  svg
    position absolute
    pointer-events none
    right 16px
    top 50%
    width 19px
    height 19px
    margin-top -9.5px 

  &__item
    width 100%
    border-radius 8px
    background  #222
    color #FFF
    padding 0 16px
    overflow hidden
    border 0
    outline 0
    font-family Uto
    font-size 16px
    font-weight 400

    &::placeholder
      color #999

    &:focus
      outline 2px solid #FFF
    
  &_search
    & ^[0]__item
      padding-right 40px

  &_search-left
    & ^[0]__item
      padding-left 50px
    
    svg
      right unset
      left 20px
</style>