<template>
  <nav class="bg-yn-twilight border-b-2 border-yn-night-sky py-2 px-6 opacity-70">
    <div class="flex items-center justify-between">
      <nuxt-link to="/" class="text-yn-golden text-lg ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
        Home
      </nuxt-link>
      <div v-if="!isLoggedIn">
        <nuxt-link to="/login" class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Login
        </nuxt-link>
        <nuxt-link to="/register" class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Register
        </nuxt-link>
      </div>
      <div v-else>
        <LogOut class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded" />
        <nuxt-link to="/fanhangout/discussions" class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Posts
        </nuxt-link>
        <nuxt-link to="/account" class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          account
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>
<script setup>
 import { useUsersStore } from '@/stores/users'
 import {computed} from 'vue'
const store = useUsersStore()
const isLoggedIn = computed(() => store.loggedIn === true)
</script>

<style scoped>
@media (max-width: 390px) {
  * {
    padding: 2px;
  }
  div {
    font-size: 10px;
  }
}

@media (max-width: 280px) {
  * {
    padding: 1px;
  }
  div {
    font-size: 8px;
  }
}
</style>