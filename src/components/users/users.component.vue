<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Users } from '@/types/types';
import OpenAccordionComponent from '../UI/open-accordion.component.vue';
import CloseAccordionComponent from '../UI/close-accordion.component.vue';
import AlbumsComponent from '../albums/albums.component.vue';

const props = defineProps<{
  modelValue: number | null;
}>();

const emit = defineEmits(['update:modelValue']);

const users = ref<Users | null>(null);

async function fetchUsers(): Promise<void> {
    try {
        const response = await fetch('https://json.medrocket.ru/users/')
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Users = await response.json()
        users.value = data
    } catch (err: unknown) {
        if(err instanceof Error){
            console.error('Failed to fetch users:', err.message)
        } else {
            console.error('An unknown error occurred')
        }
    }
}

function toggleUser(userId: number): void {
    if (props.modelValue === userId) {
        emit('update:modelValue', null);
    } else {
        emit('update:modelValue', userId);
    }
}

fetchUsers();
</script>

<template>
    <div class="accordion">
        <div
            v-for="user in users"
            :key="user.id"
            class="user-section"
        >
            <div 
                class="accordion__user"
                :class="{'accordion__user--active': modelValue === user.id}"
                @click="toggleUser(user.id)"
            >
                <component 
                    :is="modelValue === user.id ? CloseAccordionComponent : OpenAccordionComponent" 
                    class="accordion__icon" 
                />
                {{ user.name }}
            </div>
            
            <transition name="slide">
                <div v-if="modelValue === user.id">
                    <AlbumsComponent :userId="user.id" />
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.accordion {
    height: 100%;
    scroll-behavior: smooth;
}

.accordion__user {
    display: flex;
    align-items: center;
    gap: 24px;
    width: 100%;
    max-width: 744px;
    height: 80px;
    font-size: 22px;
    line-height: 1.3;
    font-weight: bold;
    cursor: pointer;
}

.accordion__icon {
    cursor: pointer;
}

.slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
    max-height: 10000px;
}

.slide-enter-from, .slide-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
}
</style>