<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="!isLoading" class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-2xl mx-auto rounded-xl shadow-md overflow-hidden">
                <div class=" px-6 py-4">
                    <div class="text-center">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                            Welcome, {{ user }}
                        </h3>
                        <div class="space-y-6">
                            <nuxt-link to="/change-username" class="flex items-center transition-all duration-300 justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yn-cherry-blossom hover:bg-yn-lavender">
                                Change Username
                            </nuxt-link>
                            <nuxt-link to="/change-password" class="flex items-center transition-all duration-300 justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yn-cherry-blossom hover:bg-yn-lavender">
                                Change Password
                            </nuxt-link>
                            <nuxt-link to="/reset-password" class="flex items-center transition-all duration-300 justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yn-cherry-blossom hover:bg-yn-lavender">
                                Reset Password
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="loadingSpinner">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
		>
			<g
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-width="2"
			>
				<path
					stroke-dasharray="2 4"
					stroke-dashoffset="6"
					d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
				>
					<animate
						attributeName="stroke-dashoffset"
						dur="0.6s"
						repeatCount="indefinite"
						values="6;0"
					/>
				</path>
				<path
					stroke-dasharray="30"
					stroke-dashoffset="30"
					d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
				>
					<animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						begin="0.1s"
						dur="0.3s"
						values="30;0"
					/>
				</path>
				<path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5">
					<animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						begin="0.5s"
						dur="0.2s"
						values="10;0"
					/>
				</path>
				<path
					stroke-dasharray="6"
					stroke-dashoffset="6"
					d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"
				>
					<animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						begin="0.7s"
						dur="0.2s"
						values="6;0"
					/>
				</path>
			</g>
		</svg>
	</div>
    </div>
</template>

<script setup>
    import { useUsersStore } from "@/stores/users";
    import { computed, onMounted } from "vue";

    const store = useUsersStore();
    const user = computed(() => store.user);
    const isLoading = ref(true);

    onMounted(() => {
        setTimeout(() => {
            isLoading.value = false;
        }, 800);
    });
</script>

<style scoped>
    .loadingSpinner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .loadingSpinner svg {
        width: 50px;
        height: 50px;
    }

</style>
