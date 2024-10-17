import React, { useEffect } from "react";
import Searchbar from "@/components/shared/_main/Searchbar";
import Filter from "@/components/shared/_main/Filter";
import { useGetPosts } from "@/lib/react-query/queries";
import PostList from "@/components/shared/_main/PostList";
import { IPost, IReel } from "@/types";
import { useInView } from "react-intersection-observer";
import { useGetAllReels } from "@/lib/react-query/queries";
import { useState } from "react";
import MediaList from "@/components/shared/_main/MediaList";

function Explore() {
  const {
    data: posts,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts(18);
  const [showSearch, setShowSearch] = React.useState<boolean>(true);
  const {
    data: reels,
    fetchNextPage: fetchNextReelPage,
    hasNextPage: hasNextReelPage,
  } = useGetAllReels(20);
  const [allMediaItems, setAllMediaItems] = useState<(IPost | IReel)[]>([]);

  const { ref, inView } = useInView();

  useEffect(() => {
    const updatedMediaItems = combineMediaItems(flattenedPosts, flattenedReels);
    setAllMediaItems(updatedMediaItems);
  }, [posts, reels]);

  useEffect(() => {
    if (inView && posts) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  console.log("posts", posts);
  console.log("reels", reels);

  const flattenedPosts: IPost[] = posts?.pages.flatMap((page) => page) || [];
  const flattenedReels: IReel[] = reels?.pages.flatMap((page) => page) || [];

  const combineMediaItems = (posts: IPost[], reels: IReel[]) => {
    let combined: (IPost | IReel)[] = [];
    let reelIndex = 0;

    for (let i = 0; i < posts.length; i += 18) {
      // Push the next 18 posts
      const postSlice = posts.slice(i, i + 18);
      combined.push(...postSlice);

      if (reelIndex < reels.length) {
        const reelSlice = reels.slice(reelIndex, reelIndex + 2);
        reelIndex += 2;

        // Insert each reel at a random index in the current post slice
        reelSlice.forEach((reel) => {
          const randomIndex = Math.floor(
            Math.random() * (postSlice.length + 1),
          );
          combined.splice(i + randomIndex, 0, reel); // Insert at a random spot within the current 18 posts
        });
      }
    }

    return combined;
  };

  console.log("allMediaItems", allMediaItems);

  return (
    <div className="mx-auto max-w-[1550px] px-5 pt-6 md:px-8 md:pt-8 lg:px-[3.1875rem] lg:pt-[4.375rem] 5xl:pl-20">
      {showSearch && (
        <>
          <div className="mx-auto flex max-w-sm flex-col text-center md:max-w-md lg:max-w-lg xl:max-w-[657px]">
            <h1 className="heading-sm md:heading-md lg:heading-lg mb-6 md:mb-[1.875rem]">
              Search
            </h1>
            <Searchbar />
            {/* Implement Tags */}
            <ul className="mt-4 flex w-full items-center justify-center gap-4 md:mt-5 lg:mt-[1.625rem]"></ul>
          </div>
          <div className="mt-6 flex items-center justify-between md:mt-8 lg:mt-9">
            <h2 className="heading-sm md:heading-md">Popular Today</h2>
            <Filter />
          </div>
        </>
      )}
      <div className="pt-5 md:pt-6 lg:pt-9">
        <MediaList mediaItems={allMediaItems} />
        {hasNextPage && (
          <div ref={ref} className="my-10 flex items-center justify-center">
            <div className="loader animate-spin">
              <img src="assets/icons/loader.svg" alt="loader" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
