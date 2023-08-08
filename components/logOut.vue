<template>
	<div class="logout">
		<button @click="showModal = true">sign out</button>
		<Modal v-model="showModal">
			<p>Are you sure you want to sign out?</p>
			<div class="logContent">
				<ButtonsBaseButton @click="logoutUser()" :disabled="false"
					>Yes</ButtonsBaseButton
				>
				<ButtonsBaseButton @click="showModal = false" :disabled="false"
					>No</ButtonsBaseButton
				>
			</div>
		</Modal>
	</div>
</template>
<script setup lang="ts">
	import { Auth, signOut } from "firebase/auth";
	import { useUsersStore } from "@/stores/users";

	const store = useUsersStore();
	const nuxtApp = useNuxtApp();
	const showModal = ref(false);

	async function logoutUser() {
		try {
			await signOut(nuxtApp.$auth as Auth);
			(store.user as any) = null; // Reset the user in the store
			nuxtApp.$router.push("/"); // Redirect to the login page
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message); // Log the error message to the console
			}
		}
	}
</script>

<style scoped>

.logout {
    display: flex;
}
.logContent {
    display: flex;
    gap: 10px;
}

</style>

