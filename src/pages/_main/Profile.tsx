import PostList from "@/components/shared/_main/PostList";
import { AuthContext } from "@/context/AuthContext";
import {
  useGetPostsById,
  useGetReelsById,
  /* useGetReels, */
  /* useGetReelsById, */
  useGetUserById,
} from "@/lib/react-query/queries";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tabbar from "@/components/ui/Tabbar";
import { Button } from "@/components/ui/button";
import Filter from "@/components/shared/_main/Filter";
/* import Reel from "@/components/shared/_main/Reel";
 */
import ReelList from "@/components/shared/_main/ReelList";

function Profile() {
  const [isActive, setActive] = useState("posts");
  const { id } = useParams();
  const params = useParams();
  const { user } = useContext(AuthContext);
  const { data: userData } = useGetUserById(id);
  const { data: posts, hasNextPage, fetchNextPage } = useGetPostsById(id);
  const { data: reels } = useGetReelsById(id);

  /*   const { data: posts, fetchNextPage, hasNextPage } = useGetPostsById(id);
   */ /*   const { data: reels } = useGetReelsById(id); */

  const isCurrentUser = id === user?.userId;

  const allPosts = posts?.pages.flatMap((page) => page.map((post) => post));

  const allReels = reels
    ? reels?.pages.flatMap((page) => page.map((reel) => reel))
    : [];

  console.log("reels", allReels);

  return (
    <div className="flex-1 px-4 pt-8 sm:px-7 lg:px-[3.75rem] lg:pt-20">
      <div className="mb-8 flex flex-col gap-7 md:mb-10 md:flex-row md:items-start lg:gap-[1.875rem]">
        <div className="flex items-start gap-4">
          <img
            src={
              userData?.photoUrl
                ? userData.photoUrl
                : "/assets/icons/profile-placeholder.svg"
            }
            alt="profile-picture"
            className="aspect-square h-[80px] w-[80px] rounded-full lg:h-[150px] lg:w-[150px]"
          />
          <div className="flex flex-col gap-4 md:hidden lg:flex-row lg:items-baseline lg:gap-10">
            <div>
              <h1 className="lg:heading-lg heading-sm mb-1">
                {userData?.name}
              </h1>
              {userData?.username && (
                <div className="text-light-400">@{userData?.username}</div>
              )}
            </div>
            <div className="md:hidden">
              {isCurrentUser ? (
                <Link
                  to={`/edit-profile/${user?.userId}`}
                  className="flex items-center gap-2"
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    className="w-5"
                  />
                  <p>Edit Profile</p>
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Button className="h-[38px] w-[84px] bg-primary">
                    Follow
                  </Button>
                  <Button className="h-[38px] w-[84px] bg-light-200 text-dark-200">
                    Message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div className="hidden flex-col gap-4 md:flex lg:flex-row lg:items-baseline lg:gap-10">
            <div>
              <h1 className="heading-sm lg:heading-lg mb-1">
                {userData?.name}
              </h1>
              {userData?.username && (
                <div className="text-light-400 lg:text-lg">
                  @{userData?.username}
                </div>
              )}
            </div>
            <div className="hidden md:block">
              {isCurrentUser ? (
                <Link
                  to={`/edit-profile/${user?.userId}`}
                  className="flex items-center gap-2"
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    className="w-5"
                  />
                  <p>Edit Profile</p>
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Button className="h-[38px] w-[84px] bg-primary">
                    Follow
                  </Button>
                  <Button className="h-[38px] w-[84px] bg-light-200 text-dark-200">
                    Message
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 md:mt-[1rem] md:gap-10 lg:mt-[1.375rem]">
            <div className={`${!isCurrentUser && "flex items-center gap-2"}`}>
              <div className="text-lg font-medium tracking-[-1px] text-primary md:text-xl">
                273
              </div>
              <p className="mt-0.5 text-lg font-medium">Posts</p>
            </div>
            <div className={`${!isCurrentUser && "flex items-center gap-2"}`}>
              <div className="text-lg font-medium tracking-[-1px] text-primary md:text-xl">
                273
              </div>
              <p className="mt-0.5 text-lg font-medium">Followers</p>
            </div>
            <div className={`${!isCurrentUser && "flex items-center gap-2"}`}>
              <div className="text-lg font-medium tracking-[-1px] text-primary md:text-xl">
                273
              </div>
              <p className="mt-0.5 text-lg font-medium">Following</p>
            </div>
          </div>

          {userData?.bio && (
            <div className="mt-6 sm:max-w-xl md:text-balance 2xl:max-w-[628px]">
              {userData?.bio}
            </div>
          )}
        </div>
      </div>

      <div className="items-cener flex justify-between">
        <Tabbar setActive={setActive} isActive={isActive} />
        <Filter />
      </div>

      <div className="mt-7 max-w-max lg:mt-[3.5rem]">
        {isActive === "posts" && posts && <PostList posts={allPosts} />}
        {isActive === "reels" && reels && <ReelList reels={allReels} />}
        <div className="relative z-50 mt-[2.125rem] flex h-20 justify-center">
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              className="w-[132px] bg-dark-300 text-white"
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
