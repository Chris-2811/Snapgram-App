import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/shared/_main/LeftSidebar";
import Topbar from "@/components/shared/_main/Topbar";
import Bottombar from "@/components/shared/_main/Bottombar";

function MainLayout() {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="flex-1">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
}

export default MainLayout;
