import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUsersStore } from '@/stores/users';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // firebase configuration based on server or client
   const firebaseConfig = {
      apiKey: config.public.FIREBASE_API_KEY,
      authDomain: config.public.FIREBASE_AUTH_DOMAIN,
      projectId: config.public.FIREBASE_PROJECT_ID,
      storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
      appId: config.public.FIREBASE_APP_ID,
      measurementId: config.public.FIREBASE_MEASUREMENT_ID
    };
 

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Get a list of users from the database
  const db = getFirestore(app);
  const users = collection(db, 'users');
  const posts = collection(db, 'posts');

  // add user info
  const addUser = async (name: string, content: string) => {
    await addDoc(users, {
      name: name,
      content: content
    });
  };

  // add post
  const addPost = async (title: string, content: any) => {
    await addDoc(posts, {
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
      console.log('User is signed in:', user.displayName)
      addUser('user.displayName', 'test');
    } else {
      store.loggedIn = false;
      store.user = '';
      console.log('User is signed out');
      
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
