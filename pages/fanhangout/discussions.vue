<template>
    <div class="flex flex-col p-4" v-if="!isLoading">
        <!-- form -->
        <form @submit.prevent="submitForm"
            class="flex flex-col w-1/2 mx-auto mb-8 p-4 sm:p-8 border-4 border-yn-lavender rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md">
            <h1 class="text-center mb-3 text-2xl text-yn-deep-purple font-bold">
                post it!
            </h1>
            <input type="text" name="title" v-model="postInfo.title" placeholder="title"
                class="p-2 mb-4 border border-yn-lavender rounded bg-yn-soft-lilac placeholder-yn-night-sky text-yn-lavender focus:outline-none focus:border-yn-golden transition duration-500 ease-in-out" />
            <textarea name="content" v-model="postInfo.content" placeholder="content"
                class="p-2 mb-4 border border-yn-lavender rounded bg-yn-soft-lilac placeholder-yn-night-sky text-yn-lavender h-40 focus:outline-none focus:border-yn-lavender transition duration-500 ease-in-out" />
            <input type="string" name="image" v-model="postInfo.image" placeholder="image url"
                class="p-2 mb-4 border border-yn-lavender rounded bg-yn-soft-lilac placeholder-yn-night-sky text-yn-lavender focus:outline-none focus:border-yn-golden transition duration-500 ease-in-out" />
            <div class="wrapper">
                <a @click.prevent="submitForm()"> Share post </a>
            </div>
        </form>

        <div class="flex-grow w-full main">
            <div v-for="post in posts" :key="post.id" id="post"
                class="post main-container p-4 sm:p-8 border-4 border-yn-lavender rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md mb-4 max-w-3/4 sm:max-w-3/4 lg:max-w-3/4 flex flex-col items-center justify-center">
                <div class="post__content w-5/6 p-2 sm:p-8">
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
                <div class="post__comments w-full p-4 sm:p-8">
                    <div class="comments__view">
                        <div class="w-100 flex">
                            <div class="flex items-center justify-center">
                                <form @submit.prevent="submitComment(post.id)" class="comments__form">
                                    <input type="text" name="comment" v-model="post.comment" placeholder="Add a comment..."
                                        class="comments__input flex-grow p-2 mr-1 border border-gray-200 rounded bg-gray-100 placeholder-gray-700 text-gray-700" />
                                    <div class="wrapper">
                                        <a href="#" @click.prevent="submitComment(post.id)" class="comments__submit p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20Zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20Zm3-9h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </form>
                            </div>
                            <div class="wrapper">
                                <a href="#" @click.prevent="post.showComments = !post.showComments"
                                    class="comments__submit p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="m21.21 10.29l-1.73-1.72a4.37 4.37 0 0 0 .65-2.26a4.31 4.31 0 1 0-4.32 4.32a4.35 4.35 0 0 0 2.26-.63l1.72 1.73a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.44ZM17.45 8a2.32 2.32 0 0 1-3.95-1.69a2.29 2.29 0 0 1 .68-1.63a2.32 2.32 0 0 1 3.27 0a2.31 2.31 0 0 1 0 3.27Zm2.05 6a1 1 0 0 0-1.22.72A7 7 0 0 1 11.5 20H5.91l.64-.63a1 1 0 0 0 0-1.41a7 7 0 0 1-2-5a7 7 0 0 1 4.32-6.44a1 1 0 1 0-.74-1.86a9 9 0 0 0-3.66 14l-1.68 1.63a1 1 0 0 0-.21 1.09a1 1 0 0 0 .92.62h8a9 9 0 0 0 8.72-6.75A1 1 0 0 0 19.5 14Z" />
                                    </svg>
                                </a>
                            </div>
                            <button @click="$likePost(post.id, userId)">
                                <div style="position: relative; display: inline-block;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="opacity: 0.3;">
                                        <path fill="currentColor"
                                            d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span
                                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">{{
                                            post.likes }}</span>
                                </div>
                            </button>
                        </div>
                        <transition name="modal">
                            <div class="modal-mask fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
                                v-show="post.showComments" @click.self="post.showComments = false">
                                <div class="modal-wrapper">
                                    <!-- Modal container -->
                                    <div class="modal-container bg-white rounded shadow-lg px-10 py-6 relative" @click.stop>
                                        <!-- Modal close -->
                                        <div class="modal-close absolute top-0.5 right-1 cursor-pointer"
                                            @click="post.showComments = false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z" />
                                            </svg>
                                        </div>

                                        <!-- Comments display -->
                                        <div
                                            class="comments__display transition-all duration-300 mt-4 max-h-96 overflow-auto border border-gray-200 rounded bg-gray-100 text-gray-700 p-4">
                                            <div v-for="comment in post.comments" :key="comment.id" class="comment">
                                                <p class="p-1">
                                                    {{
                                                        userNames.get(comment.userId) +
                                                        ": " +
                                                        comment.comment
                                                    }}
                                                </p>
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Comment form -->
                                </div>
                            </div>
                        </transition>
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
import { collection, getDocs } from "firebase/firestore";

const { $db, $addPost, $getPosts, $addComment, $likePost } = useNuxtApp();

const userNames = ref(new Map());
const auth = getAuth();
const db = $db;

const isLoading = ref(true);
const postInfo = ref({
    title: "",
    content: "",
    image: "",
    comments: [],
    showComments: false,
    likes: 0,
    dislikes: 0,
});
const showComments = ref(false);
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
    posts.value = fetchedPosts.map((post) => ({ ...post, comment: "" }));
    console.log(posts.value);
    // Use the getDisplayName function here
    for (const post of posts.value) {
        for (const comment of post.comments) {
            const displayName = await getDisplayName(comment.userId);
        }
    }
    userId.value = getUserid();
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

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.post__comments {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    width: 100%;
    height: auto;
    align-items: flex-start;
    opacity: 0.6;
    border-radius: 5px;
    margin-top: 10px;
    padding: 8px 0;
    transition: 0.3s;
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

.comments:hover {
    opacity: 1;
    box-shadow: 0 0 2px 1px rgb(243, 198, 236);
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
    font-size: 18px;
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
</style>
