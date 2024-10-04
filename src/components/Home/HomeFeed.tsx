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
  } = useGetPosts(10);

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
        <div className="flex items-center gap-[0.625rem] rounded-[14px] bg-dark-400">
          <Filter />
        </div>
      </div>

      <div className="md:flex md:w-full md:flex-col lg:items-start">
        <div className="max-w-[600px]">
          <div>
            {isPostLoading && !posts ? (
              <div className="absolute bottom-0 left-0 right-0 top-0 z-10 grid place-items-center bg-dark-200">
                <img
                  src="/assets/images/logo.svg"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
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
