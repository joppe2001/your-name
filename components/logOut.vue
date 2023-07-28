<template>
    <button @click="logoutUser">sign out</button>
</template>
<script setup lang="ts">
import { Auth, signOut } from 'firebase/auth';
import { useUsersStore } from '@/stores/users';

const store = useUsersStore();
const nuxtApp = useNuxtApp();

async function logoutUser() {
    try {
        await signOut(nuxtApp.$auth as Auth);
        store.user = null; // Reset the user in the store
        localStorage.removeItem('username'); // Remove the username from local storage
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);  // Log the error message to the console
        }
    }
}
</script>
