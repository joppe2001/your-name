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
      post.id = doc.id; // include the document ID here
      post.likes = await getLikesForPost(post.id); // add likes for each post here
      post.dislikes = await getDislikesForPost(post.id); // add dislikes for each post here
      postData.push(post);
    }
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
  
      if (likedPosts.includes(postId)) {
        return { status: 'already_liked' };
      } else {
        if (dislikedPosts.includes(postId)) {
          // If the user has previously disliked the post, undo the dislike
          await updateDoc(postRef, {
            dislikes: increment(-1)
          });
          await updateDoc(userRef, {
            dislikedPosts: arrayRemove(postId)
          });
        }
        // Then, proceed with liking the post
        await updateDoc(postRef, {
          likes: increment(1)
        });
        await updateDoc(userRef, {
          likedPosts: arrayUnion(postId)
        });
  
        // If the post was previously disliked, return 'undisliked'. Otherwise, return 'success'.
        return { status: dislikedPosts.includes(postId) ? 'undisliked' : 'success' };
      }
    } else {
      throw new Error('Post or user does not exist');
    }
  };

  const dislikePost = async (postId: string, userId: string) => {
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
  
      if (dislikedPosts.includes(postId)) {
        return { status: 'already_disliked' };
      } else {
        if (likedPosts.includes(postId)) {
          // If the user has previously liked the post, undo the like
          await updateDoc(postRef, {
            likes: increment(-1)
          });
          await updateDoc(userRef, {
            likedPosts: arrayRemove(postId)
          });
        }
        // Then, proceed with disliking the post
        await updateDoc(postRef, {
          dislikes: increment(1)
        });
        await updateDoc(userRef, {
          dislikedPosts: arrayUnion(postId)
        });
  
        // If the post was previously liked, return 'unliked'. Otherwise, return 'success'.
        return { status: likedPosts.includes(postId) ? 'unliked' : 'success' };
      }
    } else {
      throw new Error('Post or user does not exist');
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
      dislikePost
    }
  };
});
