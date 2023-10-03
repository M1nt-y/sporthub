<template>
  <AppLayout>
    <TheButton
    :width="180"
    :padding="10"
    :isSearch="true"
    :text="'Subscribe'"
    :defaultBtn="false"
    :disabledBtn="true"
    :background="true"
    />
    <RouterView />
  </AppLayout>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import TheButton from '@/components/UI/Buttons/Button.vue'

</script>

<style scoped lang="stylus">

</style>
