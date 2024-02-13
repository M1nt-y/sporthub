<template>
  <AppLayout>
    <RouterView/>
  </AppLayout>
</template>

<script setup>
import {RouterView} from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";


function find(arr, item) {
  let start = 0;
  let end = arr.length - 1;

  while(start <= end) {
    const index = Math.round((start + end) / 2)

    if(arr[index] === item) {
      return index;
    }else if(arr[index] < item) {
      start = index + 1;
    }else {
      end = index - 1;
    }
  }

  return -1;
}

const a = [1, 11, 21];


console.log(a)

console.log("Test", "Result", "Expected")
console.log("Test01", find(a, -1), 0);

console.log("Test02", find(a, 11), 1);
console.log("Test03", find(a, 21), 2);
console.log("Test04", find(a, 31), 3);

console.log("Test05", find(a, 41), 4);
console.log("Test06", find(a, 51), 5);
console.log("Test07", find(a, 0), -1);
console.log("Test08", find(a, 100), -1);
console.log("Test09", find(a, 22), -1);
console.log("Test10", find(a, 32), -1);

console.log("Test11", find(a, -32), -1);

</script>

<style lang="stylus">

*
  margin 0
  padding 0
  border 0
  font-size 100%
  box-sizing border-box
  vertical-align baseline
  font-family Montserrat, sans-serif

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
