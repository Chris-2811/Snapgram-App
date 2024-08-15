import { createContext, useState } from "react";
import { IUser } from "@/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase/api";

const INITIAL_USER = {
  id: "",
  email: "",
  bio: "",
  photoUrl: "",
  username: "",
  name: "",
  createdAt: "",
};

const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  /* checkAuthUser: async () => false, */
};

interface IContext {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  /* checkAuthUser: () => Promise<boolean>; */
}

export const AuthContext = createContext<IContext>(INITIAL_STATE);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser: User | null) => {
        setIsLoading(true);
        try {
          if (currentUser && currentUser.emailVerified) {
            console.log("Current User:", currentUser);
            const userData = await getCurrentUser();
            if (userData) {
              setUser(userData);
              setIsAuthenticated(true);
            }
          } else {
            setUser(INITIAL_USER);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      },
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
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
