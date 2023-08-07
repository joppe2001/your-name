<template>
	<div v-if="!loading">
		<div class="flex items-center justify-center p-4">
			<div class="max-w-4xl mx-auto">
				<h1
					class="text-2xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center font-extrabold text-yn-sunset"
				>
					Welcome to the world of "Your Name"
				</h1>

				<div class="">
					<div class="flex gap-6 mega-container">
						<div
							class="backdrop-blur-lg mitsuha p-4 sm:p-6 lg:p-8 border-4 border-yn-sunset rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 opacity-80 flex flex-col justify-between fade-in"
						>
							<div>
								<h2 class="text-yn-sunset text-xl sm:text-2xl mb-2 sm:mb-4">
									Mitsuha's Life in Itomori
								</h2>
								<p class="text-black text-sm sm:text-lg mb-4 sm:mb-8">
									Mitsuha is a high school girl living in the rural town of
									Itomori. She's tired of her everyday life and wishes for
									something more exciting to happen.
								</p>
							</div>
							<nuxt-link
								to="/mitsuha"
								class="flex items-center justify-center py-2 sm:py-3 bg-gradient-to-tr from-yn-sunset via-yn-sunset to-yn-sunset-light border-2 border-yn-night-sky text-sm sm:text-lg text-white rounded shadow-xl hover:border-yn-golden hover:shadow-none hover:-translate-y-[-2px] transition-all duration-200"
							>
								<span>more on Mitsuha</span>
							</nuxt-link>
						</div>

						<div
							class="backdrop-blur-lg taki p-4 sm:p-6 lg:p-8 border-4 border-yn-sunset rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 opacity-80 flex flex-col justify-between fade-in"
						>
							<div>
								<h2 class="text-yn-sunset text-xl sm:text-2xl mb-2 sm:mb-4">
									Taki's Life in Tokyo
								</h2>
								<p class="text-black text-sm sm:text-lg mb-4 sm:mb-8">
									Taki is a high school boy living in Tokyo. He is balancing his
									part-time job at an Italian restaurant and dreams of becoming
									an architect or an artist.
								</p>
							</div>
							<nuxt-link
								to="/taki"
								class="flex items-center justify-center py-2 sm:py-3 bg-gradient-to-tr from-yn-sunset via-yn-sunset to-yn-sunset-light border-2 border-yn-night-sky text-sm sm:text-lg text-white rounded shadow-xl hover:border-yn-golden hover:shadow-none hover:-translate-y-[-2px] transition-all duration-200"
							>
								<span>more on Taki</span>
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex items-center justify-center p-4">
			<div class="max-w-4xl mx-auto">
				<h2
					class="text-2xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center font-extrabold text-yn-sunset"
				>
					Most Liked Post
				</h2>
				<div class="highest-liked-post">
					<h1>{{ highestLikedPost.title }}</h1>
					<img
						:src="highestLikedPost.imageUrl"
						alt="Most liked post"
						class="mx-auto rounded shadow-lg"
					/>
					<div>
						<p class="text-black text-sm sm:text-lg mb-4 sm:mb-8">
							{{ highestLikedPost.content }}
						</p>
						<p>{{ highestLikedPost.likes }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<LoadingSpinner v-else />
</template>

<script setup>
	const { $getPosts } = useNuxtApp();

	const posts = ref([]);
	const likes = ref({});
	const highestLikedPost = ref({});
	const loading = ref(true);

	onMounted(async () => {
		posts.value = await $getPosts();
		// log the likes for each post
		posts.value.forEach((post) => {
			likes.value[post.id] = post.likes;
		});
		highestLikedPost.value = posts.value.reduce((a, b) =>
			likes.value[a.id] > likes.value[b.id] ? a : b
		);
		loading.value = false;
	});
</script>

<style scoped>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.fade-in {
		animation: fadeIn 0.6s ease-in forwards;
	}
	.backdrop-blur-lg:hover {
		transform: scale(1.05);
	}
	.backdrop-blur-lg,
	.fade-in {
		transition: all 0.3s ease;
	}
	.mitsuha:hover {
		background-color: #f2dcdc;
		box-shadow: #12263a;
	}

	.taki:hover {
		background-color: #b4d3ea;
		box-shadow: #b4d3ea;
	}
	body {
		cursor: none; /* Hide the default cursor */
	}

	.cursor {
		width: 30px; /* Adjust based on your preference */
		height: 30px;
		border-radius: 50%;
		position: fixed;
		transform: translate(-50%, -50%);
		pointer-events: none; /* Ensure the cursor doesn't block clickable elements */
		mix-blend-mode: difference; /* Invert colors using the difference blend mode */
		background: white;
		z-index: 9999;
	}

	@media (max-width: 640px) {
		.mega-container {
			flex-direction: column;
		}
		.mitsuha,
		.taki {
			width: 100%;
		}
	}
</style>
