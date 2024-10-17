import React, { useState } from "react";
import Reel from "@/components/shared/_main/Reel";
import ReelList from "@/components/shared/_main/ReelList";
import { useGetAllReels } from "@/lib/react-query/queries";
import Searchbar from "@/components/shared/_main/Searchbar";
import Tabbar from "@/components/ui/Tabbar";
import Filter from "@/components/shared/_main/Filter";
import TabbarReels from "@/components/Reels/TabbarReels";
import HashtagBatch from "@/components/ui/hashtag-batch";
import { Button } from "@/components/ui/button";

function Reels() {
  const [activeTab, setActiveTab] = useState("for-you");
  const { data: reels, hasNextPage, fetchNextPage } = useGetAllReels(9);

  const flatReels = reels ? reels?.pages.flatMap((page) => page) : [];

  return (
    <div className="mx-auto px-4 pb-6 pt-6 sm:max-w-[580px] sm:pt-9 md:max-w-none md:px-8 md:pb-14 md:pt-[3.5rem] lg:max-w-[1552px] lg:pt-[4.375rem] xl:px-[3.75rem]">
      <div className="mb-4">
        <div className="flex-center gap-[0.375rem]">
          <img
            src="/assets/icons/play.svg"
            alt="play-icon"
            className="invert-white md:w-7 lg:w-9"
          />
          <h1 className="lg:heading-lg heading-sm md:heading-md">
            Search Reels
          </h1>
        </div>
        <div className="mx-auto mb-4 mt-5 max-w-md md:mb-5 md:mt-6 lg:mb-7 lg:mt-[1.875rem] lg:max-w-xl 2xl:max-w-[657px]">
          <Searchbar />
        </div>

        <div className="flex items-center justify-center gap-3">
          <HashtagBatch title="mountains" />
          <HashtagBatch title="webdevelopment" />
          <div className="hidden lg:block">
            <HashtagBatch title="funny" />
          </div>
          <div className="hidden lg:block">
            <HashtagBatch title="modelling" />
          </div>
        </div>
      </div>
      <div className="mt-12 lg:mt-[4.375rem]">
        <div className="flex w-full justify-between">
          <TabbarReels activeTab={activeTab} setActiveTab={setActiveTab} />
          <Filter className="px-3 text-[0.625rem] xs:text-xs" />
        </div>
        <div className="mt-6 md:mt-8 lg:mt-9">
          <div>
            <ReelList reels={flatReels} />
            {hasNextPage && (
              <div className="flex justify-center">
                <Button
                  onClick={() => fetchNextPage()}
                  className="mt-10 w-[132px] rounded-md border border-light-300/70 bg-dark-400 text-white"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reels;
