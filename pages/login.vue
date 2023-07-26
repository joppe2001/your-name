<template>
    <div class="flex items-center justify-center p-4 sm:p-11">
        <div class="max-w-xs sm:max-w-md lg:max-w-3xl">
            <h1 class="text-yn-deep-purple font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center">Login
            </h1>

            <div
                class="backdrop-blur-md p-4 sm:p-8 border-4 border-yn-blue rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200">
                <form @submit.prevent class="space-y-4">
                    <div>
                        <label for="email" class="text-yn-deep-purple text-sm sm:text-lg">Email</label>
                        <input v-model="creds.email" id="email" type="email"
                            class="w-full p-2 sm:p-3 rounded-md border-2 border-yn-golden focus:border-yn-blue outline-none"
                            required>
                    </div>
                    <div>
                        <label for="password" class="text-yn-deep-purple text-sm sm:text-lg">Password</label>
                        <input v-model="creds.password" id="password" type="password"
                            class="w-full p-2 sm:p-3 rounded-md border-2 border-yn-golden focus:border-yn-blue outline-none"
                            required>
                    </div>
                    <div class="w-100 flex justify-center">
                        <button @click="loginUser"
                            class="flex items-center justify-center w-1/6 sm:px-4 py-2 sm:py-2 bg-gradient-to-tr sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand hover:shadow-lg">
                            <span>Login</span>
                        </button>
                    </div>
                </form>
            </div>
            <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showModal = false"></div>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">
                                    Welcome
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        You have successfully logged in!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="showModal = false" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { Auth, signInWithEmailAndPassword } from 'firebase/auth'

const showModal = ref(false)

const creds = reactive({
    email: "",
    password: ""
})

const nuxtApp = useNuxtApp()
async function loginUser() {
    try {
        const { user } = await signInWithEmailAndPassword(
            nuxtApp.$auth as Auth,
            creds.email,
            creds.password
        )
        creds.email = ""
        creds.password = ""

        if (user) {
            await user.getIdToken(true); // This forces a token refresh
            if (user.displayName !== null) {
                localStorage.setItem('userName', user.displayName);
            }
            showModal.value = true
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);  // Log the error message to the console
        }
    }
}

</script>
  
