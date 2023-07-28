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
  // Make the auth instance accessible to the components through nuxtApp.provide
  nuxtApp.provide('auth', auth);
  const store = useUsersStore();

  // Listen to changes in the auth state and redirect to /login if not authenticated
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in. You could do additional work here such as fetch the user's profile.
      console.log('User is signed in');
      
      store.loggedIn = true;
    } else {
      // User is signed out.
      console.log('User is signed out');
      store.loggedIn = false;
    }
  });
});
