import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Tabbar({
  setActive,
  isActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<string>>;
  isActive: string;
}) {
  const { pathname } = useLocation();

  function handleTabClick(e: React.MouseEvent) {
    setActive(e.currentTarget.id);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex w-full items-center gap-0 overflow-hidden rounded-[10px] border border-light-400 border-opacity-50 bg-dark-300 sm:w-auto sm:max-w-md">
        {pathname === "/reels" ? (
          <></>
        ) : (
          <>
            <div
              id="posts"
              onClick={handleTabClick}
              className={`${
                isActive === "posts" && "bg-dark-400"
              } flex w-1/3 cursor-pointer items-center justify-center gap-2 text-nowrap border-r border-r-light-400 border-opacity-40 px-3 py-3 xs:px-5 sm:w-auto sm:px-6 md:gap-[0.625rem] md:px-10 xl:px-[3.125rem]`}
            >
              <img
                src="/assets/icons/posts.svg"
                alt="posts"
                className="w-4 md:w-5"
              />
              <p className="text-xs font-medium md:text-sm lg:text-base">
                Posts
              </p>
            </div>
            <div
              id="reels"
              onClick={handleTabClick}
              className={`${
                isActive === "reels" && "bg-dark-400"
              } flex w-1/3 cursor-pointer items-center justify-center gap-2 text-nowrap px-3 py-3 xs:px-5 sm:w-auto sm:px-6 md:gap-[0.625rem] md:px-10 xl:px-[3.125rem]`}
            >
              <img
                src="/assets/icons/play.svg"
                alt="reels"
                className="w-4 md:w-5"
              />
              <p className="text-xs font-medium md:text-sm lg:text-base">
                Reels
              </p>
            </div>
            {pathname === "/saved-posts" ? (
              <div
                id="collections"
                onClick={handleTabClick}
                className={`${
                  isActive === "collections" && "bg-dark-400"
                } flex w-1/3 cursor-pointer items-center justify-center gap-2 text-nowrap border-l border-l-light-400 border-opacity-50 px-3 py-3 xs:px-5 sm:w-auto sm:px-6 md:gap-[0.625rem] md:px-10 xl:px-[3.125rem]`}
              >
                <img
                  src="/assets/icons/folder-favorite.svg"
                  alt="collection"
                  className="w-4 md:w-5"
                />
                <p className="text-xs font-medium md:text-sm lg:text-base">
                  Collections
                </p>
              </div>
            ) : (
              <div
                id="collections"
                onClick={handleTabClick}
                className={`${
                  isActive === "collections" && "bg-dark-400"
                } flex w-1/3 cursor-pointer items-center justify-center gap-2 text-nowrap border-l border-l-light-400 border-opacity-50 px-3 py-3 xs:px-5 sm:w-auto sm:px-6 md:gap-[0.625rem] md:px-10 xl:px-[3.125rem]`}
              >
                <img
                  src="/assets/icons/tag.svg"
                  alt="collection"
                  className="w-4 md:w-5"
                />
                <p className="text-xs font-medium md:text-sm lg:text-base">
                  Tagged
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Tabbar;
