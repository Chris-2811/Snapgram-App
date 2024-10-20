import { INewUser, IPost, IUser, IComment, IReel } from "@/types";
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
  addDoc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { create } from "domain";

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

export async function savePost(userId: string, postId: string) {
  try {
    await setDoc(doc(db, "savedPosts", postId), {
      userId: userId,
      postId: postId,
      createdAt: serverTimestamp(),
    });

    console.log("Post saved successfully");
  } catch (error) {
    console.error("Error saving post", error);
  }
}

export async function deleteSavedPost(userId: string, postId: string) {
  try {
    const q = query(
      collection(db, "savedPosts"),
      where("userId", "==", userId),
      where("postId", "==", postId),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No saved post found");
    }

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post", error);
  }
}

export async function isPostSavedByUser(userId: string, postId: string) {
  try {
    const q = query(
      collection(db, "savedPosts"),
      where("userId", "==", userId),
      where("postId", "==", postId),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking if post is saved", error);
    return false;
  }
}

export async function getSavedPosts({
  userId,
  pageParam,
}: {
  userId: string;
  pageParam: string | null;
}) {
  console.log("userId", userId);
  try {
    let q;

    console.log("pageParam", pageParam);

    if (pageParam) {
      const lastDocSnapshot = await getDoc(doc(db, "savedPosts", pageParam));

      q = query(
        collection(db, "savedPosts"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        startAfter(lastDocSnapshot),
        limit(18),
      );
    } else {
      q = query(
        collection(db, "savedPosts"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(18),
      );
    }

    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);

    console.log("querySnapshot", querySnapshot);

    if (!querySnapshot) throw new Error();

    console.log("querySnapshot", querySnapshot.docs);

    const savedPosts = querySnapshot.docs.map((doc) => doc.data().postId);

    console.log("savedPosts", savedPosts);

    const allSavedPosts = await getPostsByPostIds(savedPosts);

    return allSavedPosts;
  } catch (error) {
    console.error("Error fetching saved posts", error);
    return [];
  }
}

export async function getPostsByPostIds(postIds: string[]) {
  try {
    const colRef = collection(db, "posts");
    const posts: IPost[] = [];

    for (const postId of postIds) {
      const post = await getDoc(doc(colRef, postId));
      if (post.exists()) {
        posts.push(post.data() as IPost);
      }
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts by user ids", error);
    return [];
  }
}

export async function likePost(postId: string, likesArray: string[]) {
  try {
    await updateDoc(doc(db, "posts", postId), {
      likes: likesArray,
    });

    console.log("Post liked successfully");
  } catch (error) {
    console.error("Error liking post", error);
  }
}

export async function deletePost(postId: string) {
  try {
    await deleteDoc(doc(db, "posts", postId));
    await deleteDoc(doc(db, "savedPosts", postId));

    // Query comments related to the postId
    const commentsQuery = query(
      collection(db, "comments"),
      where("postId", "==", postId),
    );

    const commentsSnapshot = await getDocs(commentsQuery);

    // Delete each comment sequentially
    for (const commentDoc of commentsSnapshot.docs) {
      await deleteDoc(doc(db, "comments", commentDoc.id));
    }

    console.log("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post", error);
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

// ====================
// REELS
// ====================

export async function getAllReels({
  pageParam,
  reelLimit,
}: {
  pageParam: string | null;
  reelLimit: number;
}) {
  try {
    let q;

    if (pageParam) {
      const lastDocSnapshot = await getDoc(doc(db, "reels", pageParam));
      q = query(
        collection(db, "reels"),
        orderBy("createdAt", "desc"),
        startAfter(lastDocSnapshot),
        limit(reelLimit),
      );
    } else {
      q = query(
        collection(db, "reels"),
        orderBy("createdAt", "desc"),
        limit(reelLimit),
      );
    }

    const querySnapshot = await getDocs(q);

    if (!querySnapshot) throw new Error();

    const reels = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as IReel[];

    return reels;
  } catch (error) {
    console.error("Error fetching reels", error);
    throw new Error("Failed to fetch reels");
  }
}

export async function getReelsById({
  pageParam,
  userId,
}: {
  pageParam: string | null;
  userId: string;
}) {
  try {
    let q;

    if (pageParam) {
      const lastDocSnapshot = await getDoc(doc(db, "reels", pageParam));

      q = query(
        collection(db, "reels"),
        orderBy("createdAt", "desc"),
        startAfter(lastDocSnapshot),
        limit(10),
      );
    } else {
      q = query(
        collection(db, "reels"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(10),
      );
    }

    const querySnapshot = await getDocs(q);

    if (!querySnapshot) throw new Error();

    const reels = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as IReel[];

    return reels;
  } catch (error) {
    console.log("Error fetching reels by id", error);
    throw new Error("Failed to fetch reels by id");
  }
}
