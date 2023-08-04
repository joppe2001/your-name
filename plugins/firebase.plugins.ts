import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUsersStore } from '@/stores/users';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  doc,
  increment
} from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Firebase configuration based on server or client
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
  const storage = getStorage(app);

  // Get a list of posts from the database
  const posts = collection(db, 'posts');
  // Specify the path to the image relative to the root of your Firebase Storage
  const imagePath = 'images/alsoyes.webp';

  // Create a reference to the image
  const imageRef = ref(storage, imagePath);

  // Add post, has to have a title but content and image are optional

  const addPost = async (
    title: string,
    content: string,
    imageUrl: string,
    userId: string,
    comments: { comment: string; userId: string }[] = []
  ) => {
    try {
      const docRef = await addDoc(posts, {
        title,
        content,
        imageUrl,
        userId, // add userId to the document
        comments,
        likes: 0, // add likes
        dislikes: 0 // add dislikes
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.log('Error adding document: ', e);
    }
  };  

  const addComment = async (
    postId: string,
    comment: string,
    userId: string
  ) => {
    if (!postId) {
      throw new Error('Post ID is undefined or null');
    }

    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data();
      if (!postData) throw new Error('Post data is undefined');

      const comments = postData.comments || [];
      comments.push({
        comment: comment,
        userId: userId
      });

      await updateDoc(postRef, {
        comments: comments
      });
    } else {
      throw new Error('Post does not exist');
    }
  };

  const getPosts = async () => {
    const postsSnapshot = await getDocs(posts);
    const postData = postsSnapshot.docs.map((doc) => ({
        id: doc.id, // include the document ID here
        ...doc.data()
    }));
    return postData;
};

const likePost = async (postId: string, userId: string) => {
  if (!userId) {
    throw new Error('User ID is undefined or null');
  }

  const postRef = doc(db, 'posts', postId);
  const userRef = doc(db, 'users', userId);
  const postSnap = await getDoc(postRef);
  const userSnap = await getDoc(userRef);

  if (postSnap.exists() && userSnap.exists()) {
    const userData = userSnap.data();
    if (!userData) throw new Error('User data is undefined');

    const likedPosts = userData.likedPosts || [];
    const dislikedPosts = userData.dislikedPosts || [];

    if (!likedPosts.includes(postId) && !dislikedPosts.includes(postId)) {
      await updateDoc(postRef, {
        likes: increment(1)
      });

      await updateDoc(userRef, {
        likedPosts: arrayUnion(postId)
      });
    } else {
      console.log("User has already liked or disliked this post");
    }
  } else {
    throw new Error('Post or user does not exist');
  }
};


const getLikes = async (postId: string) => {
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    const postData = postSnap.data();
    if (!postData) throw new Error('Post data is undefined');

    const likes = postData.likes || [];
    return likes;
  } else {
    throw new Error('Post does not exist');
  }
};
const dislikePost = async (postId: string, userId: string) => {
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    // Add the user's ID to the "dislikes" array field
    await updateDoc(postRef, {
      dislikes: arrayUnion(userId)
    });

    // Increment the dislike count by 1
    await updateDoc(postRef, {
      dislikeCount: increment(1)
    });
  } else {
    throw new Error('Post does not exist');
  }
};

const getDislikes = async (postId: string) => {
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);
  
  if (postSnap.exists()) {
    const postData = postSnap.data();
    if (!postData) throw new Error('Post data is undefined');

    const dislikes = postData.dislikes || [];
    return dislikes;
  } else {
    throw new Error('Post does not exist');
  }
};


  // get post id only

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
      addPost,
      imageRef,
      getPosts,
      addComment,
      likePost,
      dislikePost,
      getLikes,
      getDislikes
    }
  };
});
