import { createContext, useState } from "react";
import { IUser } from "@/types";

export const INITIAL_USER = {
  id: "",
  email: "",
  bio: "",
  photoUrl: "",
  username: "",
  name: "",
  createdAt: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isAuthenticated: false,
  isLoading: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  /* checkAuthUser: async () => false, */
};

interface IContext {
  user: IUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  /* checkAuthUser: () => Promise<boolean>; */
}

const AuthContext = createContext<IContext>(INITIAL_STATE);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    /* checkAuthUser */
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
