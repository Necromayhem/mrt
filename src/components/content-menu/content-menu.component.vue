<script setup lang="ts">
import { ref } from 'vue';
import UsersComponent from '../users/users.component.vue';

const selectedUserId = ref<number | null>(null);
</script>

<template>
    <UsersComponent v-model="selectedUserId" />
</template>