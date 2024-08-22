import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getUsers, getPosts, getUserById } from "../firebase/api";

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
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

      const lastId = lastPage[lastPage.length - 1]?.id;

      if (!lastId) {
        console.error("Last user ID not found");
        return undefined;
      }

      return lastId;
    },
    initialPageParam: null,
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POSTS, null],
    queryFn: ({ pageParam = 0 }) => getPosts({ pageParam }), // Pass pageParam to getPosts
    getNextPageParam: (lastPage: any) => {
      if (lastPage.length < 10) {
        return undefined; // Return undefined instead of null when there are
      }

      const lastId = lastPage[lastPage.length - 1]?.id;

      if (!lastId) {
        console.error("Last post ID not found");
        return undefined;
      }

      return lastId;
    },
    initialPageParam: null,
  });
};
