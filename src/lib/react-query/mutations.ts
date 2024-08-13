import { createUserAccount, logInAccount } from "../firebase/api";
import { useMutation } from "@tanstack/react-query";
import { INewUser } from "@/types";

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
