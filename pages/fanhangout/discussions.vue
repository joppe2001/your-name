<template>
    <div class="body">
        <form @submit.prevent="submitForm">
            <input type="text" name="title" v-model="postInfo.title" placeholder="title">
            <input type="text" name="content" v-model="postInfo.content" placeholder="content">
            <button type="submit">Add postInfo</button>
        </form>
        <!-- add a modal that will pop up when a message has successfully been uploaded -->
        <div class="modal" v-if="success">
            <div class="modal-content">
                <button class="close" @click="success = false">&times;</button>
                <p>Post successfully added!</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUsersStore } from '@/stores/users';
const { $addPost } = useNuxtApp()
const addPost = $addPost
const store = useUsersStore()
const postInfo = ref({
    title: '',
    content: ''
})

const success = ref(false)

const submitForm = () => {
    if (postInfo.value.title && postInfo.value.content && store.uid !== null) {
        addPost(postInfo.value.title, postInfo.value.content)
        success.value = true
        postInfo.value.title = ''
        postInfo.value.content = ''
    } else {
        alert('Please fill in all fields')
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

.modal {
    display: block;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}
</style> 
