<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchPhotos } from './api'
import type { Photo } from './types'
import LoaderComponent from '@/components/UI/loader.component.vue'
import PhotoCardComponent from '@/components/UI/photo-card.component.vue'
import ErrorNotificationComponent from '@/components/UI/error-notification.component.vue'

const props = defineProps<{
  albumId: number
}>()

const photos = ref<Photo[]>([])
const isLoading = ref(false)
const hasError = ref(false)

watch(
  () => props.albumId,
  async (newAlbumId) => {
    if (newAlbumId) {
      isLoading.value = true
      hasError.value = false
      try {
        photos.value = await fetchPhotos(newAlbumId)
      } catch (err) {
        console.error('Ошибка загрузки фотографий:', err)
        hasError.value = true
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
    <ErrorNotificationComponent v-else-if="hasError" />

    <template v-else>
      <PhotoCardComponent
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
        :show-favorite="true"
      />
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
