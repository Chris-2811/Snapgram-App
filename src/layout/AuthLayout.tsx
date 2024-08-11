import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="bg-dark-100 flex flex-1 items-start justify-center pt-40 lg:items-center lg:pt-0">
        <Outlet />
      </div>
      <img
        src="/assets/images/side-img.svg"
        alt=""
        className="hidden h-screen object-cover md:w-1/2 lg:block"
      />
    </div>
  );
}

export default AuthLayout;
