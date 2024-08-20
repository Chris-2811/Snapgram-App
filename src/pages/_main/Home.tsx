import React from "react";
import TopCreators from "@/components/Home/TopCreators";

function Home() {
  return (
    <div className="flex justify-between">
      <div className="min-h-screen flex-1 border border-green-400"></div>
      <TopCreators />
    </div>
  );
}

export default Home;
