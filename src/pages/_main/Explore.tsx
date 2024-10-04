import React, { useEffect } from "react";
import Searchbar from "@/components/shared/_main/Searchbar";
import Filter from "@/components/shared/_main/Filter";
import { useGetPosts } from "@/lib/react-query/queries";
import PostList from "@/components/shared/_main/PostList";
import { IPost } from "@/types";
import { useInView } from "react-intersection-observer";

function Explore() {
  const {
    data: posts,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts(18);
  const [showSearch, setShowSearch] = React.useState<boolean>(true);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && posts) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  console.log("posts", posts);

  const flattenedPosts: IPost[] = posts?.pages.flatMap((page) => page) || [];

  return (
    <div className="mx-auto max-w-fit px-5 pt-6 md:px-8 md:pt-8 lg:px-[3.1875rem] lg:pt-[4.375rem] 5xl:pl-20">
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
        <PostList posts={flattenedPosts} setShowSearch={setShowSearch} />
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
