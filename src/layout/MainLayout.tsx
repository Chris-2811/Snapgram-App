import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/shared/_main/LeftSidebar";
import Topbar from "@/components/shared/_main/Topbar";
import Bottombar from "@/components/shared/_main/Bottombar";

function MainLayout() {
  return (
    <div>
      <Topbar />
      <Bottombar />
      <LeftSidebar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
