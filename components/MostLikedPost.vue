<template>
	<div class="flex items-center justify-center p-4  mt-10 rounded">
		<div class="post__content backdrop-blur-md w-1/2 p-5 mx-auto text-center">
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
					loading="lazy" />
			</div>
			<div class="mb-4 sm:mb-8 mt-5 flex justify-center items-center">
				<p class="text-black text-sm sm:text-lg w-1/3 bg-yn-sunset p-1 rounded">
					likes: {{ highestLikedPost.likes }}
				</p>
			</div>
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

<style scoped>
.post__content {
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.5);
	backdrop-filter: blur(5px);
}

@media (max-width: 640px) {
	.post__content {
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(10px);
		width: 95%;
	}
}
</style>
  