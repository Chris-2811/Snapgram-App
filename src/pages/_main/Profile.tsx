import PostList from "@/components/shared/_main/PostList";
import { AuthContext } from "@/context/AuthContext";
import {
  useGetPostsById,
  /* useGetReels, */
  /* useGetReelsById, */
  useGetUserById,
} from "@/lib/react-query/queries";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tabbar from "@/components/ui/Tabbar";
import { Button } from "@/components/ui/button";
/* import Reel from "@/components/shared/_main/Reel";
 */
function Profile() {
  const [isActive, setActive] = useState("posts");
  const { id } = useParams();
  const params = useParams();
  const { user } = useContext(AuthContext);
  const { data: userData } = useGetUserById(id);
  const { data: posts, hasNextPage, fetchNextPage } = useGetPostsById(id);

  /*   const { data: posts, fetchNextPage, hasNextPage } = useGetPostsById(id);
   */ /*   const { data: reels } = useGetReelsById(id); */

  const isCurrentUser = id === user?.userId;

  const allPosts = posts?.pages.flatMap((page) => page.map((post) => post));

  return (
    <div className="flex-1 px-4 pt-20 sm:px-7 lg:px-[3.75rem]">
      <div className="flex gap-7 lg:gap-[1.875rem]">
        <img
          src={
            userData?.photoUrl
              ? userData.photoUrl
              : "/assets/icons/profile-placeholder.svg"
          }
          alt="profile-picture"
          className="h-[80px] w-[80px] rounded-full lg:h-[150px] lg:w-[150px]"
        />
        <div>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
            <div>
              <h1 className="heading-sm lg:heading-lg mb-1">
                {userData?.name}
              </h1>
              {userData?.username && (
                <div className="text-light-400">@{userData?.username}</div>
              )}
            </div>
            {isCurrentUser ? (
              <Link
                to={`/edit-profile/${user?.userId}`}
                className="flex items-center gap-2"
              >
                <img src="/assets/icons/edit.svg" alt="edit" className="w-5" />
                <p>Edit Profile</p>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Button className="h-[38px] w-[84px] bg-primary">Follow</Button>
                <Button className="h-[38px] w-[84px] bg-light-200 text-dark-200">
                  Message
                </Button>
              </div>
            )}
          </div>
          <div className="mt-[1.375rem] flex items-center gap-10">
            <div className={`${!isCurrentUser && "flex items-center gap-2"}`}>
              <div className="text-xl font-medium tracking-[-1px] text-primary">
                273
              </div>
              <p className="mt-0.5 text-lg font-medium">Posts</p>
            </div>
            <div className={`${!isCurrentUser && "flex items-center gap-2"}`}>
              <div className="text-xl font-medium tracking-[-1px] text-primary">
                273
              </div>
              <p className="mt-0.5 text-lg font-medium">Followers</p>
            </div>
            <div className={`${!isCurrentUser && "flex items-center gap-2"}`}>
              <div className="text-xl font-medium tracking-[-1px] text-primary">
                273
              </div>
              <p className="mt-0.5 text-lg font-medium">Following</p>
            </div>
          </div>

          <div className="mb-10 mt-6 lg:max-w-[628px]">{userData?.bio}</div>
        </div>
      </div>

      <Tabbar setActive={setActive} isActive={isActive} />

      <div className="mt-[3.5rem]">
        {isActive === "posts" && posts && <PostList posts={allPosts} />}
        {/*  {isActive === "reels" && reels && (
          <div className="grid gap-6 lg:grid-cols-3">
            {reels.pages[0].map((reel) => (
              <Reel reel={reel} />
            ))}
          </div>
        )} */}
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
