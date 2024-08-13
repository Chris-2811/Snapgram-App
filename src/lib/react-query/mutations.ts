import { createUserAccount } from "../firebase/api";
import { useMutation } from "@tanstack/react-query";
import { INewUser } from "@/types";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
