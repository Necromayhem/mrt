<script setup lang="ts">
import { ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorites.store'
import PhotoCardComponent from '@/components/UI/photo-card.component.vue'
import FavoritesEmptyComponent from '../UI/favorites-empty.component.vue'
import ImageModalComponent from '@/components/UI/image-modal.component.vue'
import type { Photo } from '@/components/catalog/photos/types'

const favoritesStore = useFavoritesStore()
const selectedPhoto = ref<Photo | null>(null)

const openModal = (photo: Photo) => {
  selectedPhoto.value = photo
}

const closeModal = () => {
  selectedPhoto.value = null
}
</script>

<template>
  <div class="favorites-view">
    <div v-if="favoritesStore.favorites.length === 0" class="empty-message">
      <FavoritesEmptyComponent />
    </div>

    <div v-else class="favorites-grid">
      <PhotoCardComponent
        v-for="photo in favoritesStore.favorites"
        :key="photo.id"
        :photo="photo"
        :show-favorite="true"
        @open-modal="openModal"
      />
    </div>

    <ImageModalComponent 
      v-if="selectedPhoto"
      :photo="selectedPhoto"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.favorites-view {
  padding: 20px;
  padding-top: 56px;
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
