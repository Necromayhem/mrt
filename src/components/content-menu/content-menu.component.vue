<script setup lang="ts">
import { ref } from 'vue';
import type { Users } from '@/types/types';
import OpenAccordionComponent from '../UI/open-accordion.component.vue';
import CloseAccordionComponent from '../UI/close-accordion.component.vue';


const users = ref<Users | null>(null);
const activeUser = ref<number | null>(null);
const expandedUsers = ref<Record<number, boolean>>({})


async function fetchUsers(): Promise<void>{
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
    expandedUsers.value = { [userId]: !expandedUsers.value[userId] };
}

fetchUsers()
</script>

<template>
    <div class="accordion">
        <div
        v-for="user in users"
        :key="user.id"
        class="accordion__user"
        :class="{'accordion__user--active' : activeUser === user.id }"
        >
            <component 
                :is="expandedUsers[user.id] ? CloseAccordionComponent : OpenAccordionComponent" 
                class="accordion__icon" 
                @click="toggleUser(user.id)"
            />
        {{ user.name }}
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
}

.accordion__icon {
    cursor: pointer;
}
</style>