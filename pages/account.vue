<!-- pages/AccountPage.vue -->
<template>
	<div class="container mx-auto px-4 py-10">
		<!-- Personal Data Container -->
		<div class="bg-white p-6 rounded-lg shadow-lg mb-6">
			<h2 class="text-xl font-semibold mb-4">Personal Data</h2>
			<!-- Example fields for personal data -->
			<p><strong>Name:</strong> {{displayName}}</p>
			<p><strong>Email:</strong> {{ email }}</p>
		</div>

		<!-- Social Data Container -->
		<div class="bg-white p-6 rounded-lg shadow-lg mb-6">
			<h2 class="text-xl font-semibold mb-4">Social Data</h2>
			<!-- Example fields for social data -->
			<p><strong>Likes: </strong>{{ totalLikes }}</p>
			<p><strong>Dislikes: </strong>{{ totalDislikes }}</p>
			<p><strong>Comments:</strong> 50</p>
			<p><strong>Follows:</strong> 230</p>
			<p><strong>Favourite Genres:</strong> [Placeholder here]</p>
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

const { $getTotalLikes, $getTotalDislikes } = useNuxtApp();


const email = ref("");
const displayName = ref("");
const uid = ref("");
const totalLikes = ref(0);
const totalDislikes = ref(0);

const auth = getAuth();
const isLoading = ref(true);

const sendPasswordReset = async (emailValue) => {
	await sendPasswordResetEmail(auth, emailValue);
	resetSent.value = true;
};

onMounted(() => {
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			displayName.value = user.displayName;
			email.value = user.email;
			uid.value = user.uid;

			// Fetch the total likes for this user
			totalLikes.value = await $getTotalLikes(uid.value);
			totalDislikes.value = await $getTotalDislikes(uid.value);
		}
	});
});

</script>

<style scoped></style>
  