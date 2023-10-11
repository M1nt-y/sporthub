<template>
  <main class="main auth">
    <div class="auth__animation"></div>

    <div class="auth-wrapper">
      <RouterLink to="/" class="auth__logo">
        <LogoIcon/>

        <div class="auth__logo-title">sporthub</div>
      </RouterLink>

      <slot/>

      <div class="auth__text">
        By proceeding, you agree to our <span>Terms of Use</span> and <span>Privacy Policy</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import LogoIcon from '@/assets/icons/Header/LogoIcon.vue'
</script>

<style scoped lang="stylus">
.auth
  display flex
  justify-content space-between

  &__animation
    width 100%
    position relative

  &-wrapper
    display flex
    min-width 580px
    max-width 580px
    padding 24px 48px
    align-items center
    flex-direction column
    justify-content space-between

  &__logo
    display flex
    align-items center

    &-title
      color #FFF
      font-size 22px
      font-weight 700
      margin-left 4px
      transition color 0.3s ease

      ^[-1]:hover &
        color #AD7955

  &__text
    color #777
    font-size 12px
    line-height 22px

    span
      cursor pointer
      text-decoration underline
</style>
