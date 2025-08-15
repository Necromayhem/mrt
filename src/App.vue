<script setup lang="ts">
import ContentMenuComponent from './components/content-menu/content-menu.component.vue';
import NavMenuComponent from './components/nav-menu/nav-menu.component.vue'
</script>

<template>
  <div class="app-container">
    <div class="content">
    <NavMenuComponent />
    <ContentMenuComponent />
  </div>
  </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
    max-height: 100vh; 
    overflow-y: auto;
    padding-top: 64px; 
}

.content {
  max-width: 744px;
  width: 100%;
  margin: 0 auto;
}
</style>
