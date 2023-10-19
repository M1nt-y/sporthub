<template>
  <AppLayout>
    <RouterView/>
  </AppLayout>
</template>

<script setup lang="ts">
import {RouterView} from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
</script>

<style lang="stylus">

*
  margin 0
  padding 0
  border 0
  font-size 100%
  box-sizing border-box
  vertical-align baseline
  font-family Uto, sans-serif

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section
  display block

html
  height 100%

body
  height 100%
  line-height 1

ol, ul
  list-style none

a
  text-decoration none
  color inherit

blockquote, q
  quotes none

blockquote:before, blockquote:after, q:before, q:after
  content ''

table
  border-collapse collapse
  border-spacing 0

#app
  display flex
  flex-direction column
  min-height 100%
  background #111

.wrapper
  display flex
  flex-direction column
  min-height 100%
  flex 1 1 auto

.main
  flex 1 1 auto
</style>
