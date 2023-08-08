<template>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div v-if="!isLoading" class="flex items-center justify-center min-h-screen">
			<div class="w-full max-w-2xl mx-auto rounded-xl shadow-md overflow-hidden">
				<div class="px-6 py-4">
					<div class="text-center">
						<h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
							Account Details
						</h3>
						<div class="space-y-6 h-50 flex-column justify-center items-center items-display backdrop-blur-sm">
							<p class="text-md text-gray-700 backdrop-blur-smrounded">Username: <br/>{{ displayName }}</p>
							<p class="text-md text-gray-700 backdrop-blur-sm rounded">Email: <br/> {{ email }}</p>
							<p class="text-md text-gray-700 backdrop-blur-sm rounded">User ID:<br/> {{ uid }}</p>

							<ButtonsBaseButton @click="sendPasswordReset(email)">
								Reset Password
							</ButtonsBaseButton>

							<ButtonsBaseButton @click="logout">
								Logout
							</ButtonsBaseButton>

							<div class="modal" v-if="resetSent" @click="handleClickOutside">
								<div class="modal-content">
									<span class="modal-close" @click="resetSent = false">&times;</span>
									Password reset email successfully sent
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<LoadingSpinner v-else />
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
	const router = useRouter();

	const auth = getAuth();
	const isLoading = ref(true);

	const sendPasswordReset = async (emailValue) => {
		await sendPasswordResetEmail(auth, emailValue);
		resetSent.value = true;
	};

	const logout = async () => {
		await auth.signOut();
		// Redirect to home page
		await router.push("/");
	};

	const closeModal = () => {
		resetSent.value = false;
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

	const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
};

const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscapeKey);
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

	.account-action-btn {
		background-color: #ecc7ec;
		border: none;
		color: white;
		padding: 10px 24px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
		border-radius: 12px;
		transition: background-color 0.3s, transform 0.3s;
	}

	.account-action-btn:hover {
		background-color: #eeb3b3;
		transform: scale(1.05);
	}

	.account-action-btn:active {
		background-color: #388e3c;
		transform: scale(1);
	}

	.items-display {
		display: flex;
    flex-direction: column;
	}

	.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 1;
}

.modal-content {
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
    padding: 40px;
    border-radius: 5px;
    position: relative;
    width: 90%;
}

@media (min-width: 768px) {
    .modal-content {
        width: 30%;
    }
}

.close-button {
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
	font-size: 22px;
}
</style>
