<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Albums } from '@/types/types';
import OpenAccordionComponent from '../UI/open-accordion.component.vue';
import CloseAccordionComponent from '../UI/close-accordion.component.vue';
import PhotosComponent from '../photos/photos.component.vue';

const props = defineProps<{
    userId: number;
}>();

const albums = ref<Albums | null>(null);
const expandedAlbumId = ref<number | null>(null);

async function fetchAlbums(userId: number): Promise<void> {
    try {
        const response = await fetch(`https://json.medrocket.ru/albums?userId=${userId}`)
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Albums = await response.json()
        albums.value = data
    } catch (err: unknown) {
        if(err instanceof Error){
            console.error('Failed to fetch albums:', err.message)
        } else {
            console.error('An unknown error occurred')
        }
    }
}

function toggleAlbum(albumId: number): void {
    if (expandedAlbumId.value === albumId) {
        expandedAlbumId.value = null;
    } else {
        expandedAlbumId.value = albumId;
    }
}

watch(() => props.userId, (newUserId) => {
    if (newUserId) {
        fetchAlbums(newUserId);
        expandedAlbumId.value = null;
    }
}, { immediate: true });
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
    gap: 24px;
    width: 100%;
    height: 60px;
    font-size: 18px;
    line-height: 1.3;
    font-weight: bold;
    cursor: pointer;
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