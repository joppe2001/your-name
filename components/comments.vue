<template>
    <div v-for="post in posts" :key="post.userId">
        {{ post.comment }}
    </div>
</template>

<script setup>
    const { $getPosts } = useNuxtApp();
    const posts = ref([]); // Create a reactive variable to store the posts
    const fetchPosts = $getPosts;
    onMounted(async () => {
        posts.value = await fetchPosts();
        console.log(posts.value);
    });
</script>