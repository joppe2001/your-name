<!-- account page for the user ( if they are logged in ofcourse ) -->
<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold">Account</h1>
        <p class="text-xl">Welcome, {{ user }}</p>
    </div>
</template>

<script setup>
import { useUsersStore } from '@/stores/users'
import { computed } from 'vue'

const store = useUsersStore()
const user = computed(() => store.user)
const middleWare = ({ store, redirect }) => {
    if (!store.state.users.loggedIn) {
        return redirect('/login')
    }
}
</script>