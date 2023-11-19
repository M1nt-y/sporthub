<template>
  <TheHeader/>
  <TheNavbar/>
  <main class="main">
    <slot />
  </main>
</template>

<script setup lang="ts">
import TheHeader from '@/components/Base/TheHeader.vue'
import TheNavbar from '@/components/Base/TheNavbar.vue'
</script>
