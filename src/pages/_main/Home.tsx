import React from "react";
import TopCreators from "@/components/Home/TopCreators";
import HomeFeed from "@/components/Home/HomeFeed";
import StoriesSlider from "@/components/Home/StoriesSlider";

function Home() {
  return (
    <div className="flex justify-between">
      <div className="flex min-h-screen flex-1 flex-col border border-green-400 px-4 md:px-10 lg:px-[3.25rem] xl:px-[5rem] 3xl:px-[6rem]">
        <StoriesSlider />
        <HomeFeed />
      </div>
      <TopCreators />
    </div>
  );
}

export default Home;
