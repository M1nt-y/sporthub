<template>
<div 
  class="ui-radio"
  >
  <IconRadioChecked 
  style="width: 28px; height: 28px;"
  v-if="state"/>
  <IconRadioDefault 
  style="width: 28px; height: 28px;"
  v-else/>
</div>
</template>

<script setup lang="ts">
import IconRadioChecked from '@/assets/icons/radio-input/RadioChecked.vue'
import IconRadioDefault from '@/assets/icons/radio-input/RadioDefault.vue'

defineProps({
  state: {
    type: Boolean,
    default: false,
  }
})


</script>

<style lang="stylus">
.ui-radio
  cursor pointer
</style>