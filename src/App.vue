<script setup lang="ts">
import NavMenuComponent from './components/nav-menu/nav-menu.component.vue'
</script>

<template>
  <div class="app-container">
    <div class="content">
    <NavMenuComponent />
  </div>
  </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
    max-height: 100vh; 
    overflow: hidden;
    margin-top: 64px; 
}

.content {
  max-width: 744px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  overflow-y: auto;
}
</style>
