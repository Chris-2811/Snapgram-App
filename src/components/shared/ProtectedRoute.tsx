import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // Display loading state while checking authentication status
  if (isLoading)
    return (
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 grid place-items-center bg-dark-200">
        <img src="/assets/images/logo.svg" alt="company-logo" />
      </div>
    );

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) return <Navigate to="/log-in" />;

  // Render the protected content
  return <Outlet />;
}

export default ProtectedRoute;
