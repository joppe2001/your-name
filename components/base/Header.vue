<template>
  <nav class="border-b-2 border-yn-night-sky py-2 px-6 bg-yn-night-sky opacity-70">
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

        <button @click="showLoginModal = true"
          class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          Login
        </button>
        <nuxt-link to="/register"
          class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
          signUp
        </nuxt-link>
      </div>

      <div v-else class="flex">
        <button
          class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded"
          @click="showLogoutModal = true">
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
  <Modal v-model="showLogoutModal">
    <p>Are you sure you want to sign out?</p>
    <div class="logContent">
      <ButtonsBaseButton @click="logoutUser()" :disabled="false">Yes</ButtonsBaseButton>
      <ButtonsBaseButton @click="showLogoutModal = false" :disabled="false">No</ButtonsBaseButton>
    </div>
  </Modal>
  <Modal v-model="showLoginModal">
    <p>Log in</p>
    <div class="logContent-container">
      <div class="credentials">
        <input type="text" placeholder="email" v-model="creds.email">
        <input type="password" placeholder="password" v-model="creds.password">
      </div>
      <div class="buttons">
        <ButtonsBaseButton @click="loginUser()" :disabled="false">Login</ButtonsBaseButton>
        <ButtonsBaseButton @click="showLoginModal = false" :disabled="false">Cancel</ButtonsBaseButton>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { computed } from 'vue'
import { signOut, signInWithEmailAndPassword } from "firebase/auth";

const router = useRouter();
const store = useUsersStore()
const isLoggedIn = computed(() => store.loggedIn === true)
const showLogoutModal = ref(false);
const showLoginModal = ref(false);
const nuxtApp = useNuxtApp();
const creds = reactive({
  email: "",
  password: "",
});

async function logoutUser() {
  try {
    await signOut(nuxtApp.$auth);
    (store.user as any) = null; // Reset the user in the store
    router.push("/"); // Redirect to the login page
    showLogoutModal.value = false;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message to the console
    }
  }
}

const loginUser = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      nuxtApp.$auth,
      creds.email,
      creds.password
    );
    creds.email = "";
    creds.password = "";

    if (user) {
      showLoginModal.value = false;
      await router.push("/fanhangout/posts");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      // set error message to whatever comes after Firebase: Error (auth/ and before ).
      error = 'wrong password or email, try again'
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

.cedentials,
.buttons,
.logContent {
  display: flex;
  gap: 10px;
}

.credentials {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.credentials>input {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #000;
  padding: 5px;
  margin-top: 5px;
}
</style>