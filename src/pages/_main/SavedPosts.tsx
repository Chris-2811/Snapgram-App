import Tabbar from "@/components/ui/Tabbar";
import React, { useContext } from "react";
import Filter from "@/components/shared/_main/Filter";
import { useGetSavedPosts } from "@/lib/react-query/queries";
import { AuthContext } from "@/context/AuthContext";
import PostList from "@/components/shared/_main/PostList";
import { useGetPostsById } from "@/lib/react-query/queries";

function SavedPosts() {
  const [isActive, setActive] = React.useState("posts");
  const { user, isLoading } = useContext(AuthContext);
  const {
    data: savedPosts,
    isLoading: isLoadingSavedPosts,
    isError,
  } = useGetSavedPosts(user.userId);

  console.log(savedPosts);

  return (
    <>
      {isLoading || isLoadingSavedPosts ? (
        <div>isLoading....</div>
      ) : (
        <section className="px-4 pt-8 sm:pt-9 md:px-8 lg:px-[3.75rem] lg:pt-[5.375rem]">
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
          <div className="max-w-max">
            <div className="mb-10 mt-7 flex max-w-[1900px] flex-col justify-between gap-5 xs:flex-row md:mb-[3.5rem] md:mt-10 md:items-center">
              <Tabbar isActive={isActive} setActive={setActive} />
              <div>
                <Filter />
              </div>
            </div>
            <PostList posts={savedPosts!} />
          </div>
        </section>
      )}
    </>
  );
}

export default SavedPosts;
