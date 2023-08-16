<template>
    <div>
        <h1>{{ userData.displayName }}</h1>
        <p>Contact: {{ userData.email }}</p>
        <p>{{ userData.likedPosts }}</p>
        <p>{{ totalLikes }}</p>
    </div>
</template>

<script setup>

const { $dataByDisplayName, $db, $getTotalLikes } = useNuxtApp();

const router = useRouter();
const displayNameFromRoute = router.currentRoute.value.fullPath.split('/').pop();
const userData = ref({});
const totalLikes = ref(0);

onMounted(async () => {
    userData.value = await $dataByDisplayName(displayNameFromRoute, $db);
    totalLikes.value = await $getTotalLikes(userData.value.uid);
});


</script>
