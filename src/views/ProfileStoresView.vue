<template>
  <div class="profile-stores">
    <div class="profile-stores__head">
      <div class="profile-stores__head-title">Your store</div>

      <TheButton text="Add new" :padding="13" :width="180" @click="addStore"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheButton from '@/components/UI/Buttons/TheButton.vue'

function addStore() {
  console.log('added store')
}
</script>

<style scoped lang="stylus">
.profile-stores
  margin 0 auto
  max-width 920px

  &__head
    width 100%
    display flex
    padding 16px 0
    margin-bottom 16px
    align-items center
    justify-content space-between

    @media screen and (max-width: 768px)
      padding 8px 0
      margin-bottom 32px

    &-title
      color #FFF
      font-size 24px
      font-weight 500
</style>
