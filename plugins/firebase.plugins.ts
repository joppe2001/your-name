import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUsersStore } from '@/stores/users';
import { useCookie } from 'nuxt/app';
export default defineNuxtPlugin((nuxtApp) => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyAEOtm0PC-niQDE_OqtOQJSckNxJODmfIw',
    authDomain: 'your-name-f7fa7.firebaseapp.com',
    projectId: 'your-name-f7fa7',
    storageBucket: 'your-name-f7fa7.appspot.com',
    messagingSenderId: '987814488076',
    appId: '1:987814488076:web:77c00d16b14ec94e47a629',
    measurementId: 'G-0SRPY6RNM6'
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  nuxtApp.provide('auth', auth);
  const store = useUsersStore();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.loggedIn = true;
      store.user = user.displayName;
    } else {
      store.loggedIn = false;
      store.user = '';
    }
  });
});

