<template>
  <nav class="bg-yn-twilight border-b-2 border-yn-night-sky py-2 px-6 opacity-70">
    <div class="flex items-center justify-between">
      <nuxt-link to="/" class="text-yn-golden text-lg ml-6 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
        Home
      </nuxt-link>
      <div v-if="!isLoggedIn">
        <nuxt-link to="/login" class="text-yn-golden text-lg ml-6 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Login
        </nuxt-link>
        <nuxt-link to="/register" class="text-yn-golden text-lg ml-6 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Register
        </nuxt-link>
      </div>
      <div v-else>
        <nuxt-link to="/account" class="text-yn-golden text-lg ml-6 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          {{ store.user}}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>
<script setup>
 import { useUsersStore } from '@/stores/users'
// check if store.user is not empty string
const store = useUsersStore()
const isLoggedIn = computed(() => store.user !== '')
</script>
