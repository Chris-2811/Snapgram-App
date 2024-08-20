import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/shared/_main/LeftSidebar";

function MainLayout() {
  return (
    <div>
      <LeftSidebar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
