<template>
  <nav class="border-b-2 border-yn-night-sky py-2 px-6">
    <div class="flex items-center justify-between">
      <div>
        <nuxt-link to="/"
          class="text-yn-golden text-lg ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Home
        </nuxt-link>
        <nuxt-link to="/about"
          class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          about
        </nuxt-link>
      </div>
      <div v-if="!isLoggedIn">

        <nuxt-link to="/login"
          class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Login
        </nuxt-link>
        <nuxt-link to="/register"
          class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Register
        </nuxt-link>
      </div>

      <div v-else class="flex">
        <button
          class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded"
          @click="showModal = true">
          Logout
        </button>
        <nuxt-link to="/fanhangout/posts"
          class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Posts
        </nuxt-link>
        <nuxt-link to="/account"
          class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          account
        </nuxt-link>
      </div>
    </div>
  </nav>
  <Modal v-model="showModal">
    <p>Are you sure you want to sign out?</p>
    <div class="logContent">
      <ButtonsBaseButton @click="logoutUser()" :disabled="false">Yes</ButtonsBaseButton>
      <ButtonsBaseButton @click="showModal = false" :disabled="false">No</ButtonsBaseButton>
    </div>
  </Modal>
</template>
<script setup>
import { useUsersStore } from '@/stores/users'
import { computed } from 'vue'
import { signOut } from "firebase/auth";
const store = useUsersStore()
const isLoggedIn = computed(() => store.loggedIn === true)
const showModal = ref(false);
const nuxtApp = useNuxtApp();

async function logoutUser() {
  try {
    await signOut(nuxtApp.$auth);
    (store.user) = null; // Reset the user in the store
    nuxtApp.$router.push("/"); // Redirect to the login page
    showModal.value = false;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message to the console
    }
  }
}
</script>

<style scoped>
@media (max-width: 420px) {
  * {
    padding: 1px;
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

nav {
  background-color: #12263ab5;
}

.logContent {
  display: flex;
  gap: 10px;
}
</style>