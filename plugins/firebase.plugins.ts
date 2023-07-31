import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUsersStore } from "@/stores/users";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

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
		measurementId: config.public.FIREBASE_MEASUREMENT_ID,
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	// Get a list of users from the database
	const db = getFirestore(app);
	const users = collection(db, "users");
	const storage = getStorage(app);

	// Get a list of posts from the database
	const posts = collection(db, "posts");

	// get Doc function

	// Specify the path to the image relative to the root of your Firebase Storage
	const imagePath = "images/alsoyes.webp";

	// Create a reference to the image
	const imageRef = ref(storage, imagePath);

	// Add post, has to have a title but content and image are optional
	const addPost = async (title: string, content: string, imageUrl: string) => {
		try {
			const docRef = await addDoc(posts, {
				title,
				content,
        imageUrl,
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	const getPosts = async () => {
		const postsSnapshot = await getDocs(posts);
		const postData = postsSnapshot.docs.map((doc) => doc.data());
    return postData;
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
			store.user = "";
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
		},
	};
});
