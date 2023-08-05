<template>
    <button @click="confirmLogout">sign out</button>
</template>
<script setup lang="ts">
import { Auth, signOut } from 'firebase/auth';
import { useUsersStore } from '@/stores/users';

const store = useUsersStore();
const nuxtApp = useNuxtApp();

async function logoutUser() {
    try {
        await signOut(nuxtApp.$auth as Auth);
        (store.user as any) = null; // Reset the user in the store
        nuxtApp.$router.push('/'); // Redirect to the login page
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);  // Log the error message to the console
        }
    }
}

const confirmLogout = () => { 
    if (window.confirm('Are you sure you want to sign out?')) {
        logoutUser();
    }
}
</script>

