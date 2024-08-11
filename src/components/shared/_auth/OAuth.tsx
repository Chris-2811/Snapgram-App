import React from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

function OAuth() {
  const { pathname } = useLocation();

  return (
    <>
      <Button variant="oAuth" size="md" type="button">
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
