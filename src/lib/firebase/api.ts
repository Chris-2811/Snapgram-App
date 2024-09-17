import { INewUser, IPost, IUser, IComment } from "@/types";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  sendEmailVerification,
} from "firebase/auth";
import {
  setDoc,
  getDoc,
  Timestamp,
  doc,
  query,
  orderBy,
  startAfter,
  collection,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { send } from "process";

// ====================
// AUTH
// ====================

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    );

    if (!newAccount) throw Error;

    const newUser = {
      email: user.email,
      userId: newAccount.user.uid,
      bio: "",
      photoUrl: "",
      username: "",
      name: user.name,
      createdAt: Timestamp.now(),
    };

    const userDocRef = doc(db, "users", newAccount.user.uid);
    await setDoc(userDocRef, newUser);

    return newUser;
  } catch (error) {
    console.error("Error creating user account", error);
    throw error;
  }
}

export async function logInAccount(user: { email: string; password: string }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    );

    await setPersistence(auth, browserSessionPersistence);
    return userCredential;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCurrentUser(docId: string) {
  try {
    if (!docId) {
      throw new Error("No user found");
    }
    const docRef = doc(db, "users", docId);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      throw new Error("No user found");
    }

    return docSnapshot.data() as IUser;
  } catch (error) {
    console.error("Error getting current user", error);
    return null;
  }
}

export async function saveUserToDB(user: {
  userId: string;
  email: string;
  bio: string;
  photoUrl: string;
  username: string;
  name: string;
  createdAt: Timestamp;
}) {
  try {
    const docRef = doc(db, "users", user.userId);
    await setDoc(docRef, user);
  } catch (error) {
    console.error("Error saving user to DB", error);
  }
}

export async function logOutUser() {
  try {
    // Log out the user
    await signOut(auth);
    // Redirect to the login page
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

// ====================
// POSTS
// ====================

export async function getPosts({
  pageParam,
  postLimit,
}: {
  pageParam: string | null;
  postLimit: number;
}) {
  try {
    let q;

    if (pageParam) {
      const lastDocSnapshot = await getDoc(doc(db, "posts", pageParam));

      q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        startAfter(lastDocSnapshot),
        limit(postLimit),
      );
    } else {
      q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(postLimit),
      );
    }

    const querySnapshot = await getDocs(q);

    console.log("querySnapshot", querySnapshot);

    if (!querySnapshot) throw new Error();

    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as IPost[];

    console.log("posts", posts);

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getPostById(postId: string) {
  if (!postId) throw Error;

  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IPost;
  } else {
    throw new Error("No such document!");
  }
}

export async function getPostsById(
  userId: string | undefined,
  pageParam: string | null,
) {
  if (!userId) {
    console.error("No user found");
    throw new Error("No user found");
  }

  try {
    let q;

    if (pageParam) {
      const lastDocSnapshot = await getDoc(doc(db, "posts", pageParam));

      if (!lastDocSnapshot.exists()) {
        throw new Error("Last document snapshot does not exist.");
      }

      q = query(
        collection(db, "posts"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        startAfter(lastDocSnapshot),
        limit(10),
      );
    } else {
      q = query(
        collection(db, "posts"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(10),
      );
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as IPost[];

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // or handle this error according to your use case
  }
}

// ====================
// USERS
// ====================

export async function getUserById(userId: string | undefined) {
  if (!userId) throw Error;
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IUser;
  } else {
    throw new Error("No such document!");
  }
}

export async function getUsers({ pageParam }: { pageParam: string | null }) {
  let q;

  if (pageParam) {
    const lastDocSnapshot = await getDoc(doc(db, "users", pageParam));

    q = query(
      collection(db, "users"),
      orderBy("createdAt"),
      startAfter(lastDocSnapshot),
      limit(10),
    );
  } else {
    q = query(collection(db, "users"), orderBy("createdAt"), limit(10));
  }

  const querySnapshot = await getDocs(q);

  if (!querySnapshot) throw new Error();

  const users = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as IUser[];

  return users;
}

// ====================
// COMMENTS
// ====================

export async function getCommentsByPostId(postId: string) {
  console.log("postId", postId);
  if (!postId) throw Error;

  try {
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("timestamp", "desc"),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot) throw new Error();

    const comments = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as IComment),
    }));

    console.log(comments);

    return comments;
  } catch (error) {
    console.error("Error fetching comments", error);
  }
}
