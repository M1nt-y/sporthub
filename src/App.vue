<template>
  <AppLayout>
    <TheInput
    :padding="16"
    :placeholder="'You Email'"
    :type="'text'"
    :searchLeft="true"
    />
    <RouterView />
  </AppLayout>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import TheInput from '@/components/UI/Inputs/TheInput.vue'

</script>

<style  lang="stylus">
*
  box-sizing border-box



</style>
