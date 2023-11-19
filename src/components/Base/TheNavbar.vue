<template>
  <nav class="navbar">
    <div class="navbar__links">
      <div class="navbar__links-item navbar__links-item--active">Home</div>

      <div class="navbar__links-item">Latest</div>

      <div class="navbar__links-item">View Later</div>
    </div>

    <div class="navbar__subscriptions"></div>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped lang="stylus">
.navbar
  padding 24px
  min-width 260px

  &__links
    margin-bottom 24px

    &-item
      width 100%
      color #BBB
      cursor pointer
      font-size 16px
      font-weight 400
      padding 9px 10px
      transition color 0.3s ease, background 0.3s ease

      &--active
        color #FFF
        background #222

</style>
