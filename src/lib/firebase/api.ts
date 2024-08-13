import { INewUser } from "@/types";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";

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

    const newUser = await addDoc(collection(db, "users"), {
      email: user.email,
      id: newAccount.user.uid,
      bio: "",
      photoUrl: "",
      username: "",
      name: "",
      createdAt: Timestamp.now(),
    });

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

    if (!userCredential) throw Error;

    return userCredential;
  } catch (error) {
    console.log(error);
  }
}

// ====================
// POSTS
// ====================
