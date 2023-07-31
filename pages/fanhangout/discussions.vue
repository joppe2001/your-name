<template>
    <div class="body">
        <form @submit.prevent="submitForm">
            <input type="text" name="title" v-model="postInfo.title" placeholder="title">
            <input type="text" name="content" v-model="postInfo.content" placeholder="content">
            <button type="submit">Add postInfo</button>
        </form>
    </div>
</template>

<script setup>

const { $addPost } = useNuxtApp()
const addPost = $addPost

const postInfo = ref({
    title: '',
    content: ''
})

const submitForm = async () => {
    if (postInfo.value.title && postInfo.value.content) {
        await addPost(postInfo.value.title, postInfo.value.content)
        postInfo.value.title = ''
        postInfo.value.content = ''
    }
}
</script>


<style scoped>
.body {
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
}

input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #ccc;
    cursor: pointer;
}
</style> 
