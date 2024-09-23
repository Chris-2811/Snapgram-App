import React from "react";
import { useState } from "react";
import { useGetUserById } from "@/lib/react-query/queries";
import PostStats from "./PostStats";
import PostDetails from "./PostDetails";
import { IPost } from "@/types";
import { replaceImageFormat } from "@/lib/utils";

function PostList({ posts }: { posts: IPost[] }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<IPost>();
  const { data: creator, isLoading } = useGetUserById(currentPost?.userId);

  function handleClick(post: any) {
    setShowModal(!showModal);

    setCurrentPost(post);
  }

  function handleCloseModal(e: React.MouseEvent) {
    setShowModal(false);
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
          <PostDetails
            handleCloseModal={handleCloseModal}
            currentPost={currentPost}
            creator={creator}
            imageUrls={currentPost.photoUrls
              .slice(0, 3)
              .map((url) => `${url}&w=550&fit=max&q=85`)}
          />
        </>
      )}
    </div>
  );
}

export default PostList;
