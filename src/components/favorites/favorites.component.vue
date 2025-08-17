<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites.store'
import PhotoCardComponent from '@/components/UI/photo-card.component.vue'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div class="favorites-view">
    <div v-if="favoritesStore.favorites.length === 0" class="empty-message">
      Нет избранных фотографий
    </div>

    <div v-else class="favorites-grid">
      <PhotoCardComponent
        v-for="photo in favoritesStore.favorites"
        :key="photo.id"
        :photo="photo"
        :show-favorite="true"
      />
    </div>
  </div>
</template>

<style scoped>
.favorites-view {
  padding: 20px;
}

.empty-message {
  text-align: center;
  padding: 40px;
  color: #666;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 700px) {
  .favorites-grid {
    grid-template-columns: repeat(2, 150px);
    justify-content: center;
  }
}
</style>
