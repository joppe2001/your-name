<template>
	<div v-show="!loading" class="flex-column items-center justify-center p-4">
		<div class="max-w-4xl mx-auto text-center">
			<h1 class="text-2xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 font-extrabold text-yn-sunset">
				Welcome to the world of "Your Name"
			</h1>

			<div class="flex gap-6 flex-col sm:flex-row">
				<!-- Mitsuha Section -->
				<div class="backdrop-blur-lg mitsuha p-4 sm:p-6 lg:p-8 border-4 border-yn-sunset rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 opacity-80 flex flex-col justify-between fade-in">
					<div>
						<h2 class="text-yn-sunset text-xl sm:text-2xl mb-2 sm:mb-4">Mitsuha's Life in Itomori</h2>
						<p class="text-black text-sm sm:text-lg mb-4 sm:mb-8">Mitsuha is a high school girl living in the rural town of Itomori. She's tired of her everyday life and wishes for something more exciting to happen.</p>
					</div>
					<nuxt-link to="/mitsuha" class="flex items-center justify-center py-2 sm:py-3 bg-gradient-to-tr from-yn-sunset via-yn-sunset to-yn-sunset-light border-2 border-yn-night-sky text-sm sm:text-lg text-white rounded shadow-xl hover:border-yn-golden hover:shadow-none hover:-translate-y-[-2px] transition-all duration-200">more on Mitsuha</nuxt-link>
				</div>

				<!-- Taki Section -->
				<div class="backdrop-blur-lg taki p-4 sm:p-6 lg:p-8 border-4 border-yn-sunset rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 opacity-80 flex flex-col justify-between fade-in">
					<div>
						<h2 class="text-yn-sunset text-xl sm:text-2xl mb-2 sm:mb-4">Taki's Life in Tokyo</h2>
						<p class="text-black text-sm sm:text-lg mb-4 sm:mb-8">Taki is a high school boy living in Tokyo. He is balancing his part-time job at an Italian restaurant and dreams of becoming an architect or an artist.</p>
					</div>
					<nuxt-link to="/taki" class="flex items-center justify-center py-2 sm:py-3 bg-gradient-to-tr from-yn-sunset via-yn-sunset to-yn-sunset-light border-2 border-yn-night-sky text-sm sm:text-lg text-white rounded shadow-xl hover:border-yn-golden hover:shadow-none hover:-translate-y-[-2px] transition-all duration-200">more on Taki</nuxt-link>
				</div>
			</div>
		</div>
		<MostLikedPost :post="highestLikedPost" />
	</div>
	<LoadingSpinner v-show="loading" />
</template>

<script setup>
	const { $getPosts } = useNuxtApp();

	const posts = ref([]);
	const loading = ref(true);
	const highestLikedPost = ref({})

	const prefetchImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
    });
};

	onMounted(async () => {
		posts.value = await $getPosts();
		loading.value = false;
		if (highestLikedPost.value.imageUrl) {
        await prefetchImage(highestLikedPost.value.imageUrl);
    }
	});
</script>

<style scoped>
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.fade-in { animation: fadeIn 0.6s ease-in forwards; }
	.backdrop-blur-lg:hover { transform: scale(1.05); }
	.backdrop-blur-lg, .fade-in { transition: all 0.3s ease; }
	.mitsuha:hover { background-color: #f2dcdc; box-shadow: #12263a; }
	.taki:hover { background-color: #b4d3ea; box-shadow: #b4d3ea; }
</style>
