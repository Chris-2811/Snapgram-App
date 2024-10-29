import Tabbar from "@/components/ui/Tabbar";
import React, { useContext, useEffect, useState } from "react";
import Filter from "@/components/shared/_main/Filter";
import { useGetSavedPosts, useGetSavedReels } from "@/lib/react-query/queries";
import { AuthContext } from "@/context/AuthContext";
import PostList from "@/components/shared/_main/PostList";
import { useGetPostsById, useGetReelsById } from "@/lib/react-query/queries";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import ReelList from "@/components/shared/_main/ReelList";

function SavedPosts() {
  const [isActive, setActive] = React.useState("posts");
  const [showFeed, setShowFeed] = useState<boolean>(false);
  const { user, isLoading } = useContext(AuthContext);
  const {
    data: savedPosts,
    isLoading: isLoadingSavedPosts,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetSavedPosts(user.userId);
  const { data: savedReels, isLoading: isLoadingSavedReels } = useGetSavedReels(
    user.userId,
  );

  console.log(savedPosts);
  console.log("saved", savedReels);

  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  console.log(savedPosts?.pages);

  const allPosts = savedPosts ? savedPosts?.pages?.flatMap((page) => page) : [];
  const allReels = savedReels ? savedReels?.pages?.flatMap((page) => page) : [];

  function handleLoadMore() {
    fetchNextPage();
  }

  return (
    <>
      {isLoading || isLoadingSavedPosts ? (
        <div className="absolute inset-0 grid place-items-center">
          <Loader />
        </div>
      ) : (
        <section className="px-4 pb-6 pt-8 sm:pt-9 md:px-8 md:pb-14 lg:px-[3.75rem] lg:pt-[5.375rem]">
          <div className="flex items-center gap-2">
            <img
              src="/assets/icons/bookmark.svg"
              alt=" bookmark"
              className="invert-white lg:w-9"
            />
            <h1 className="heading-sm md:heading-md lg:heading-lg">
              Saved Posts
            </h1>
          </div>
          <div className="">
            <div className="my-7 flex max-w-[1900px] flex-col justify-between gap-5 xs:flex-row md:mb-[3rem] md:mt-10 md:items-center">
              <Tabbar isActive={isActive} setActive={setActive} />
              <div>
                <Filter />
              </div>
            </div>

            <div className="">
              {isActive === "posts" ? (
                <PostList posts={allPosts} setShowFeed={setShowFeed} />
              ) : (
                <ReelList reels={allReels} />
              )}
              {/* <div className="my-[3.75rem] flex justify-center">
                <Button
                  onClick={handleLoadMore}
                  className="border-2 border-light-300 border-opacity-60 bg-dark-300 px-[1.25rem] py-[0.875rem] text-sm font-semibold"
                >
                  Load More
                </Button>
              </div> */}
              {hasNextPage && (
                <div
                  ref={ref}
                  className="my-10 flex items-center justify-center"
                >
                  <div className="loader animate-spin">
                    <img src="assets/icons/loader.svg" alt="loader" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default SavedPosts;
