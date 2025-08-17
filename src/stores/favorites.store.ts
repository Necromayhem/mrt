import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Photo } from '@/components/catalog/photos/types'

const LOCAL_STORAGE_KEY = 'favoritePhotos'

export const useFavoritesStore = defineStore('favorites', () => {
  const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY)
  const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : []
  const favorites = ref<Photo[]>(initialFavorites)

  function saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites.value))
  }

  function toggleFavorite(photo: Photo) {
    const index = favorites.value.findIndex((fav) => fav.id === photo.id)
    if (index === -1) {
      favorites.value.push(photo)
    } else {
      favorites.value.splice(index, 1)
    }
    saveToLocalStorage()
  }

  function isFavorite(photoId: number) {
    return favorites.value.some((fav) => fav.id === photoId)
  }

  watch(favorites, (newFavorites) => {
    saveToLocalStorage()
  }, { deep: true })

  return { favorites, toggleFavorite, isFavorite }
})