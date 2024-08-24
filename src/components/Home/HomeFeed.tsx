import React, { useEffect } from "react";
import { useGetPosts } from "@/lib/react-query/queries";
import PostCard from "./PostCard";
import { useInView } from "react-intersection-observer";

function Home() {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && posts) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  console.log(posts);

  return (
    <div className="px-4 pt-[1.625rem] md:px-10 lg:px-[3.25rem] lg:pt-[3.25rem]">
      <div className="lg:w-[600px]">
        <div></div>
        <div className="flex w-full items-center justify-between">
          <h2 className="heading-md">Home Feed</h2>
        </div>
        <div>
          {isPostLoading && !posts ? (
            <h1 className="bg-red">Loading...</h1>
          ) : (
            posts && (
              <ul role="list" className="mt-10 flex flex-col gap-10">
                {posts.pages.flatMap((page) =>
                  page.map((post) => (
                    <li key={post.id}>
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
  );
}

export default Home;
