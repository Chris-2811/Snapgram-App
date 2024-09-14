import React from "react";
import { useState } from "react";
import { useGetUserById } from "@/lib/react-query/queries";
import PostStats from "./PostStats";
import PostDetails from "./PostDetails";
import { IPost } from "@/types";

function PostList({ posts }: { posts: IPost[] }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);
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
        className="grid grid-cols-3 place-content-start gap-0.5 lg:gap-1 3xl:grid-cols-4"
      >
        {posts.map((post, index) => (
          <li
            key={index}
            onClick={() => handleClick(post)}
            className="max-h-[357px] max-w-[340px] lg:cursor-pointer"
          >
            {post?.photoUrls ? (
              <img
                src={`${post.photoUrls[0]}&w=400&fit=max`}
                alt=""
                className="lg:aspect-none aspect-square h-full w-full"
              />
            ) : (
              <video></video>
            )}
          </li>
        ))}
      </ul>
      {showModal && !isLoading && (
        <>
          <PostDetails
            handleCloseModal={handleCloseModal}
            currentPost={currentPost}
            creator={creator}
          />
        </>
      )}
    </div>
  );
}

export default PostList;
