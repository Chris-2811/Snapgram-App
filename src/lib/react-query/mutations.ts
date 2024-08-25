import { createUserAccount, logInAccount, saveUserToDB } from "../firebase/api";
import { useMutation } from "@tanstack/react-query";
import { INewUser } from "@/types";
import { Timestamp } from "firebase/firestore";

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
