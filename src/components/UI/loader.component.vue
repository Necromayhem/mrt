<script setup lang="ts">
defineProps<{
  height?: string
}>()
</script>

<template>
  <div class="loader-container" :style="{ height }">
    <img src="/src/assets/loader.gif" alt="Loading..." class="loader" />
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.loader {
  width: 48px;
  height: 48px;
}
</style>