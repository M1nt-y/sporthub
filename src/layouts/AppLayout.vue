<template>
  <div class="wrapper">
    <component :is="route.meta.layoutComponent">
      <slot />
    </component>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
