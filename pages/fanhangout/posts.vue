<template>
    <div class="flex flex-col p-4" v-if="!isLoading">
        <!-- form -->
        <form @submit.prevent="submitForm"
            class="form flex flex-col w-1/2 mx-auto mb-8 p-4 sm:p-8 border-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md">
            <h1 class="text-center mb-3 text-2xl text-yn-deep-purple font-bold">
                post it!
            </h1>
            <input type="text" name="title" v-model="postInfo.title" placeholder="title"
                class="content p-2 mb-4 border rounded  placeholder-yn-night-sky focus:outline-none focus:border-yn-golden transition duration-500 ease-in-out" />
            <textarea name="content" v-model="postInfo.content" placeholder="content"
                class="content p-2 mb-4 border rounded placeholder-yn-night-sky h-40 focus:outline-none focus transition duration-500 ease-in-out" />
            <input type="string" name="image" v-model="postInfo.image" placeholder="image url"
                class="content p-2 mb-4 border rounded placeholder-yn-night-sky focus:outline-none focus:border-yn-golden transition duration-500 ease-in-out" />
            <div class="wrapper">
                <a @click.prevent="submitForm()"> Share post </a>
            </div>
        </form>

        <div class="flex-grow w-full main">
            <div v-for="post in posts" :key="post.id" id="post"
                class="post main-container p-4 sm:p-8 border-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-lg mb-4 max-w-3/4 sm:max-w-3/4 lg:max-w-3/4 flex flex-col items-center justify-center">
                <div class="post__content w-5/6 p-2">
                    <div class="post__text text-center">
                        <h1 class="post__title text-yn-night-sky text-2xl sm:text-3xl mb-4">
                            {{ post.title + " by " + userNames.get(post.userId) }}
                        </h1>
                        <p class="post__description text-yn-night-sky text-sm sm:text-lg mb-4 sm:mb-8">
                            {{ post.content }}
                        </p>
                    </div>
                    <div class="post__image">
                        <img :src="post.imageUrl" class="rounded mx-auto" />
                    </div>
                </div>
                <div class="post__comments w-full p-4">
                    <div class="comments__view">
                        <div class="w-100 flex-column">
                            <div class="flex items-center justify-center comment-group">
                                <form @submit.prevent="submitComment(post.id)" class="comments__form">
                                    <input type="text" name="comment" v-model="post.comment" placeholder="Add a comment..."
                                        class="comments__input flex-grow p-2 mr-1 border rounded placeholder-gray-700 text-gray-700" />
                                    <div class="wrapper">
                                        <a href="#" @click.prevent="submitComment(post.id)" class="comments__submit p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20Zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20Zm3-9h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </form>
                            </div>
                            <div class="buttons">
                                <button @click="likePostHandler(post.id, userId)">
                                    <div class="like-button" style="position: relative; display: inline-block;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29c2.64-1.8 5.9-.96 7.66 1.1c1.76-2.06 5.02-2.91 7.66-1.1c1.41.96 2.28 2.59 2.34 4.29c.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"
                                                :style="{ fill: likedPostsIds.includes(post.id) ? 'red' : '' }" />
                                        </svg>
                                        <span
                                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: 0.3s ease-out">{{
                                                post.likes }}</span>
                                    </div>
                                </button>
                                <button @click="dislikePostHandler(post.id, userId)">
                                    <div class="dislike-button" style="position: relative; display: inline-block;"
                                        :class="post.status === 'already_liked' ? 'liked' : ''">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="m2.808 1.394l18.384 18.384l-1.414 1.415l-3.746-3.747L12 21.486l-8.478-8.493a6 6 0 0 1 .033-8.023L1.394 2.808l1.414-1.414Zm17.435 3.364a6 6 0 0 1 .236 8.235l-1.635 1.636L7.26 3.046a5.99 5.99 0 0 1 4.741 1.483a5.998 5.998 0 0 1 8.242.229Z"
                                                :style="{ fill: dislikedPostsIds.includes(post.id) ? 'blue' : '' }" />
                                        </svg>
                                        <span
                                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: 0.3s ease-out">{{
                                                post.dislikes }}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="error-message">
                            <div v-if="post.status === 'already_liked' || post.status === 'already_disliked'"
                                class="text-red-500">
                                already {{ post.lastAction }}.
                            </div>
                        </div>

                        <div class="comments__display transition-all duration-300 mt-4 overflow-auto   text-gray-700 p-4"
                            :class="{ 'scrollable-comments': post.comments.length > 5 }" v-if="post.comments.length">
                            <div v-for="comment in post.comments" :key="comment.id" class="comment bg-white backdrop-blur-md">
                                <p class="p-1 text-black">
                                    {{
                                        userNames.get(comment.userId) +
                                        ": " +
                                        comment.comment
                                    }}
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
    <div v-else class="loadingSpinner">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                <path stroke-dasharray="2 4" stroke-dashoffset="6"
                    d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21">
                    <animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0" />
                </path>
                <path stroke-dasharray="30" stroke-dashoffset="30"
                    d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.3s" values="30;0" />
                </path>
                <path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0" />
                </path>
                <path stroke-dasharray="6" stroke-dashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0" />
                </path>
            </g>
        </svg>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import debounce from "lodash.debounce";

const { $db, $addPost, $getPosts, $addComment, $likePost, $dislikePost, $getUsers } = useNuxtApp();

const userNames = ref(new Map());
const auth = getAuth();
const db = $db;

const likedPostsIds = ref([]);
const dislikedPostsIds = ref([]);
const getLikedPosts = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
        console.error("User not authenticated");
        return [];
    }

    // Fetch user document
    const userRef = doc(db, `users/${userId}`);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    // Check if likedPosts exists
    if (!userData || !userData.likedPosts) {
        return [];
    }

    // Return liked post IDs directly
    return userData.likedPosts;
};

const getDislikedPosts = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
        console.error("User not authenticated");
        return [];
    }

    // Fetch user document
    const userRef = doc(db, `users/${userId}`);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    // Check if likedPosts exists
    if (!userData || !userData.dislikedPosts) {
        return [];
    }

    // Return liked post IDs directly
    return userData.dislikedPosts;
};

const likePostHandler = debounce(async (postId, userId) => {
    const result = await $likePost(postId, userId);
    const post = posts.value.find(post => post.id === postId);
    likedPostsIds.value = await getLikedPosts();

    // If post was previously disliked, remove from disliked posts
    if (result.status === 'undisliked') {
        dislikedPostsIds.value = dislikedPostsIds.value.filter(id => id !== postId);
    }

    post.lastAction = 'liked';
    if (post) {
        if (result.status === 'success') {
            post.likes += 1;
        } else if (result.status === 'undisliked') {
            post.likes += 1;
            post.dislikes -= 1;
        }
        posts.value = posts.value.map(p => p.id === postId ? { ...p, status: result.status } : p);
    }
}, 300);

const dislikePostHandler = debounce(async (postId, userId) => {
    const result = await $dislikePost(postId, userId);
    const post = posts.value.find(post => post.id === postId);
    dislikedPostsIds.value = await getDislikedPosts();

    // If post was previously liked, remove from liked posts
    if (result.status === 'unliked') {
        likedPostsIds.value = likedPostsIds.value.filter(id => id !== postId);
    }

    post.lastAction = 'disliked';
    if (post) {
        if (result.status === 'success') {
            post.dislikes += 1;
        } else if (result.status === 'unliked') {
            post.dislikes += 1;
            post.likes -= 1;
        }
        posts.value = posts.value.map(p => p.id === postId ? { ...p, status: result.status } : p);
    }
}, 300);




const isLoading = ref(true);
const postInfo = ref({
    title: "",
    content: "",
    image: "",
    comments: [],
    likes: 0,
    dislikes: 0,
});
const success = ref(false);
const posts = ref([]);

const getUserid = () => {
    return auth.currentUser ? auth.currentUser.uid : null;
};
const userId = ref(null)

const getDisplayName = async (userId) => {
    const usersRef = collection(db, "users");
    const userSnapshot = await getDocs(usersRef);
    let displayName = "";

    userSnapshot.forEach((doc) => {
        let userData = doc.data();
        if (userData.uid === userId) {
            // Adjusted this line
            displayName = userData.displayName;
            return;
        }
    });

    return displayName;
};

watchEffect(async () => {
    try {
        for (let post of posts.value) {
            // Get the display name of the user who posted the post
            if (!userNames.value.has(post.userId)) {
                const displayName = await getDisplayName(post.userId);
                userNames.value.set(post.userId, displayName);
            }

            // Get the display names of the users who have commented on the post
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

async function submitForm() {
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

onMounted(async () => {
    const fetchedPosts = await $getPosts();
    posts.value = fetchedPosts.map((post) => ({ ...post, comment: "", status: 'idle' }));
    // Use the getDisplayName function here
    for (const post of posts.value) {
        for (const comment of post.comments) {
            const displayName = await getDisplayName(comment.userId);
        }
    }
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
.form {
    border: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to bottom,#ffffff00, #ce6bd7, #e3eeff00);
}
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.post__comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loadingSpinner {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loadingSpinner svg {
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
}

.main-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    border: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to bottom,#ffffff00, #ce6bd7, #e3eeff00);
}

@media (min-width: 640px) {
    .main-container {
        width: 60%;
    }

    .modal-container {
        padding: inherit;
        max-width: 50vw;
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

.text-container {
    display: flex;
    flex-direction: column;
}

.image-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.image-container img {
    max-height: 300px;
    width: 80px;
}

.comments {
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: flex-start;
    border-radius: 5px;
    transition: 0.3s;
}

.scrollable-comments {
    max-height: 200px;
    /* you can adjust this height as per your requirement */
    overflow-y: auto;
}

@media (min-width: 640px) {
    .scrollable-comments {
        width: 100%;
    }
}

.comments__view {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
}

.comments__input {
    width: 70%;
    justify-content: center;
    align-items: center;
}

/* make scrollbar invisible */
.comments__form {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    margin-right: 5px;
}

.comments__form button {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.comments__toggle {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-radius: 5px;
    font-size: 1.1rem;
    font-family: sans-serif;
    text-decoration: none;
    color: #333;
    letter-spacing: 2px;
    text-align: center;
    position: relative;
    transition: all 0.25s ease-out;
    cursor: pointer;
}

a span {
    position: relative;
    z-index: 2;
}

a:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: rgb(180, 173, 204);
    transition: all 0.25s ease-out;
    border-radius: 2px;
    z-index: -1;
}

a:hover {
    color: #fff;
}

a:hover:after {
    width: 100%;
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
    /* Change this to the color you want for the dislike button */
}

.comment-group {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.comment {
    border-radius: 5px;
    margin: 4px 0;
}

.buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
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
    background: linear-gradient(to bottom, #ce6bd7, #6e3572 );
}

.content {
    background: none;
    border: 2px solid;
    border-image-slice: 1;
    border-width: 2px;
    border-image-source: linear-gradient(to right,#ffffff00, #ce6bd7, #6e3572 , #e3eeff00);
}
</style>
