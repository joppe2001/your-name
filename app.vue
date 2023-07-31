<template>
  <NuxtLayout id="app" class="flex min-h-screen flex-col"
    :style="`background: url(${backgroundImage}) no-repeat center fixed; background-size: cover;`">
    <baseHeader />
    <NuxtPage class="flex-grow" />
    <baseFooter />
  </NuxtLayout>
</template>


<script setup>
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
      content: 'https://master--chipper-kangaroo-dec0ed.netlify.app/images/alsoyes.webp'
    },
  ]
})

const route = useRoute()

const backgroundImage = computed(() => {
  switch (route.fullPath) {
    case '/mitsuha':
      return '/images/mitsuha.webp'
    case '/taki' || '/characterGlowup/taki':
      return '/images/taki.webp'
    case '/characterGlowup/mitsuha':
      return '/images/mitsuha.webp'
    case '/characterGlowup/taki':
      return '/images/taki.webp'
    default:
      return '/images/alsoyes.webp'
  }
})
</script>
