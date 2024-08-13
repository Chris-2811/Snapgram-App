import { INewUser } from "@/types";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

// ====================
// POSTS
// ====================
