import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUsersStore } from '@/stores/users';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Firebase plugin is loaded');
  const config = useRuntimeConfig();

  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  // firebase configuration based on server or client
  let firebaseConfig = {};
  if (process.server) {
    firebaseConfig = {
      apiKey: config.FIREBASE_API_KEY,
      authDomain: config.FIREBASE_AUTH_DOMAIN,
      projectId: config.FIREBASE_PROJECT_ID,
      storageBucket: config.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
      appId: config.FIREBASE_APP_ID,
      measurementId: config.FIREBASE_MEASUREMENT_ID
    };
  } else if (process.client) {
    firebaseConfig = {
      apiKey: config.public.FIREBASE_API_KEY,
      authDomain: config.public.FIREBASE_AUTH_DOMAIN,
      projectId: config.public.FIREBASE_PROJECT_ID,
      storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
      appId: config.public.FIREBASE_APP_ID,
      measurementId: config.public.FIREBASE_MEASUREMENT_ID
    };
  }
  console.log('firebaseConfig', firebaseConfig);

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
