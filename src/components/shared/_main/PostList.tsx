import React from "react";
import { useState } from "react";
import { useGetUserById } from "@/lib/react-query/queries";
import PostStats from "./PostStats";
import PostDetails from "./PostDetails";
import { IPost } from "@/types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import { set } from "date-fns";
import { useMediaQuery } from "react-responsive";
import SocialStream from "./SocialStream";
import { Explore } from "@/pages";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PostList({
  posts,
  setShowSearch,
}: {
  posts: IPost[];
  setShowSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFeed, setShowFeed] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<IPost>();
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const { data: creator, isLoading } = useGetUserById(currentPost?.userId);

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const location = useLocation();

  function handleClick(post: any) {
    if (isLargeScreen) {
      setShowModal(!showModal);
    } else {
      setShowFeed(!showFeed);

      if (setShowSearch) {
        setShowSearch(false);
      }
    }

    setCurrentPost(post);
  }

  function handleCloseModal(e: React.MouseEvent) {
    setShowModal(false);
  }

  function handleNextPost() {
    if (currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1);
      setCurrentPost(posts[currentPostIndex + 1]);
    }
  }

  function handlePrevPost() {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1);
      setCurrentPost(posts[currentPostIndex - 1]);
      `'`;
    }
  }

  return (
    <div className="">
      {!showFeed ? (
        <ul
          role="list"
          className="grid max-w-max grid-cols-3 place-content-start gap-0.5 lg:gap-1 3xl:grid-cols-4"
        >
          {posts.map((post, index) => (
            <li
              key={index}
              onClick={() => handleClick(post)}
              className="relative max-h-[357px] max-w-[340px] lg:cursor-pointer"
            >
              {post?.photoUrls ? (
                <img
                  src={`${post.photoUrls[0]}&w=550&fit=max&q=85`}
                  alt=""
                  className="lg:aspect-none aspect-square h-full w-full"
                />
              ) : (
                <video></video>
              )}

              {post?.photoUrls?.length > 1 && (
                <img
                  src="/assets/icons/carousel.svg"
                  className="invert-white absolute right-0 top-0 lg:right-[0.875rem] lg:top-[1.375rem]"
                ></img>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <>
          {location.pathname === "/explore" && (
            <div
              onClick={() => setShowFeed(false)}
              className="fixed top-[81px] z-[100] flex w-full max-w-[594px] cursor-pointer items-center bg-dark-100 py-5 md:top-0 md:py-8 lg:max-w-[610px]"
            >
              <MdOutlineKeyboardArrowLeft size={30} />
              <p className="absolute left-1/2 -translate-x-[50%] text-center font-inter text-lg font-semibold md:text-xl">
                Explore
              </p>
            </div>
          )}
          <div className="mt-10">
            <SocialStream posts={posts} currentPost={currentPost} />
          </div>
        </>
      )}

      {currentPost && !isLoading && (
        <>
          {showModal && (
            <div>
              {/* Preload the image */}
              <div
                onClick={handlePrevPost}
                className="fixed top-1/2 z-[1000] hidden -translate-y-[50%] cursor-pointer rounded-full bg-light-300 p-6 hover:bg-light-400 lg:left-2 lg:block xl:left-4"
              >
                <FaArrowLeft />
              </div>
              <PostDetails
                handleCloseModal={handleCloseModal}
                currentPost={currentPost}
                creator={creator}
                imageUrls={currentPost.photoUrls
                  .slice(0, 3)
                  .map((url) => `${url}&w=550&fit=max&q=85`)}
              />
              <div
                onClick={handleNextPost}
                className="fixed top-1/2 z-[1000] hidden -translate-y-[50%] cursor-pointer rounded-full bg-light-300 p-6 hover:bg-light-400 lg:right-2 lg:block xl:right-4"
              >
                <FaArrowRight />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PostList;
