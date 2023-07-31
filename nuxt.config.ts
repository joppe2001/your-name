// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-seo-experiments',
    '@pinia/nuxt'
  ],
  plugins: ['~/plugins/firebase.plugins.ts'],
  runtimeConfig: {
    firebase: {
      FIREBASE_API_KEY: 'AIzaSyAEOtm0PC-niQDE_OqtOQJSckNxJODmfIw',
      FIREBASE_AUTH_DOMAIN: 'your-name-f7fa7.firebaseapp.com',
      FIREBASE_PROJECT_ID: 'your-name-f7fa7',
      FIREBASE_STORAGE_BUCKET: 'your-name-f7fa7.appspot.com',
      FIREBASE_MESSAGING_SENDER_ID: '987814488076',
      FIREBASE_APP_ID: '1:987814488076:web:77c00d16b14ec94e47a629',
      FIREBASE_MEASUREMENT_ID: 'G-0SRPY6RNM6'
    },
    public: {
      apiKey: process.env.FIREBASE_API_KEY
    }
  }
});
