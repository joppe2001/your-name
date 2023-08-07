<template>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			v-if="!isLoading"
			class="flex items-center justify-center min-h-screen"
		>
			<div
				class="w-full max-w-2xl mx-auto rounded-xl shadow-md overflow-hidden"
			>
				<div class="px-6 py-4">
					<div class="text-center">
						<h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
							Welcome, {{ displayName }}
						</h3>
						<div class="space-y-6">
							<button
								class="reset-password-btn"
								@click="sendPasswordReset(email)"
							>
								reset password
							</button>

							<div class="modal-overlay" v-if="resetSent">
								<div class="modal">
									<span class="modal-close" @click="resetSent = false"
										>&times;</span
									>
									Email successfully sent
								</div>
							</div>
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
	import { onMounted } from "vue";
	import {
		getAuth,
		sendPasswordResetEmail,
		onAuthStateChanged,
	} from "firebase/auth";

	const { $getPosts, $getLikedPosts, $getDislikedPosts } = useNuxtApp();

	const posts = ref([]);
	const likedPosts = ref([]);
	const dislikedPosts = ref([]);

	const email = ref("");
	const displayName = ref("");
	const uid = ref("");
	const resetSent = ref(false);

	const auth = getAuth();
	const isLoading = ref(true);

	const sendPasswordReset = async (emailValue) => {
		await sendPasswordResetEmail(auth, emailValue);
		resetSent.value = true;
	};

	onMounted( async () => {
		posts.value = await $getPosts();
		likedPosts.value = await $getLikedPosts();
		dislikedPosts.value = await $getDislikedPosts();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				displayName.value = user.displayName;
				email.value = user.email;
				uid.value = user.uid;
			}
			isLoading.value = false; // Set loading to false after determining auth state
		});
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

	.reset-password-btn {
		background-color: #ecc7ec; /* Green background */
		border: none; /* No border */
		color: white; /* White text color */
		padding: 10px 24px; /* Some padding */
		text-align: center; /* Centered text */
		text-decoration: none; /* No underline */
		display: inline-block; /* Make it an inline block element */
		font-size: 16px; /* Font size */
		margin: 4px 2px; /* Some margin */
		cursor: pointer; /* Pointer cursor on hover */
		border-radius: 12px; /* Rounded corners */
		transition: background-color 0.3s, transform 0.3s; /* Smooth transition for background color and transform properties */
	}

	/* Hover effect */
	.reset-password-btn:hover {
		background-color: #eeb3b3; /* Darker green on hover */
		transform: scale(1.05); /* Slightly scale the button up */
	}

	/* Active effect (button pressed) */
	.reset-password-btn:active {
		background-color: #388e3c; /* Even darker green */
		transform: scale(1); /* Scale the button back to normal size */
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(
			0,
			0,
			0,
			0.5
		); /* semi-transparent black background */
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.modal {
		background-color: #fff;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		position: relative;
		width: 20%; /* Adjust as needed */
	}

	.modal-close {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
		font-size: 24px;
		border: none;
		background: none;
	}
</style>
