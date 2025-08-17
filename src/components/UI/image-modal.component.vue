<script setup lang="ts">
import type { Photo } from '@/components/catalog/photos/types'
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  photo: Photo | null
}>()

const emit = defineEmits(['close'])

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <teleport to="body">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal-content">
        <img :src="photo?.url" :alt="photo?.title" class="enlarged-image" @click="emit('close')" />
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}

.modal-content {
  width: 600px;
  height: 600px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: zoomIn 0.3s ease-out;
  cursor: pointer;
}

.enlarged-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}

@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
