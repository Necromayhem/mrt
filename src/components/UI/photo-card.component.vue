<script setup lang="ts">
import type { Photo } from '@/components/catalog/photos/types'
import StarActiveComponent from '@/components/UI/star-active.component.vue'
import StarEmptyComponent from '@/components/UI/star-empty.component.vue'
import { useFavoritesStore } from '@/stores/favorites.store'
import { ref } from 'vue'

const props = defineProps<{
  photo: Photo
  showFavorite?: boolean
  inFavorites?: boolean
}>()

const emit = defineEmits(['open-modal'])

const favoritesStore = useFavoritesStore()
const isHovered = ref(false)

const toggleFavorite = (e: Event) => {
  e.stopPropagation()
  e.preventDefault()
  favoritesStore.toggleFavorite(props.photo)
}

const handlePhotoClick = () => {
  emit('open-modal', props.photo)
}
</script>

<template>
  <div class="photo-card" @click="handlePhotoClick">
    <div 
      class="photo-container" 
      @mouseenter="isHovered = true" 
      @mouseleave="isHovered = false"
    >
      <img
        :src="photo.thumbnailUrl"
        :alt="photo.title"
        class="photo-thumbnail"
        :class="{ 'photo-zoomed': isHovered && !inFavorites }"
      />

      <div
        v-if="showFavorite"
        class="star-container"
        @click.stop="toggleFavorite"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <StarActiveComponent v-if="favoritesStore.isFavorite(photo.id)" />
        <StarEmptyComponent v-else />
      </div>

      <p 
        class="photo-title"
        :class="{
          'photo-title--hover': !inFavorites,
          'photo-title--static': inFavorites
        }"
      >
        {{ photo.title }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.photo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 150px;
}

.photo-container {
  position: relative;
  width: 150px;
  height: 150px;
}

.photo-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.2s;
}

.photo-zoomed {
  transform: scale(1.05);
}

.photo-title {
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.69);
  color: white;
  padding: 4px 8px;
  z-index: 1000;
  border-radius: 4px;
  margin: 0;
  font-size: 12px;
  line-height: 1.3;
  width: 100%;
  box-sizing: border-box;
  text-align: start;
  white-space: normal;
  word-wrap: break-word;
}

.photo-title--hover {
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.photo-title--static {
  position: static;
  color: #333;
  background: transparent;
  padding: 8px 0 0 0;
  text-align: center;
  margin-bottom: 42px;
}

.photo-container:hover .photo-title--hover {
  opacity: 1;
}

.star-container {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
