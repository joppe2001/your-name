<template>
  <NuxtLayout id="app" class="flex min-h-screen flex-col"
    :style="`background: url(${backgroundImage}) no-repeat center; background-size: cover;`">
    <baseHeader />
    <NuxtPage class="flex-grow" />
    <baseFooter />
  </NuxtLayout>
</template>

<script setup>
// Get current route
const route = useRoute()

// Compute the background image URL based on the current route
const backgroundImage = computed(() => {
  switch (route.fullPath) {
    case '/mitsuha':
      return '/images/mitsuha.webp'
    case '/taki':
      return '/images/taki.webp'
    default:
      return '/images/alsoyes.jpeg'
  }
})
</script>
