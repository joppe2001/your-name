<template>
	<div class="flex flex-col p-4" v-if="!isLoading">
		<form @submit.prevent="submitForm"
			class="form flex flex-col w-1/2 mx-auto mb-8 p-4 sm:p-8 border-4 rounded-xl shadow-2xl hover:shadow-2xl transition-all duration-200 backdrop-blur-sm">
			<input type="text" name="title" v-model="postInfo.title" placeholder="title"
				class="content p-2 mb-4 border rounded placeholder-yn-night-sky focus:outline-none focus:border-yn-golden transition duration-500 ease-in-out" />
			<textarea name="content" v-model="postInfo.content" placeholder="content"
				class="content p-2 mb-4 border rounded placeholder-yn-night-sky h-30 focus:outline-none focus transition duration-500 ease-in-out"></textarea>
			<input type="file" name="image" @change="handleImageUpload" accept="image/*"
				class="content p-2 mb-4 border rounded placeholder-yn-night-sky focus:outline-none focus:border-yn-golden transition duration-500 ease-in-out" />
			<div class="button-container">
				<ButtonsBaseButton class="share-button">share post</ButtonsBaseButton>
			</div>
		</form>
		<div class="flex-grow w-full main">
			<div v-for="post in posts" :key="post.id" id="post"
			
			class="post main-container p-4 sm:p-8 border-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-lg mb-4 max-w-3/4 sm:max-w-3/4 lg:max-w-3/4 flex flex-col items-center justify-center">
			<ButtonsBaseButton @click="navigateToUserProfile(post.id)"
						class="profile-button"
						>
						<p>{{ userNames.get(post.userId)[0] }}</p>
					</ButtonsBaseButton>
				<div class="post__content w-9/10 p-2">
					<div class="post__text text-center">
						<h1 class="post__title text-yn-night-sky text-2xl sm:text-3xl mb-4">
							{{ post.title + " by " + userNames.get(post.userId) }}
						</h1>
						<p class="post__description text-yn-night-sky text-sm sm:text-lg mb-4 sm:mb-8">
							{{ post.content }}
						</p>
					</div>
					<div class="post__image">
						<img :src="post.imageUrl" class="rounded image" loading="lazy" alt="img" />
					</div>
				</div>
				<div class="buttons">
					<button @click="likePostHandler(post.id, userId)">
						<div class="like-button" style="position: relative; display: inline-block">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
								<path fill="currentColor"
									d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29c2.64-1.8 5.9-.96 7.66 1.1c1.76-2.06 5.02-2.91 7.66-1.1c1.41.96 2.28 2.59 2.34 4.29c.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"
									style="color: rgb(130, 130, 130)" :style="{
										fill: likedPostsIds.includes(post.id) ? 'red' : '',
									}" />
							</svg>
							<span style="
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
									transition: 0.3s ease-out;
									font-weight: 700;
								">{{ post.likes }}</span>
						</div>
					</button>
					<button @click="dislikePostHandler(post.id, userId)">
						<div class="dislike-button" style="position: relative; display: inline-block"
							:class="post.status === 'already_liked' ? 'liked' : ''">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
								<path fill="currentColor"
									d="m2.808 1.394l18.384 18.384l-1.414 1.415l-3.746-3.747L12 21.486l-8.478-8.493a6 6 0 0 1 .033-8.023L1.394 2.808l1.414-1.414Zm17.435 3.364a6 6 0 0 1 .236 8.235l-1.635 1.636L7.26 3.046a5.99 5.99 0 0 1 4.741 1.483a5.998 5.998 0 0 1 8.242.229Z"
									style="color: rgb(130, 130, 130)" :style="{
										fill: dislikedPostsIds.includes(post.id) ? '#89cff0' : '',
									}" />
							</svg>
							<span style="
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
									transition: 0.3s ease-out;
									font-weight: 700;
								">{{ post.dislikes }}</span>
						</div>
					</button>
				</div>
				<div class="error-message">
					<div v-if="post.status === 'already_liked' ||
						post.status === 'already_disliked'
						" class="text-red-500">
						already {{ post.lastAction }}.
					</div>
				</div>
				<div class="post__comments w-full p-2">
					<div class="comments__view">
						<div class="flex-column comments__input">
							<div class="flex items-center justify-center comment-group">
								<form @submit.prevent="submitComment(post.id)" class="comments__form">
									<input type="text" name="comment" v-model="post.comment" placeholder="Add a comment..."
										class="comments__input flex-grow p-1 mr-1 border rounded placeholder-gray-700 text-gray-700" />
									<div class="wrapper">
										<ButtonsBaseButton class="comments__toggle" height="34px" padding="3px"
											margin="0 0 0 4px">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
												viewBox="0 0 24 24">
												<path fill="currentColor"
													d="M12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20Zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20Zm3-9h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z" />
											</svg>
										</ButtonsBaseButton>
									</div>
								</form>
							</div>
						</div>
						<div class="comments__display transition-all duration-300 mt-4 overflow-auto text-gray-700"
							:class="{ 'scrollable-comments': post.comments.length > 5 }" v-if="post.comments.length">
							<div v-for="comment in post.comments" :key="comment.id"
								class="comment comments__background commnet backdrop-blur" style="word-wrap: break-word">
								<p class="text-black">
									<strong>{{
										"" + userNames.get(comment.userId) + ": "
									}}</strong>{{ comment.comment }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fixed z-10 pt-24 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40" v-if="success">
			<div class="bg-white m-auto p-5 border border-gray-500 w-4/5">
				<button class="float-right" @click="success = false">&times;</button>
				<p>Post successfully added!</p>
			</div>
		</div>
	</div>
	<LoadingSpinner v-else />
</template>
<script setup>
import { onMounted } from "vue";
import { getAuth } from "firebase/auth";
import debounce from "lodash.debounce";
const {
	$addPost,
	$getPosts,
	$addComment,
	$likePost,
	$dislikePost,
	$getLikedPosts,
	$getDislikedPosts,
	$getDisplayName,
	$getUserNameFromPost,
	$uploadImage,
} = useNuxtApp();
const userNames = ref(new Map());
const auth = getAuth();
const isLoading = ref(true);
const success = ref(false);
const posts = ref([]);
const userId = ref(null);
const likedPostsIds = ref([]);
const dislikedPostsIds = ref([]);
const getLikedPosts = $getLikedPosts;
const getDislikedPosts = $getDislikedPosts;
const getDisplayName = $getDisplayName;
const getUserNameFromPost = $getUserNameFromPost;
const uploadImage = $uploadImage;
const selectedFile = ref(null);
const router = useRouter();
const postInfo = ref({
	title: "",
	content: "",
	image: "",
	comments: [],
	likes: 0,
	dislikes: 0,
});

const getUserid = () => {
	return auth.currentUser ? auth.currentUser.uid : null;
};

const navigateToUserProfile = async (postId) => {
	const userDisplayName = await getUserNameFromPost(postId);
	// Assuming you want to use the display name as a parameter in the route
	router.push(`/user/${userDisplayName}`);
};

const likePostHandler = debounce(async (postId, userId) => {
	const result = await $likePost(postId, userId);
	const post = posts.value.find((post) => post.id === postId);
	likedPostsIds.value = await getLikedPosts();
	if (result.status === "undisliked") {
		dislikedPostsIds.value = dislikedPostsIds.value.filter(
			(id) => id !== postId
		);
	}

	post.lastAction = "liked";
	if (post) {
		if (result.status === "success") {
			post.likes += 1;
		} else if (result.status === "undisliked") {
			post.likes += 1;
			post.dislikes -= 1;
		}
		posts.value = posts.value.map((p) =>
			p.id === postId ? { ...p, status: result.status } : p
		);
	}
}, 200);

const dislikePostHandler = debounce(async (postId, userId) => {
	const result = await $dislikePost(postId, userId);
	const post = posts.value.find((post) => post.id === postId);
	dislikedPostsIds.value = await getDislikedPosts();
	if (result.status === "unliked") {
		likedPostsIds.value = likedPostsIds.value.filter((id) => id !== postId);
	}
	post.lastAction = "disliked";
	if (post) {
		if (result.status === "success") {
			post.dislikes += 1;
		} else if (result.status === "unliked") {
			post.dislikes += 1;
			post.likes -= 1;
		}
		posts.value = posts.value.map((p) =>
			p.id === postId ? { ...p, status: result.status } : p
		);
	}
}, 200);

watchEffect(async () => {
	try {
		for (let post of posts.value) {
			if (!userNames.value.has(post.userId)) {
				const displayName = await getDisplayName(post.userId);
				userNames.value.set(post.userId, displayName);
			}
			for (let comment of post.comments) {
				if (!userNames.value.has(comment.userId)) {
					const displayName = await getDisplayName(comment.userId);
					userNames.value.set(comment.userId, displayName);
				}
			}
		}
	} catch (error) {
		console.error("Error fetching display names:", error);
	}
});

const submitForm = async () => {
	if (selectedFile.value) {
		try {
			const url = await uploadImage(selectedFile.value);
			postInfo.value.image = url;
			selectedFile.value = null;  // Reset after upload
		} catch (error) {
			console.error("Error uploading the image:", error);
			return;  // Stop the function if there's an error
		}
	}

	if (
		(postInfo.value.title && postInfo.value.content) ||
		postInfo.value.image
	) {
		const userid = getUserid();
		await $addPost(
			postInfo.value.title,
			postInfo.value.content,
			postInfo.value.image,
			userid,
			postInfo.likes,
			postInfo.dislikes
		);
		success.value = true;
		postInfo.value.title = "";
		postInfo.value.content = "";
		postInfo.value.image = "";
		posts.value = await $getPosts();
	} else {
		alert("Please fill in all fields");
	}
}


async function submitComment(postId) {
	for (let post of posts.value) {
		if (post.id === postId) {
			if (post.comment === "") {
				alert("Please fill in all fields");
				return;
			} else {
				const userid = getUserid();
				await $addComment(postId, post.comment, userid);
				post.comment = "";
				posts.value = await $getPosts();
			}
		}
	}
}

const goToProfile = () => {
	router.push(`${getDisplayName.value}`);
};

const handleImageUpload = async (event) => {
	const file = event.target.files[0]; // Get the selected file
	console.log(file);
	if (file) {
		selectedFile.value = file;
		postInfo.value.image = URL.createObjectURL(file);
	}
}

onMounted(async () => {
	const fetchedPosts = await $getPosts();
	posts.value = fetchedPosts.map((post) => ({
		...post,
		comment: "",
		status: "idle",
	}));
	userId.value = getUserid();
	likedPostsIds.value = await getLikedPosts();
	dislikedPostsIds.value = await getDislikedPosts();
	setTimeout(() => {
		isLoading.value = false;
	}, 800);
});
</script>
<style scoped>
@media (max-width: 640px) {
	form {
		width: 70%;
	}
}

.post__comments {
	max-width: 70%;
}

.form,
.main-container {
	border: none;
	max-width: 95%;
}

.main,
.post__comments,
.post__image {
	display: flex;
	flex-direction: column;
	align-items: center;
}

@media (min-width: 1000px) {
	.main-container {
		width: 40%;
	}

	.modal-container {
		padding: inherit;
		max-width: 50vw;
	}
}

.share-button {
	width: 50%;
}

@media (max-width: 640px) {
	.share-button {
		width: 100%;
	}
}

.profile-button {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 50px;
	width: 50px;
	border-radius: 100%;
	top: -30px;
	right: 20px;
}

@media (max-width: 640px) {
	.profile-button {
		top: -10px;
		right: 5px;
		height: 30px !important;
		width: 30px;
	}
}
.modal-container {
	padding: 8px;
	width: 90vw;
	height: auto;
}

.big-container {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}

.text-container,
.image-container {
	display: flex;
	flex-direction: column;
}

.image {
	width: auto;
	max-height: 250px;
}

.comments {
	display: flex;
	flex-direction: column;
	height: auto;
	align-items: flex-start;
	border-radius: 5px;
	transition: 0.3s;
}

.comments__background {
	background: rgb(181, 181, 181);
	background: linear-gradient(90deg,
			rgba(172, 172, 172, 0.425) 0%,
			rgba(205, 205, 205, 0.171) 35%,
			rgba(249, 249, 249, 0) 100%);
	border-radius: 5px;
	padding: 5px;
	margin: 5px;
}

@media (min-width: 640px) {
	.scrollable-comments {
		width: 100%;
	}
}

.scrollable-comments {
	max-height: 200px;
	overflow: auto;
}

.comments__view {
	display: flex;
	width: 100%;
	justify-content: space-between;
	flex-direction: column;
	align-items: space-around;
}

.comments__input {
	width: 85%;
	justify-content: center;
	align-items: center;
}

.comments__form {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 5px;
}

.comments__input input {
	border: 0.5px solid #ecececad;
}

.button-container {
	display: flex;
	justify-content: center;
	align-items: center;
	color: #e9ab7c;
}

.button-container button:hover {
	background: #e9ab7c49;
	box-shadow: #b86a54 -4px -5px 0 -2px;
	border: 1px solid #fc785365;
}

.button-container button {
	border: 1px solid #ecba93;
	background: rgba(224, 200, 200, 0.178);
}

.like-button,
.dislike-button {
	transition: transform 0.3s;
}

.like-button:hover,
.dislike-button:hover {
	transform: scale(1.2);
	color: white;
}

.like-button svg path,
.dislike-button svg path {
	opacity: 0.5;
	transition: opacity 0.3s, fill 0.3s ease-in-out;
	fill: currentColor;
}

.like-button:hover svg path {
	opacity: 1;
	fill: red;
}

.dislike-button:hover svg path {
	opacity: 1;
	fill: rgb(23, 61, 197);
}

.comment-group {
	width: 100%;
	display: flex;
	justify-content: space-around;
}

.comments__display {
	width: 100%;
}

.comment {
	border-radius: 4px;
	margin: 4px 0;
}

.buttons {
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-top: 10px;
}

input[type="text"] {
	background: none;
}

::-webkit-scrollbar-track {
	border-radius: 0 10px 10px 0;
	opacity: 0;
}

::-webkit-scrollbar {
	border-radius: 0 10px 10px 0;
	width: 10px;
}

::-webkit-scrollbar-thumb {
	border-radius: 25px;
	background: #fc7753;
}

.content {
	background: none;
	border: none;
	border-image-slice: 1;
	border-width: 1px;
	-webkit-box-shadow: inset 0px 0px 2px 1px #fc7853c1;
	box-shadow: inset 0px 0px 2px 1px #fc78535a;
	border-radius: 5px;
}

::placeholder {
	color: white;
	opacity: 0.7;
}
</style>
