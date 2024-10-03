import { useGetPostById } from "@/lib/react-query/queries";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useSavePost, useLikePost } from "@/lib/react-query/mutations";
import { getCurrentUser, isPostSavedByUser } from "@/lib/firebase/api";
import { AuthContext } from "@/context/AuthContext";
import { IPost } from "@/types/index";
import { checkIsLiked } from "@/lib/utils";
import { useDeleteSavedPost } from "@/lib/react-query/mutations";
import { ShareSocial } from "react-share-social";

type PostStatsProps = {
  post: IPost;
  comments: any;
};

function PostStats({ post, comments }: PostStatsProps) {
  const likesList = post.likes ? post.likes.map((like: string) => like) : [];
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [docId, setDocId] = useState<String | null>();
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const { mutate: savePost } = useSavePost();
  const { mutate: likePost } = useLikePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const checkIfPostIsSaved = async () => {
      if (user && post) {
        try {
          const isSaved = await isPostSavedByUser(user.userId, post.postId);
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
      deleteSavedPost({ userId: user.userId, postId: post.postId });
    } else {
      setIsSaved(true);
      savePost({ postId: post.postId, userId: user.userId });
    }
  }

  function handleSharePost(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation();

    setShowShareModal(true);
  }

  function handleLikePost(e: React.MouseEvent<HTMLParagraphElement>) {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(user.userId)) {
      likesArray = likesArray.filter((id) => id !== user.userId);
    } else {
      likesArray.push(user.userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.postId, likesArray });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex justify-between gap-[1.875rem]">
          <div className="flex items-center gap-[0.375rem]">
            <img
              src={
                checkIsLiked(likes, user.userId)
                  ? "/assets/icons/liked.svg"
                  : "/assets/icons/like.svg"
              }
              alt=""
              className="w-5 cursor-pointer"
              onClick={handleLikePost}
            />
            <p className="min-w-[10px]">{likes.length}</p>
          </div>
          <div className="flex items-center gap-[0.375rem]">
            <img src="/assets/icons/chat.svg" alt="" />
            <p className="min-w-[10px]">{comments ? comments.length : "0"}</p>
          </div>
          <div className="flex cursor-pointer items-center gap-[0.375rem]">
            <img
              src="/assets/icons/share.svg"
              alt="share-icon"
              onClick={handleSharePost}
            />

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
      {/*  {showShareModal && (
        <div className="fixed inset-0 z-[100] grid grid-cols-1 items-end justify-items-center">
          <ShareSocial
            url="localhost.com"
            socialTypes={[
              "facebook",
              "twitter",
              "linkedin",
              "whatsapp",
              "email",
            ]}
            style={{
              root: {
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                borderRadius: 3,
                border: 0,
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                color: "white",
                width: "100%",
                paddingTop: "0",
                paddingBottom: "20px",
              },
              copyContainer: {
                border: "1px solid blue",

                background: "white",
                width: "100%",
              },
            }}
          />
        </div>
      )} */}
    </>
  );
}

export default PostStats;
