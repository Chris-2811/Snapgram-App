import { INewUser, IUser } from "@/types";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, getDoc, Timestamp, doc } from "firebase/firestore";

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
      id: newAccount.user.uid,
      bio: "",
      photoUrl: "",
      username: "",
      name: "",
      createdAt: Timestamp.now(),
    };

    const userDocRef = doc(db, "users", newAccount.user.uid);
    await setDoc(userDocRef, newUser);

    await sendEmailVerification(newAccount.user);
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

export async function getCurrentUser(): Promise<IUser | null> {
  try {
    const docId = auth.currentUser?.uid;
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
  id: string;
  email: string;
  bio: string;
  photoUrl: string;
  username: string;
  name: string;
  createdAt: Timestamp;
}) {
  try {
    const docRef = doc(db, "users", user.id);
    await setDoc(docRef, user);
  } catch (error) {
    console.error("Error saving user to DB", error);
  }
}

// ====================
// POSTS
// ====================
