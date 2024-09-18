import { useGetPostById } from "@/lib/react-query/queries";
import React, { useContext, useState } from "react";
import { useEffect } from "react";

import { AuthContext } from "@/context/AuthContext";

function PostStats({ post, comments }) {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [docId, setDocId] = useState<String | null>();
  const { user } = useContext(AuthContext);
  const { refetch } = useGetPostById(post.id);

  return (
    <div className="mt-[1.875rem] flex items-center justify-between">
      <div className="flex justify-between gap-[1.875rem]">
        <div className="flex items-center gap-[0.375rem]">
          <img
            src={isLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
            alt=""
            className="w-5 cursor-pointer"
          />
          <p className="min-w-[10px]">{10}</p>
        </div>
        <div className="flex items-center gap-[0.375rem]">
          <img src="/assets/icons/chat.svg" alt="" />
          <p className="min-w-[10px]">{comments ? comments.length : "0"}</p>
        </div>
        <div className="flex cursor-pointer items-center gap-[0.375rem]">
          <img src="/assets/icons/share.svg" alt="share-icon" />
          <p className="min-w-[10px]">{post.shares ? post.shares : "0"}</p>
        </div>
      </div>
      <div className="cursor-pointer">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt=""
          className="w-5"
        />
      </div>
    </div>
  );
}

export default PostStats;
