<template>
    <div class="flex flex-col p-4" v-if="!isLoading">
        <!-- form -->
        <form @submit.prevent="submitForm"
            class="flex flex-col w-1/2 mx-auto mb-8 p-4 sm:p-8 border-4 border-yn-lavender rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md">
            <h1 class="text-center mb-3 text-2xl text-yn-cherry-blossom ">add your thoughts</h1>
            <input type="text" name="title" v-model="postInfo.title" placeholder="title"
                class="p-2 mb-2 border border-yn-lavender rounded bg-yn-lavender placeholder-yn-night-sky text-yn-night-sky" />
            <textarea name="content" v-model="postInfo.content" placeholder="content"
                class="p-2 mb-2 border border-yn-lavender rounded bg-yn-lavender placeholder-yn-night-sky text-yn-night-sky" />
            <input type="string" name="image" v-model="postInfo.image" placeholder="image url"
                class="p-2 mb-2 border border-yn-lavender rounded bg-yn-lavender placeholder-yn-night-sky text-yn-night-sky" />
            <button type="submit"
                class="p-2 border border-yn-lavender rounded bg-yn-lavender text-yn-night-sky cursor-pointer hover:bg-yn-cherry-blossom transition-all duration-200">
                Add postInfo
            </button>
        </form>

        <div class="flex-grow">
            <div v-for="post in posts" :key="post.id"
                class="main-container p-4 sm:p-8 border-4 border-yn-lavender rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md mb-4 max-w-xs sm:max-w-md lg:max-w-4xl mx-auto"
                id="post">
                <div class="big-container">
                    <div class="text-container">
                        <h1 class="text-yn-night-sky text-2xl sm:text-3xl mb-4">
                            {{ post.title }}
                        </h1>
                        <p class="text-yn-night-sky text-sm sm:text-lg mb-4 sm:mb-8">
                            {{ post.content }}
                        </p>
                    </div>
                    <div class="image-container">
                        <img :src="post.imageUrl" class="rounded" />
                    </div>
                </div>
                <div class="comments">
                    <form @submit.prevent="submitComment(post.id)" class="flex items-center">
                        <input type="text" name="comment" v-model="post.comment" placeholder="Add a comment..."
                            class="flex-grow p-2 mr-2 border border-yn-lavender rounded bg-yn-lavender placeholder-yn-night-sky text-yn-night-sky" />
                        <button type="submit"
                            class="p-2 border border-yn-lavender rounded bg-yn-lavender text-yn-night-sky cursor-pointer hover:bg-yn-cherry-blossom transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 15 16">
                                <path fill="currentColor"
                                    d="M12.49 7.14L3.44 2.27c-.76-.41-1.64.3-1.4 1.13l1.24 4.34c.05.18.05.36 0 .54l-1.24 4.34c-.24.83.64 1.54 1.4 1.13l9.05-4.87a.98.98 0 0 0 0-1.72Z" />
                            </svg>
                        </button>
                    </form>

                    <div class="comments-display mt-4 max-h-32 overflow-auto">
                        <h2 class="text-yn-night-sky text-lg mb-2">Comments:</h2>
                        <ul>
                            <li v-for="comment in post.comments" :key="comment.id" class="mb-2 text-yn-night-sky">
                                {{ comment.comment }}
                            </li>
                        </ul>
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
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth";
const auth = getAuth();
const getUserid = () => {
    if (auth.currentUser) {
        return auth.currentUser.uid;
    } else {
        return null;
    }
};
const isLoading = ref(true);
const { $addPost, $getPosts, $addComment } = useNuxtApp();
const addPost = $addPost;
const fetchPosts = $getPosts;
const addComment = $addComment;
const postInfo = ref({
    title: "",
    content: "",
    image: "",
    comments: [],
});
const success = ref(false);
const posts = ref([]); // Create a reactive variable to store the posts

onMounted(async () => {
    let fetchedPosts = await fetchPosts();
    posts.value = fetchedPosts.map(post => ({ ...post, comment: '' }));
    setTimeout(() => {
        isLoading.value = false;
    }, 800);
});


const submitForm = async () => {
    if (
        (postInfo.value.title && postInfo.value.content) ||
        postInfo.value.image
    ) {
        const userid = getUserid();
        await addPost(
            postInfo.value.title,
            postInfo.value.content,
            postInfo.value.image,
            userid
        );
        success.value = true;
        postInfo.value.title = "";
        postInfo.value.content = "";
        postInfo.value.image = "";
        posts.value = await fetchPosts();
    } else {
        alert("Please fill in all fields");
    }
};
const submitComment = async (postId) => {
    for (let post of posts.value) {
        if (post.id === postId) {
            if (post.comment === "") {
                alert("Please fill in all fields");
                return;
            } else {
                const userid = getUserid();
                await addComment(postId, post.comment, userid);
                post.comment = "";
                posts.value = await fetchPosts();
            }
        }
    }
};

	// test
</script>

<style scoped>
@media (max-width: 640px) {
    form {
        width: 75%;
    }
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
    width: 100%;
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
    height: auto;
    width: 80px;
}

.comments {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    align-items: center;
    background: rgb(244, 174, 234);
    opacity: 0.6;
    border-radius: 5px;
    margin-top: 10px;
    padding: 8px 0;
    transition: 0.3s;
}

.comments:hover {
    opacity: 1;
    box-shadow: 0 0 2px 1px rgb(243, 198, 236);
}</style>
