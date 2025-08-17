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
    <div v-if="favoritesStore.favorites.length === 0" class="empty-container">
      <FavoritesEmptyComponent />
    </div>

    <div v-else class="favorites-container">
      <div 
        v-for="photo in favoritesStore.favorites" 
        :key="photo.id" 
        class="favorite-item"
      >
        <PhotoCardComponent
          :photo="photo"
          :show-favorite="true"
          :in-favorites="true"
          @open-modal="openModal"
        />
      </div>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.empty-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 150px;
}

.favorites-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 42px;
  padding-top: 32px;
  width: 100%;
  max-width: 534px;
  margin: 0 auto;
}

.favorite-item {
  width: 150px;
  margin-bottom: 42px; 
}

@media (max-width: 700px) {
  .favorites-container {
    max-width: 380px;
    gap: 30px;
  }
}
</style>