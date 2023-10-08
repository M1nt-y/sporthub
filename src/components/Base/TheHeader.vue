<template>
  <header class="header">
    <div class="header__wrapper">
      <RouterLink to="/" class="header__logo">
        <LogoIcon/>

        <div class="header__logo-title">sporthub</div>
      </RouterLink>
    </div>

    <div class="header__wrapper">
      <div class="header__icon">
        <SearchIcon/>
      </div>

      <div class="header__icon">
        <NotificationIcon/>
      </div>

      <RouterLink to="/login">
        <TheButton text="Sign In" :padding="12" :width="120" />
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoIcon from '@/assets/icons/Header/LogoIcon.vue'
import SearchIcon from '@/assets/icons/Header/SearchIcon.vue'
import NotificationIcon from '@/assets/icons/Header/NotificationIcon.vue'
import TheButton from '@/components/UI/Buttons/TheButton.vue'

</script>

<style scoped lang="stylus">
.header
  height 62px
  display flex
  background #111
  padding 16px 24px
  align-items center
  justify-content space-between

  &__wrapper
    display flex
    align-items center

    .ui-button
      font-size 14px
      margin-left 16px

  &__logo
    display flex
    align-items center

    &-title
      color #FFF
      font-size 20px
      font-weight 600
      margin-left 4px
      transition color 0.3s ease

      ^[-1]:hover &
        color #AD7955

  &__icon
    padding 8px
    cursor pointer
    margin-left 16px

    svg
      path
        transition fill 0.3s ease

    &:hover

      svg
        path
          fill #AD7955
</style>
