<template>
	<div class="flex items-center justify-center p-4">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-2xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 font-extrabold text-yn-sunset">
				Most Liked Post
			</h2>
			<h1>{{ highestLikedPost.title }}</h1>
			<img :src="highestLikedPost.imageUrl" alt="Most liked post" class="mx-auto rounded shadow-lg" />
			<p class="text-black text-sm sm:text-lg mb-4 sm:mb-8">
				{{ highestLikedPost.content }}
			</p>
			<p>{{ highestLikedPost.likes }}</p>
		</div>
	</div>
</template>

<script setup>
const { $getPosts } = useNuxtApp();

const posts = ref([]);
const highestLikedPost = ref({});

onMounted(async () => {
    posts.value = await $getPosts();
    highestLikedPost.value = posts.value.reduce((a, b) => a.likes > b.likes ? a : b);
});

</script>
