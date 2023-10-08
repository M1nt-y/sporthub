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
  box-sizing border-box

html, body, div, span, applet, object,
h1, h2, h3, h4, h5, h6, p, blockquote,
pre, a, abbr, acronym, address, big,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend, caption,
table, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, ruby, iframe, video, audio, time,
code, mark, section, summary, output, cite
  margin 0
  padding 0
  border 0
  font-size 100%
  font-family Uto, sans-serif
  vertical-align baseline

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
  //background #111

.wrapper
  display flex
  flex-direction column
  min-height 100%
  flex 1 1 auto

.main
  flex 1 1 auto
</style>
