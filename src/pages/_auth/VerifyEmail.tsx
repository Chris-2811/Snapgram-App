import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase/firebase";
import React from "react";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();
  async function handleConfirmEmail() {
    const currentUser = auth.currentUser;

    if (currentUser) {
      await currentUser.reload();

      if (currentUser.emailVerified) {
        navigate("/");
      } else {
        toast({
          title: "Email not verified",
          description: "Please verify your email to continue",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center px-5 text-center">
        <img
          src="public/assets/icons/check.png"
          alt="check-icon"
          className="h-[130px] w-[130px] lg:h-[200px] lg:w-[200px]"
        />
        <h1 className="heading-sm lg:heading-lg mb-5 mt-4 lg:mt-5">
          Verifiy your email
        </h1>
        <div className="max-w-[350px]">
          <p className="text-base leading-normal">
            We have sent you an email to verify your account. Please check your
            inbox.
          </p>
          <p className="mt-2">
            After receiving the email, follow the link provided to complete your
            registration.
          </p>
          <Button
            className="mt-6 h-11 w-full max-w-xs lg:mt-8"
            variant="confirm"
            onClick={handleConfirmEmail}
          >
            Confirm email
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
