import {
  createUserAccount,
  logInAccount,
  saveUserToDB,
  savePost,
  likePost,
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
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS_BY_ID],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS_BY_IDS],
      });
    },
  });
};
