import { Timestamp } from "firebase/firestore";

export interface IUser {
  userId: string;
  email: string;
  bio: string;
  photoUrl: string;
  username: string;
  name: string;
  createdAt: string;
}

export interface INewUser {
  email: string;
  password: string;
  name: string;
}

export interface IErrors {
  email: string;
  password: string;
  name: string;
}

export interface ILoginErrors {
  email: string;
  password: string;
}

export interface IPost {
  caption: string;
  createdAt: string;
  location: string;
  photoUrls: string[];
  postId: string;
  tags: string[];
  userId: string;
  likes?: string[] | [];
}

export interface IComment {
  commentId: string;
  postId: string;
  text: string;
  userId: string;
}

export interface IReel {
  videoUrl: string;
  caption: string;
  likes: string[];
  userId: string;
  tags: string[];
  createdAt: string;
  played: number;
  reelId: string;
}
