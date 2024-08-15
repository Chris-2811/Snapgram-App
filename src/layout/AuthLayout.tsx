import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

function AuthLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="flex h-screen flex-col md:flex-row">
          <div className="flex flex-1 items-start justify-center bg-dark-100 pt-40 lg:items-center lg:pt-0">
            <Outlet />
          </div>
          <img
            src="/assets/images/side-img.svg"
            alt=""
            className="hidden h-screen object-cover md:w-1/2 lg:block"
          />
        </div>
      )}
    </>
  );
}

export default AuthLayout;
