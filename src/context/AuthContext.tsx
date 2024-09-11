import { createContext, useState } from "react";
import { IUser } from "@/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase/api";

const INITIAL_USER = {
  userId: "",
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
  isLoading: true,
  setUser: () => {},
  setIsAuthenticated: () => {},
};

interface IContext {
  user: IUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IContext>(INITIAL_STATE);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser: User | null) => {
        setIsLoading(true);
        try {
          if (currentUser && currentUser.emailVerified) {
            const user = await getCurrentUser(currentUser.uid);

            if (user) {
              setUser(user);
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
