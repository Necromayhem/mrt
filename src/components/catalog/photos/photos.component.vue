<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchPhotos } from './api'
import type { Photo } from './types'
import LoaderComponent from '@/components/UI/loader.component.vue'

const props = defineProps<{
  albumId: number
}>()

const photos = ref<Photo[]>([])
const isLoading = ref(false)

watch(
  () => props.albumId,
  async (newAlbumId) => {
    if (newAlbumId) {
      isLoading.value = true
      try {
        photos.value = await fetchPhotos(newAlbumId)
      } catch (err) {
        console.error('Ошибка загрузки фотографий:', err)
      } finally {
        isLoading.value = false
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="photos-grid">
    <LoaderComponent v-if="isLoading" height="320px" />

    <template v-else>
      <div v-for="photo in photos" :key="photo.id" class="photo-card">
        <div class="photo-container">
          <img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-thumbnail" />
          <p class="photo-title">{{ photo.title }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.photos-container {
  width: 100%;
  max-width: 534px;
  margin: 0 auto;
  padding: 16px;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(3, 150px);
  gap: 43px;
  justify-content: center;
}

.photo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.photo-container {
  position: relative;
}

.photo-thumbnail {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.2s;
}

.photo-thumbnail:hover {
  transform: scale(1.05);
}

.photo-title {
  position: absolute;
  bottom: -30px;
  left: 60px;
  right: 0;
  background: rgba(0, 0, 0, 0.69);
  color: white;
  padding: 4px 8px;
  z-index: 1000;
  border-radius: 4px;
  margin: 0;
  font-size: 12px;
  line-height: 1.3;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  width: 100%;
  max-width: 134px;
  box-sizing: border-box;
  text-align: start;
  white-space: normal;
  word-wrap: break-word;
}

.photo-container:hover .photo-title {
  opacity: 1;
}

@media (max-width: 700px) {
  .photos-grid {
    grid-template-columns: repeat(2, 150px);
    gap: 30px;
  }

  .photos-container {
    max-width: 380px;
  }
}
</style>
