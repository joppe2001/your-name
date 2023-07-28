import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: typeof window !== 'undefined' ? localStorage.getItem('user') || '' : '',
    loggedIn: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('loggedIn') || 'false') : false,
  }),
  actions: {
    setUser(user: any) {
      console.log('setUser called with:', user);
      this.user = user;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', user);
      }
    },
    setLoggedIn(loggedIn: boolean) {
      this.loggedIn = loggedIn;
      if (typeof window !== 'undefined') {
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
      }
    },
  },
  getters: {
    getUser(): any {
      return this.user;
    },
    getLoggedIn(): boolean {
      return this.loggedIn;
    }
  }
});
