import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUsersStore } from '@/stores/users';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Firebase plugin is loaded');
  const config = useRuntimeConfig()

  console.log('Runtime config:', config.firebase.FIREBASE_API_KEY);
  
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

  // Get a list of users from the database
  const db = getFirestore();
  const users = collection(db, 'users');
  const posts = collection(db, ' posts');

  // get user info
  getDocs(users).then((querySnapshot) => {
    console.log('Current users in DB:', querySnapshot.docs);
  });

  //get posts
  getDocs(posts).then((querySnapshot) => {
    console.log('Current posts in DB:', querySnapshot.docs);
  });
  
  // add user info
  const addUser = async (name: string, email: string) => {
    await addDoc(users, {
      name: name,
      email: email
    });
  };

  // add post
  const addPost = async (title: string, content: any) => {
    await addDoc(users, {
      title: title,
      content: content
    });
  };

  // Provide the auth and store objects to the nuxt app
  const store = useUsersStore();

  // Set up a listener to update the store when the user logs in or out
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.loggedIn = true;
      (store.user as any) = user.displayName;
    } else {
      store.loggedIn = false;
      store.user = '';
    }
  });
  return {
    provide: {
      db,
      users,
      auth,
      store,
      addUser,
      addPost
    }
  };
});
