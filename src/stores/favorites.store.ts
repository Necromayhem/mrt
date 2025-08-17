import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Photo } from '@/components/catalog/photos/types'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Photo[]>([])

  function toggleFavorite(photo: Photo) {
    const index = favorites.value.findIndex((fav) => fav.id === photo.id)
    if (index === -1) {
      favorites.value.push(photo)
    } else {
      favorites.value.splice(index, 1)
    }
  }

  function isFavorite(photoId: number) {
    return favorites.value.some((fav) => fav.id === photoId)
  }

  return { favorites, toggleFavorite, isFavorite }
})
