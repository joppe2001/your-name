<template>
    <div>
        <h1>Welcome {{ userData.displayName }}</h1>
    </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";

const { $dataByDisplayName, $db } = useNuxtApp();

const router = useRouter();
const displayNameFromRoute = router.currentRoute.value.fullPath.split('/').pop();
const userData = ref({});

onMounted(async () => {
    userData.value = await $dataByDisplayName(displayNameFromRoute, $db);
});


</script>
