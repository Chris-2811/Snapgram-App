import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getUsers,
  getPosts,
  getUserById,
  getPostById,
  getPostsById,
  getCommentsByPostId,
  getSavedPosts,
  getAllReels,
  getReelsById,
} from "../firebase/api";

export const useGetUserById = (userId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useGetUsers = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_USERS, null],
    queryFn: ({ pageParam = 0 }) => getUsers({ pageParam }), // Pass pageParam to getUsers
    getNextPageParam: (lastPage: any) => {
      if (lastPage.length < 10) {
        return undefined; // Return undefined instead of null when there are
      }

      const lastId = lastPage[lastPage.length - 1]?.userId;

      if (!lastId) {
        console.error("Last user ID not found");
        return undefined;
      }

      return lastId;
    },
    initialPageParam: null,
  });
};

export const useGetPosts = (postLimit: number) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POSTS, null],
    queryFn: ({ pageParam = null }) => getPosts({ pageParam, postLimit }), // Pass pageParam to getPosts
    getNextPageParam: (lastPage: any) => {
      if (lastPage.length < postLimit) {
        return undefined; // Return undefined instead of null when there are
      }

      const lastId = lastPage[lastPage.length - 1]?.postId;
      return lastId;
    },
    initialPageParam: null,
  });
};

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useGetPostsById = (userId: string | undefined) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_BY_ID, userId],
    queryFn: ({ pageParam = null }) => getPostsById(userId, pageParam), // Pass pageParam to getPostsById
    getNextPageParam: (lastPage: any) => {
      if (lastPage && lastPage.length < 10) {
        return undefined; // Return undefined instead of null when there are
      }

      const lastId = lastPage[lastPage.length - 1]?.postId;

      if (!lastId) {
        console.error("Last post ID not found");
        return undefined;
      }

      return lastId;
    },
    initialPageParam: null,
    enabled: !!userId,
  });
};

export const useGetCommentsByPostId = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_COMMENTS_BY_POST_ID, postId],
    queryFn: () => getCommentsByPostId(postId),
    enabled: !!postId,
  });
};

export const useGetSavedPosts = (userId: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS, userId],
    queryFn: ({ pageParam = null }) => getSavedPosts({ userId, pageParam }),
    enabled: !!userId,
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => {
      if (lastPage.length < 18) {
        return undefined;
      }

      const lastId = lastPage[lastPage.length - 1]?.postId;

      if (!lastId) {
        console.error("Last post ID not found");
        return undefined;
      }

      return lastId;
    },
  });
};

export const useGetAllReels = (reelLimit: number) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_REELS, null],
    queryFn: ({ pageParam = null }) => getAllReels({ pageParam, reelLimit }), // Pass pageParam to getPosts
    getNextPageParam: (lastPage: any) => {
      if (lastPage.length < 9) {
        return undefined; // Return undefined instead of null when there are
      }

      const lastId = lastPage[lastPage.length - 1]?.reelId;

      if (!lastId) {
        console.error("Last reel ID not found");
        return undefined;
      }
      return lastId;
    },
    initialPageParam: null,
  });
};

export const useGetReelsById = (id: string | undefined) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_REELS_BY_ID, id],
    queryFn: ({ pageParam = null }) => getReelsById({ pageParam, userId: id }),
    getNextPageParam: (lastPage: any) => {
      if (lastPage && lastPage.length < 10) {
        return undefined;
      }

      const lastId = lastPage[lastPage.length - 1]?.postId;

      if (!lastId) {
        console.error("Last post ID not found");
        return undefined;
      }

      return lastId;
    },
    initialPageParam: null,
  });
};
