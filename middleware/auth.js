// middleware/auth.ts

import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { useUsersStore } from '@/stores/users'

export default defineNuxtMiddleware(async ({ redirect }) => {
  const store = useUsersStore()

  if (!store.loggedIn) {
    return redirect('/login')
  }
})
