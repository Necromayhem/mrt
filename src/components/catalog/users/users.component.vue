<script setup lang="ts">
import { ref } from 'vue'
import { fetchUsers } from './api'
import type { Users } from './types'
import AlbumsComponent from '../albums/albums.component.vue'
import CloseAccordionComponent from '@/components/UI/close-accordion.component.vue'
import OpenAccordionComponent from '@/components/UI/open-accordion.component.vue'
import LoaderComponent from '@/components/UI/loader.component.vue'
import ErrorNotificationComponent from '@/components/UI/error-notification.component.vue'

const props = defineProps<{
  modelValue: number | null
}>()

const emit = defineEmits(['update:modelValue'])
const users = ref<Users | null>(null)
const isLoading = ref(true)
const hasError = ref(false)

fetchUsers()
  .then((data) => {
    users.value = data
  })
  .catch(() => {
    hasError.value = true
  })
  .finally(() => {
    isLoading.value = false
  })

function toggleUser(userId: number): void {
  emit('update:modelValue', props.modelValue === userId ? null : userId)
}
</script>

<template>
  <div class="accordion">
    <LoaderComponent v-if="isLoading" height="888px" />
    <ErrorNotificationComponent v-else-if="hasError" />

    <template v-else>
      <div v-for="user in users" :key="user.id" class="user-section">
        <div
          class="accordion__user"
          :class="{ 'accordion__user--active': modelValue === user.id }"
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
    </template>
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 10000px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
</style>
