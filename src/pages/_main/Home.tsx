import React from "react";
import TopCreators from "@/components/Home/TopCreators";
import HomeFeed from "@/components/Home/HomeFeed";

function Home() {
  return (
    <div className="flex justify-between">
      <div className="flex min-h-screen flex-1 border border-green-400">
        <HomeFeed />
      </div>
      <TopCreators />
    </div>
  );
}

export default Home;
