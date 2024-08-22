import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import {
  createPosts,
  createRandomUser,
  createUsers,
  fetchDummyPostPhotos,
} from "./dummyData";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Connect to the Authentication emulator

/* Dummy Data */
const shouldCreateDummyUsers =
  import.meta.env.VITE_REACT_APP_CREATE_DUMMY_USERS === "true";

if (shouldCreateDummyUsers) {
  await createUsers();
}
/* Dummy Data Posts */

const shouldCreateDummyPosts =
  import.meta.env.VITE_REACT_APP_CREATE_DUMMY_POSTS === "true";

if (shouldCreateDummyPosts) {
  await createPosts();
}
