import {
  createUserAccount,
  logInAccount,
  saveUserToDB,
  savePost,
} from "../firebase/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INewUser, IPost } from "@/types";
import { Timestamp } from "firebase/firestore";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useLogInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      logInAccount(user),
  });
};

export const useSaveUserToDB = () => {
  return useMutation({
    mutationFn: (user: {
      userId: string;
      email: string;
      bio: string;
      photoUrl: string;
      username: string;
      name: string;
      createdAt: Timestamp;
    }) => saveUserToDB(user),
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IPost) => savePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
    },
  });
};
