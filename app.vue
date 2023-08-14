<template>
	<NuxtLayout id="app" class="flex min-h-screen flex-col"
		:style="`background: url(${backgroundImage}) no-repeat center fixed; background-size: cover;`">
		<baseHeader />
		<div class="flex-grow">
			<NuxtPage />
		</div>
		<baseFooter />
	</NuxtLayout>
</template>

<script setup>
import { computed } from "vue";
import { useSeo } from "./composables/useSeo";

useSeo()
const route = useRoute();

const backgroundImage = computed(() => {
	switch (route.fullPath) {
		case "/mitsuha":
			return "/images/mitsuha.webp";
		case "/mitsuha#more-detail":
			return "/images/mitsuha.webp";
		case "/taki#more-detail":
			return "/images/taki.webp";
		case "/taki" || "/characterGlowup/taki":
			return "/images/taki.webp";
		case "/characterGlowup/mitsuha":
			return "/images/mitsuha.webp";
		case "/characterGlowup/taki":
			return "/images/taki.webp";
		default:
			return "/images/alsoyes.webp";
	}
});
</script>
