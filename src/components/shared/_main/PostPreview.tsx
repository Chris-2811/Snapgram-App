import React from "react";
import { IPost } from "@/types";
import { useGetCommentsByPostId } from "@/lib/react-query/queries";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

function PostPreview({ post }: { post: IPost }) {
  const { data: comments } = useGetCommentsByPostId(post.postId);

  console.log("comments", comments);

  return (
    <>
      <img src={post.photoUrls[0]} alt="" className="h-full w-full" />
      <div className="group absolute inset-0 flex items-center justify-center hover:bg-dark-300/50">
        <div className="hidden items-center gap-6 group-hover:flex">
          <div className="flex gap-1">
            <img src="/assets/icons/liked.svg" alt="like-icon" />
            <p>{post.likes ? post?.likes.length : 0}</p>
          </div>
          <div className="flex gap-1">
            <img src="/assets/icons/chat.svg" alt="chat-icon" />
            <p>{comments?.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPreview;
