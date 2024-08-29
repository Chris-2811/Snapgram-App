import React, { useEffect } from "react";
import { useGetPosts } from "@/lib/react-query/queries";
import PostCard from "./PostCard";
import { useInView } from "react-intersection-observer";
import Filter from "@/components/shared/_main/Filter";

function Home() {
  const {
    data: posts,
    isPending: isPostLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && posts) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="w-full">
      <div className="flex w-full max-w-[600px] items-center justify-between">
        <h2 className="heading-md">Home Feed</h2>
        <div className="flex items-center gap-[0.625rem] rounded-[14px] bg-dark-400 px-4 py-3">
          <p className="text-xs font-medium">All</p>
          <Filter />
        </div>
      </div>
      <div className="md:flex md:w-full md:flex-col lg:items-start">
        <div className="max-w-[600px]">
          <div>
            {isPostLoading && !posts ? (
              <h1 className="bg-red">Loading...</h1>
            ) : (
              posts && (
                <ul role="list" className="mt-10 flex flex-col gap-10">
                  {posts.pages.flatMap((page) =>
                    page.map((post) => (
                      <li key={post.postId}>
                        <PostCard post={post} />
                      </li>
                    )),
                  )}
                </ul>
              )
            )}
          </div>
          {hasNextPage && (
            <div ref={ref} className="my-10 flex items-center justify-center">
              <div className="loader animate-spin">
                <img src="assets/icons/loader.svg" alt="loader" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
