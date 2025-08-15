<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchAlbums } from './api'
import type { Albums } from './types'
import OpenAccordionComponent from '../UI/open-accordion.component.vue'
import CloseAccordionComponent from '../UI/close-accordion.component.vue'
import PhotosComponent from '../photos/photos.component.vue'

const props = defineProps<{
  userId: number
}>()

const albums = ref<Albums | null>(null)
const expandedAlbumId = ref<number | null>(null)

watch(() => props.userId, (newUserId) => {
  if (newUserId) {
    fetchAlbums(newUserId).then(data => albums.value = data).catch(() => {})
    expandedAlbumId.value = null
  }
}, { immediate: true })

function toggleAlbum(albumId: number): void {
  expandedAlbumId.value = expandedAlbumId.value === albumId ? null : albumId
}
</script>

<template>
    <div class="albums-container">
        <div
            v-for="album in albums"
            :key="album.id"
            class="album-section"
        >
            <div 
                class="accordion__album"
                :class="{'accordion__album--active': expandedAlbumId === album.id}"
                @click="toggleAlbum(album.id)"
            >
                <component 
                    :is="expandedAlbumId === album.id ? CloseAccordionComponent : OpenAccordionComponent" 
                    class="accordion__icon" 
                />
                {{ album.title }}
            </div>
            
            <transition name="slide">
                <div v-if="expandedAlbumId === album.id">
                    <PhotosComponent :albumId="album.id" />
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.accordion__album {
    display: flex;
    align-items: center;
    padding-left: 56px;
    gap: 24px;
    width: 100%;
    height: 60px;
    font-size: 18px;
    line-height: 1.3;
    cursor: pointer;
    user-select: none;
}

.slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
    max-height: 1000px;
}

.slide-enter-from, .slide-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
}
</style>