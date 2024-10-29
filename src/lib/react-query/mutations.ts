import {
  createUserAccount,
  logInAccount,
  saveUserToDB,
  savePost,
  likePost,
  followUser,
  unfollowUser,
  likeReel,
  saveReel,
} from "../firebase/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INewUser, IPost } from "@/types";
import { Timestamp } from "firebase/firestore";
import { QUERY_KEYS } from "./queryKeys";
import { deleteSavedPost, deletePost } from "../firebase/api";

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
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      savePost(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS_BY_ID],
      });
    },
  });
};

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      deleteSavedPost(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      });
    },
  });
};

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
export const useLikeReel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reelId,
      likesArray,
    }: {
      reelId: string;
      likesArray: string[];
    }) => likeReel(reelId, likesArray),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REELS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REELS_BY_ID],
      });
    },
  });
};
export const useSaveReel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, reelId }: { userId: string; reelId: string }) =>
      saveReel(userId, reelId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_REELS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REELS_BY_ID],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
    },
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      followedUserId,
    }: {
      userId: string;
      followedUserId: string;
    }) => followUser({ userId, followedUserId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      followedUserId,
    }: {
      userId: string;
      followedUserId: string;
    }) => unfollowUser({ userId, followedUserId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
