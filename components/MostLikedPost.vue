<template>
	<div class="flex items-center justify-center p-4 mt-10 rounded">
		<div class="post__content backdrop-blur-md w-1/2 p-5 mx-auto text-center">
			<button @click="showModal = true">
				<p style="font-size: 0.875rem">( click to see more )</p>
				<h2 class="text-2xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 font-extrabold text-yn-sunset">
					Most Liked Post
				</h2>
				<div class="post__text text-center">
					<h1 class="post__title text-yn-night-sky text-2xl sm:text-3xl mb-4">
						{{ highestLikedPost.title }}
					</h1>
					<p class="post__description text-yn-night-sky text-sm sm:text-lg mb-4 sm:mb-8">
						{{ highestLikedPost.content }}
					</p>
				</div>
				<div class="post__image">
					<img :src="highestLikedPost.imageUrl" alt="Most liked post" class="mx-auto rounded shadow-lg"
						loading="lazy" preload />
				</div>
				<div class="mb-4 sm:mb-8 mt-5 flex justify-center items-center">
					<p class="text-black text-sm sm:text-lg w-1/3 bg-yn-sunset p-1 rounded">
						likes: {{ highestLikedPost.likes }}
					</p>
				</div>
			</button>
		</div>
		<transition name="fade">
			<Modal v-model="showModal">
				<p v-if="auth.currentUser">{{ messageForLoggedIn }}</p>
				<p v-else>{{ messageForGuest }}</p>
				<div class="button-container">
					<ButtonsBaseButton v-if="auth.currentUser" @click="goToAllPosts" :disabled="false">Go to All Posts
					</ButtonsBaseButton>
					<ButtonsBaseButton v-if="auth.currentUser" @click="closeModal" :disabled="false">cancel
					</ButtonsBaseButton>
					<ButtonsBaseButton v-if="!auth.currentUser" @click="goToSignup" :disabled="false">Sign Up
					</ButtonsBaseButton>
					<ButtonsBaseButton v-if="!auth.currentUser" @click="showLoginModal = true; showModal = false" :disabled="false">Login
					</ButtonsBaseButton>
				</div>
			</Modal>
		</transition>
	</div>
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
<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const { $getPosts } = useNuxtApp();
const auth = getAuth();
const posts = ref([]);
const nuxtApp = useNuxtApp();
const highestLikedPost = ref({});
const router = useRouter();
const showLoginModal = ref(false);
const showModal = ref(false);
const messageForLoggedIn = "Do you want to go to all posts?";
const messageForGuest = "Would you like to make an account / sign up?";
const goToSignup = () => {
	router.push("/register");
};
const goToAllPosts = () => {
	router.push("/fanhangout/posts");
};
const creds = reactive({
	email: "",
	password: "",
});

const closeModal = () => {
	showModal.value = false;
};

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
	} catch (error) {
		if (error instanceof Error) {
			// set error message to whatever comes after Firebase: Error (auth/ and before ).
			error = 'wrong password or email, try again'
		}
	}
}


onMounted(async () => {
	posts.value = await $getPosts();
	highestLikedPost.value = posts.value.reduce((a, b) =>
		a.likes > b.likes ? a : b
	);
});
</script>
<style scoped>
.post__content {
	width: 30%;
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.5);
	backdrop-filter: blur(5px);
	transition: all 0.3s ease-in-out;
}

@media (max-width: 900px) {
	.post__content {
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(10px);
		width: 95%;
	}
}

.post__content:hover {
	background-color: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(10px);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.button-container {
	display: flex;
	gap: 10px;
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
