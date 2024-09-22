import { useGetPostById } from "@/lib/react-query/queries";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useSavePost } from "@/lib/react-query/mutations";
import { getCurrentUser, isPostSavedByUser } from "@/lib/firebase/api";
import { deleteSavedPost } from "@/lib/firebase/api";
import { AuthContext } from "@/context/AuthContext";
import { set } from "date-fns";

function PostStats({ post, comments }: { post: any; comments: any }) {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [docId, setDocId] = useState<String | null>();
  const { mutate: savePost } = useSavePost();
  const { user } = useContext(AuthContext);
  const { refetch } = useGetPostById(post.id);

  useEffect(() => {
    const checkIfPostIsSaved = async () => {
      if (user && post) {
        try {
          const isSaved = await isPostSavedByUser(post.userId, post.postId);
          if (isSaved) {
            setIsSaved(isSaved);
          }
        } catch (error) {
          setIsSaved(false);
        }
      }
    };

    checkIfPostIsSaved();
  }, []);

  function handleSavePost(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (isSaved) {
      setIsSaved(false);
      deleteSavedPost(post.userId, post.postId);
    } else {
      setIsSaved(true);
      savePost(post);
    }
  }

  console.log("postId", post.userId, post.postId);
  console.log("isSaved", isSaved);

  return (
    <div className="flex items-center justify-between">
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
      <div className="cursor-pointer" onClick={handleSavePost}>
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
