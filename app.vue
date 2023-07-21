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
import { useHead } from 'unhead'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Your Name | An Adventure of Lifetimes',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Dive into the extraordinary world of "Your Name". Experience the adventures of Mitsuha and Taki in a captivating love story that transcends time and space.'
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Your Name | An Adventure of Lifetimes'
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Dive into the extraordinary world of "Your Name". Experience the adventures of Mitsuha and Taki in a captivating love story that transcends time and space.'
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: '/images/alsoyes.png'
    },
  ]
})


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
