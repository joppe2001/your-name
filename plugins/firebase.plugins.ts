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
  increment,
  arrayRemove
} from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import debounce from 'lodash.debounce';

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

  const getDisplayName = async (userId: any) => {
    const userSnapshot = await getDocs(users);
    let displayName = '';
    userSnapshot.forEach((doc) => {
      let userData = doc.data();
      if (userData.uid === userId) {
        displayName = userData.displayName;
        return;
      }
    });
    return displayName;
  };
  const addPost = async (
    title: any,
    content: any,
    imageUrl: any,
    userId: any,
    comments = []
  ) => {
    try {
      const docRef = await addDoc(posts, {
        title,
        content,
        imageUrl,
        userId,
        comments,
        likes: 0,
        dislikes: 0
      });
    } catch (e) {
      console.log('Error adding document: ', e);
    }
  };
  const addComment = async (postId: string, comment: any, userId: any) => {
    if (!postId) {
      throw new Error('Post ID is undefined or null');
    }
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      if (!postData) throw new Error('Post data is undefined');
      const comments = postData.comments || [];
      comments.push({ comment: comment, userId: userId });
      await updateDoc(postRef, { comments: comments });
    } else {
      throw new Error('Post does not exist');
    }
  };
  const getLikesForPost = async (postId: string) => {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      return postData ? postData.likes : 0;
    } else {
      throw new Error('Post does not exist');
    }
  };
  const getLikedPosts = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return [];
    }
    const userRef = doc(db, `users/${userId}`);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    if (!userData || !userData.likedPosts) {
      return [];
    }
    return userData.likedPosts;
  };
  const getDislikedPosts = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return [];
    }
    const userRef = doc(db, `users/${userId}`);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    if (!userData || !userData.dislikedPosts) {
      return [];
    }
    return userData.dislikedPosts;
  };
  const getDislikesForPost = async (postId: string) => {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      return postData ? postData.dislikes : 0;
    } else {
      throw new Error('Post does not exist');
    }
  };
  const getPosts = async () => {
    const postsSnapshot = await getDocs(posts);
    const postData = [];
    for (let doc of postsSnapshot.docs) {
      let post = doc.data();
      post.id = doc.id;
      post.likes = await getLikesForPost(post.id);
      post.dislikes = await getDislikesForPost(post.id);
      postData.push(post);
    }
    return postData;
  };
  const likePost = async (postId: unknown, userId: string) => {
    if (!userId) {
      throw new Error('User ID is undefined or null');
    }
    const postRef = doc(db as any, 'posts', postId as string);
    const userRef = doc(db, 'users', userId);
    const postSnap = await getDoc(postRef);
    const userSnap = await getDoc(userRef);
    if (postSnap.exists() && userSnap.exists()) {
      const userData = userSnap.data();
      if (!userData) throw new Error('User data is undefined');
      const likedPosts = userData.likedPosts || [];
      const dislikedPosts = userData.dislikedPosts || [];
      if (likedPosts.includes(postId)) {
        return { status: 'already_liked' };
      } else {
        if (dislikedPosts.includes(postId)) {
          await updateDoc(postRef, { dislikes: increment(-1) });
          await updateDoc(userRef, { dislikedPosts: arrayRemove(postId) });
        }
        await updateDoc(postRef, { likes: increment(1) });
        await updateDoc(userRef, { likedPosts: arrayUnion(postId) });
        return {
          status: dislikedPosts.includes(postId) ? 'undisliked' : 'success'
        };
      }
    } else {
      throw new Error('Post or user does not exist');
    }
  };
  const dislikePost = async (postId: unknown, userId: string) => {
    if (!userId) {
      throw new Error('User ID is undefined or null');
    }
    const postRef = doc(db as any, 'posts', postId as string);
    const userRef = doc(db, 'users', userId);
    const postSnap = await getDoc(postRef);
    const userSnap = await getDoc(userRef);
    if (postSnap.exists() && userSnap.exists()) {
      const userData = userSnap.data();
      if (!userData) throw new Error('User data is undefined');
      const likedPosts = userData.likedPosts || [];
      const dislikedPosts = userData.dislikedPosts || [];
      if (dislikedPosts.includes(postId)) {
        return { status: 'already_disliked' };
      } else {
        if (likedPosts.includes(postId)) {
          await updateDoc(postRef, { likes: increment(-1) });
          await updateDoc(userRef, { likedPosts: arrayRemove(postId) });
        }
        await updateDoc(postRef, { dislikes: increment(1) });
        await updateDoc(userRef, { dislikedPosts: arrayUnion(postId) });
        return { status: likedPosts.includes(postId) ? 'unliked' : 'success' };
      }
    } else {
      throw new Error('Post or user does not exist');
    }
  };
  const getUsers = async () => {
    const usersSnapshot = await getDocs(users);
    const usersData = [];
    for (let doc of usersSnapshot.docs) {
      let user = doc.data();
      user.id = doc.id;
      usersData.push(user);
    }
    return usersData;
  };
  const store = useUsersStore();
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
      getUsers,
      getLikedPosts,
      getDislikedPosts,
      getDisplayName
    }
  };
});
