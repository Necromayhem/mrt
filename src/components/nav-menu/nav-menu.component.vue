<script setup lang="ts">
import { ref } from 'vue'

const activeButton = ref('catalog')

function setActive(buttonName: string) {
  activeButton.value = buttonName
}
</script>

<template>
  <div class="actions-panel">
    <router-link
      to="/catalog"
      class="actions-panel__button actions-panel__button--catalog"
      :class="{ active: activeButton === 'catalog' }"
      @click="activeButton = 'catalog'"
    >
      Каталог
    </router-link>
    <router-link
      to="/favorites"
      class="actions-panel__button actions-panel__button--favorites"
      :class="{ active: activeButton === 'favorites' }"
      @click="activeButton = 'favorites'"
    >
      Избранное
    </router-link>
  </div>
</template>

<style scoped>
.actions-panel {
  display: flex;
  justify-content: center;
}

.actions-panel__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 372px;
  width: 100%;
  height: 55px;
  padding: 0 32px;
  font-size: 18px;
  line-height: 1.3;
  background: none;
  border: none;
  border-radius: 8px;
  color: #1c1c1c;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.actions-panel__button:hover {
  color: #117dc1;
  background-color: #edf9ff;
}

.actions-panel__button.active {
  color: #117dc1;
  background-color: #edf9ff;
}
</style>
