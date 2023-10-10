<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__burger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <RouterLink to="/" class="header__logo">
        <LogoIcon/>

        <div class="header__logo-title">sporthub</div>
      </RouterLink>
    </div>

    <div class="header__wrapper">
      <div class="header__icon">
        <SearchIcon/>
      </div>

      <div class="header__icon header__icon_second">
        <NotificationIcon/>
      </div>

      <div class="header__link" v-if="isLoggedIn">Video</div>

      <div class="header__link" v-if="isLoggedIn">Store</div>

      <div class="header__profile" v-if="isLoggedIn">
        <div class="header__profile-image"></div>

        <div class="header__profile-link">Profile</div>
      </div>

      <RouterLink to="/login" v-else>
        <TheButton text="Sign In" :padding="12" :width="120" />
      </RouterLink>

    </div>
  </header>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import LogoIcon from '@/assets/icons/Header/LogoIcon.vue'
import SearchIcon from '@/assets/icons/Header/SearchIcon.vue'
import NotificationIcon from '@/assets/icons/Header/NotificationIcon.vue'
import TheButton from '@/components/UI/Buttons/TheButton.vue'


const isLoggedIn = ref(true)
</script>

<style lang="stylus">
.header
  height 62px
  display flex
  background #111
  padding 16px 24px
  align-items center
  justify-content space-between

  @media screen and (max-width 576px)
    padding 16px

  &__wrapper
    display flex
    align-items center

    .ui-button
      font-size 14px
      margin-left 16px

  &__burger
    display none
    padding 9px 7px
    margin-right 16px

    @media screen and (max-width 576px)
      display block

    span
      height 2px
      width 18px
      display block
      background #FFF
      margin-bottom 4px

      &:last-child
        margin-bottom 0

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
    display flex
    cursor pointer
    margin-left 16px
    align-items center

    @media screen and (max-width 576px)
      padding 4px

    &_second
      @media screen and (max-width 576px)
        display none

    svg
      path
        transition fill 0.3s ease

    &:hover

      svg
        path
          fill #AD7955

  &__link
    color #BBB
    font-size 16px
    margin-left 24px
    padding 14px 10px

    @media screen and (max-width 576px)
      display none

  &__profile
    display flex
    margin-left 24px
    padding 7px 10px
    align-items center

    @media screen and (max-width 576px)
      display none

    &-image
      width 24px
      height 24px
      background wheat
      border-radius 24px

    &-link
      color #BBB
      font-size 16px
      padding 14px 0 14px 10px
</style>
