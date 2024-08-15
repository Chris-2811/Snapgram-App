import React from "react";
import { Button } from "@/components/ui/button";
import { Timestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  browserSessionPersistence,
  setPersistence,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useSaveUserToDB } from "@/lib/react-query/mutations";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

function OAuth() {
  const { pathname } = useLocation();
  const { mutateAsync: saveUserToDB } = useSaveUserToDB();
  const navigate = useNavigate();
  const { toast } = useToast();

  const provider = new GoogleAuthProvider();

  async function onGoogleClick() {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email || !user.displayName) {
        throw new Error("Missing user information");
      }

      const newUser = {
        email: user.email,
        id: user.uid,
        bio: "",
        photoUrl: "",
        username: "",
        name: user.displayName,
        createdAt: Timestamp.now(),
      };

      await saveUserToDB(newUser);
      await sendEmailVerification(user);
      navigate("/");
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        variant: "destructive",
        description: `There was a problem ${
          pathname === "/log-in" ? "signing in" : "signing up"
        } with Google.`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <>
      <Button variant="oAuth" size="md" type="button" onClick={onGoogleClick}>
        <div className="flex items-center gap-3">
          <img src="/assets/icons/google.svg" alt="google-icon" />
          <p>
            {pathname === "/log-in"
              ? "Sign in with Google"
              : "Sign up with Google"}
          </p>
        </div>
      </Button>
    </>
  );
}

export default OAuth;
