<template>
  <div class="flex items-center justify-center p-4 sm:p-11">
    <div class="max-w-xs sm:max-w-md lg:max-w-3xl">
      <h1 class="text-yn-deep-purple font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center">Register
      </h1>

      <div
        class="backdrop-blur-md p-4 sm:p-8 border-4 border-yn-blue rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200">
        <form @submit.prevent="registerUser" class="space-y-4">
          <div>
            <label for="username" class="text-yn-deep-purple text-sm sm:text-lg">Username</label>
            <input v-model="creds.userName" id="username" type="text"
              class="w-full p-2 sm:p-3 rounded-md border-2 border-yn-golden focus:border-yn-blue outline-none" required>
          </div>
          <div>
            <label for="email" class="text-yn-deep-purple text-sm sm:text-lg">Email</label>
            <input v-model="creds.email" id="email" type="email"
              class="w-full p-2 sm:p-3 rounded-md border-2 border-yn-golden focus:border-yn-blue outline-none" required>
          </div>
          <div>
            <label for="password" class="text-yn-deep-purple text-sm sm:text-lg">Password</label>
            <input v-model="creds.password" id="password" type="password"
              class="w-full p-2 sm:p-3 rounded-md border-2 border-yn-golden focus:border-yn-blue outline-none" required>
          </div>
          <div>
            <label for="passwordConfirm" class="text-yn-deep-purple text-sm sm:text-lg">Confirm Password</label>
            <input v-model="creds.passwordConfirm" id="passwordConfirm" type="password"
              class="w-full p-2 sm:p-3 rounded-md border-2 border-yn-golden focus:border-yn-blue outline-none" required>
          </div>
          <span v-if="!passMatch">passwords do not match</span>
          <div class="w-100 flex justify-center">
            <button type="submit"
              class="flex items-center justify-center w-1/6 sm:px-4 py-2 sm:py-2 bg-gradient-to-tr sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand hover:shadow-lg">
              <span>Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Registration Success Modal -->
    <teleport to="body">
      <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true" @click.self="closeModal">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Registration Successful!
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your account has been created!
                </p>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" @click="closeModal"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { Auth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

// add username to the account

const creds = reactive({
  email: "",
  password: "",
  userName: "",
  passwordConfirm: "",
})
let passMatch = computed(() => creds.password === creds.passwordConfirm)
const showModal = ref(false)
const nuxtApp = useNuxtApp()
async function registerUser() {
  try {
    if (creds.password !== creds.passwordConfirm) {
      throw new Error("Passwords do not match.")
    }
    const { user } = await createUserWithEmailAndPassword(
      nuxtApp.$auth as Auth,
      creds.email,
      creds.password
    )
    // Make sure to handle if user is null
    if (user) {
      await updateProfile(user, { displayName: creds.userName });
      // No need to call user.reload() here, it's handled automatically.
    }
    creds.userName = ""
    creds.email = ""
    creds.password = ""
    creds.passwordConfirm = ""
    showModal.value = true
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

function closeModal() {
  showModal.value = false
}
</script>
