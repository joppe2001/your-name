import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: '',
    loggedIn: false
  }),
  actions: {
    setUser(user: any) {
        this.user = user;
      }
  },
  getters: {
    getUser(): any {
      return this.user;
    }
  }
});
