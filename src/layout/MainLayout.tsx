import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/shared/_main/LeftSidebar";
import Topbar from "@/components/shared/_main/Topbar";

function MainLayout() {
  return (
    <div>
      <Topbar />
      <LeftSidebar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
