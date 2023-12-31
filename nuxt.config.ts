// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {},
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-seo-experiments',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  buildModules: [
    '@nuxt/vite',
    '@vite-pwa/nuxt'
  ],
  plugins: ['~/plugins/firebase.plugins.ts'],
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
    }
  },
  pwa: {
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg}'],
        runtimeCaching: [
          {
            urlPattern: 'https://yourdomain.com/api/*',
            handler: 'NetworkFirst',
            method: 'GET'
          }
        ]
    },
    manifest: {
      name: 'your name',
      short_name: 'your name',
      description: 'learning app',
      lang: 'en',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      icons: [
        {
          src: '/images/cinema.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/images/cinema.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  }
});
