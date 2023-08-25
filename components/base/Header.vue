<template>
  <nav class="border-b-2 border-yn-night-sky py-2 px-6 bg-yn-night-sky opacity-70 sticky top-0 nav"
    v-if="screenWidth > 700">
    <div class="flex items-center justify-between">
      <div class>
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
  <nav class="border-b-2 border-yn-night-sky py-2 px-6 bg-yn-night-sky opacity-70 sticky top-0 nav " v-else>
    <div class="flex items-center justify-end">
      <!-- Hamburger menu button -->
      <button @click="toggleMenu" class="p-2 focus:outline-none md:hidden hamburger" :class="{ 'is-active': menuOpen }">
        <div class="w-6 h-1 bg-yn-golden mb-1 bar bar1"></div>
        <div class="w-6 h-1 bg-yn-golden mb-1 bar bar2"></div>
        <div class="w-6 h-1 bg-yn-golden mb-1 bar bar3"></div>
      </button>

      <transition name="slide-fade">
        <div v-if="menuOpen && isMobile"
          class="absolute top-full right-0 w-auto bg-yn-night-sky shadow-md z-10 flex flex-col p-3 mobile-nav">
          <nuxt-link to="/" @click="menuOpen = false"
            class="text-yn-golden text-lg ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
            Home
          </nuxt-link>
          <nuxt-link to="/about" @click="menuOpen = false"
            class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
            about
          </nuxt-link>

          <div v-if="!isLoggedIn" class="menu-buttons">
            <button @click="showLoginModal = true, menuOpen = false"
              class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
              Login
            </button>
            <nuxt-link to="/register" @click="menuOpen = false"
              class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
              signUp
            </nuxt-link>
          </div>

          <div v-else class="menu-buttons">
            <button @click="showLogoutModal = true, menuOpen = false"
              class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
              Logout
            </button>
            <nuxt-link to="/fanhangout/posts" @click="menuOpen = false"
              class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
              Posts
            </nuxt-link>
            <nuxt-link to="/account" @click="menuOpen = false"
              class="text-yn-golden text-m ml-4 p-1 hover:text-yn-sunset hover:bg-yn-lavender transition-all duration-200 rounded">
              account
            </nuxt-link>
          </div>
        </div>
      </transition>
    </div>
  </nav>

  <Modal v-model="showLogoutModal">
    <p>Are you sure you want to sign out?</p>
    <div class="logConten" style="display: flex; gap: 10px;">
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
      <div class="buttons" style="display: flex; gap: 10px;">
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
const screenWidth = ref(0);
const lastScrollPosition = ref(0);
const navVisible = ref<boolean>(true);
const creds = reactive({
  email: "",
  password: "",
});

const menuOpen = ref(false);
const isMobile = screenWidth.value < 768
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

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

onMounted(() => {
  updateScreenWidth();
  onScreenResize();
})


const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
}

const onScreenResize = () => {
  window.addEventListener("resize", () => {
    updateScreenWidth();
  });
}

</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.slide-fade-enter-from, /* Starting state for enter */
.slide-fade-leave-to /* .slide-fade-leave-active in <2.6 */ {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-fade-enter-to, /* Ending state for enter */
.slide-fade-leave-from /* Starting state for leave */ {
  transform: translateY(0);
  opacity: 1;
}

.nav {
  z-index: 100;
  backdrop-filter: blur(10px);
}

@media (max-width: 420px) {
  * {
    padding: 1px;
  }
  .mobile-nav, .nav {
    padding: 10px;
  }
}

@media (max-width: 280px) {
  * {
    padding: 1px;
  }
}

.cedentials,
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
.mobile-nav {
  border-radius: 0 0 0 10px;
  z-index: -1;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.hamburger {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bar {
  height: 3px;
  transition: 0.3s;
}

/* Transformations when menu is open */
.is-active .bar1 {
  transform: rotate(-40deg) translateY(10px);
}

.is-active .bar2 {
  opacity: 0;
}

.is-active .bar3 {
  transform: rotate(40deg) translateY(-10px);
}
</style>