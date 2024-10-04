import { initializeApp } from "firebase/app";
import { deleteDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { useGetUsers } from "../react-query/queries";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";

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

async function fetchAllUserIds() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const userIds = querySnapshot.docs.map((doc) => doc.id);

  return userIds;
}

async function fetchAllPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const posts = querySnapshot.docs.map((doc) => doc.data());

  return posts;
}

function getRandomSubset(array: string[], size: number): string[] {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, size);
}

async function distributeRandomLikes() {
  const userIds = await fetchAllUserIds();
  const posts = await fetchAllPosts();

  for (const post of posts) {
    // Generate a random number of likes between 1 and 60
    const randomLikesCount = Math.floor(Math.random() * 60) + 1;
    const randomLikes = getRandomSubset(userIds, randomLikesCount);

    await updateDoc(doc(db, "posts", post.postId), {
      likes: randomLikes,
    });

    console.log(`Post ${post.postId} liked by ${randomLikesCount} users`);
  }
}

/* distributeRandomLikes(); */

/* const allPosts = await fetchAllPosts();

console.log(allPosts);
 */
