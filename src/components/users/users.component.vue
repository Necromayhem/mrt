<script setup lang="ts">
import { ref } from 'vue'
import { fetchUsers } from './api'
import type { Users } from './types'
import OpenAccordionComponent from '../UI/open-accordion.component.vue'
import CloseAccordionComponent from '../UI/close-accordion.component.vue'
import AlbumsComponent from '../albums/albums.component.vue'

const props = defineProps<{
  modelValue: number | null
}>()

const emit = defineEmits(['update:modelValue'])
const users = ref<Users | null>(null)

fetchUsers().then(data => users.value = data).catch(() => {})

function toggleUser(userId: number): void {
  emit('update:modelValue', props.modelValue === userId ? null : userId)
}
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
    user-select: none;
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