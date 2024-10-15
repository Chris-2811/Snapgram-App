import { set } from "date-fns";
import React from "react";

function TabbarReels({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleTabClick(e: React.MouseEvent) {
    setActiveTab(e.currentTarget.id);
  }

  return (
    <div>
      <div className="item-center flex rounded-[10px] border border-light-400 border-opacity-50 text-xs font-medium md:text-sm lg:text-base">
        <div
          id="for-you"
          onClick={handleTabClick}
          className={`${
            activeTab === "for-you" && "bg-dark-400"
          } flex w-1/3 cursor-pointer items-center justify-center gap-2 text-nowrap border-r border-r-light-400 border-opacity-40 px-2 py-3 xs:px-5 sm:w-auto sm:px-6 md:gap-[0.625rem] md:px-10 xl:px-[3.125rem]`}
        >
          <p>For you</p>
        </div>
        <div
          id="following"
          onClick={handleTabClick}
          className={`${
            activeTab === "following" && "bg-dark-400"
          } flex w-1/3 cursor-pointer items-center justify-center gap-2 text-nowrap border-r border-r-light-400 border-opacity-40 px-2 py-3 xs:px-5 sm:w-auto sm:px-6 md:gap-[0.625rem] md:px-10 xl:px-[3.125rem]`}
        >
          <p>Following</p>
        </div>
        <div
          id="popular"
          onClick={handleTabClick}
          className={`${
            activeTab === "popular" && "bg-dark-400"
          } flex w-1/3 cursor-pointer items-center justify-center gap-2 text-nowrap border-r border-r-light-400 border-opacity-40 px-2 py-3 xs:px-5 sm:w-auto sm:px-6 md:gap-[0.625rem] md:px-10 xl:px-[3.125rem]`}
        >
          <p>Popular</p>
        </div>
        <div
          id="featured"
          onClick={handleTabClick}
          className={`${
            activeTab === "featured" && "bg-dark-400"
          } flex w-1/3 cursor-pointer items-center justify-center gap-2 text-nowrap border-r border-r-light-400 border-opacity-40 px-2 py-3 xs:px-5 sm:w-auto sm:px-6 md:gap-[0.625rem] md:px-10 xl:px-[3.125rem]`}
        >
          <p>Featured</p>
        </div>
      </div>
    </div>
  );
}

export default TabbarReels;
