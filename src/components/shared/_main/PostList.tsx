import React from "react";
import { useState } from "react";
import { useGetUserById } from "@/lib/react-query/queries";
import PostStats from "./PostStats";
import PostDetails from "./PostDetails";
import { IPost } from "@/types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { set } from "date-fns";

function PostList({ posts }: { posts: IPost[] }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<IPost>();
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const { data: creator, isLoading } = useGetUserById(currentPost?.userId);

  function handleClick(post: any) {
    setShowModal(!showModal);

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
    <div>
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
      {showModal && currentPost && !isLoading && (
        <>
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
        </>
      )}
    </div>
  );
}

export default PostList;
