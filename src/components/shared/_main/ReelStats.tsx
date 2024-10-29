import React from "react";
import { checkIsLiked } from "@/lib/utils";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { IReel } from "@/types";
import { likeReel } from "@/lib/firebase/api";
import {
  useLikeReel,
  useSaveReel,
  useDeleteSavedReel,
} from "@/lib/react-query/mutations";
import { isReelSavedByUser } from "@/lib/firebase/api";

function ReelStats({ reel }: { reel: IReel }) {
  const likesList = reel.likes ? reel.likes.map((like: string) => like) : [];
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>();
  const { user } = useContext(AuthContext);

  const { mutate: likeReel } = useLikeReel();
  const { mutate: saveReel } = useSaveReel();
  const { mutate: deleteSavedReel } = useDeleteSavedReel();

  useEffect(() => {
    const checkIfReelIsSaved = async () => {
      if (user && reel) {
        try {
          const isSaved = await isReelSavedByUser(user.userId, reel.reelId);
          if (isSaved) {
            setIsSaved(isSaved);
          }
        } catch (error) {
          setIsSaved(false);
        }
      }
    };

    checkIfReelIsSaved();
  }, []);

  function handleShareReel() {
    console.log("Share reel");
  }

  function handleSaveReel(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (isSaved) {
      setIsSaved(false);
      deleteSavedReel({ userId: user.userId, reelId: reel.reelId });
    } else {
      setIsSaved(true);
      saveReel({ reelId: reel.reelId, userId: user.userId });
    }
  }

  function handleLikeReel(e: React.MouseEvent<HTMLParagraphElement>) {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(user.userId)) {
      likesArray = likesArray.filter((id) => id !== user.userId);
    } else {
      likesArray.push(user.userId);
    }

    setLikes(likesArray);

    likeReel({ reelId: reel.reelId, likesArray });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex justify-between gap-[1.5rem]">
          <div className="flex items-center gap-[0.375rem]">
            <img
              src={
                checkIsLiked(likes, user.userId)
                  ? "/assets/icons/liked.svg"
                  : "/assets/icons/like.svg"
              }
              alt=""
              className="w-5 cursor-pointer"
              onClick={handleLikeReel}
            />
            <p className="min-w-[10px]">{likes.length}</p>
          </div>
          <div className="flex items-center gap-[0.375rem]">
            <img src="/assets/icons/chat.svg" alt="" />
            {/*   <p className="min-w-[10px]">{comments ? comments.length : "0"}</p> */}
          </div>
          <div className="flex cursor-pointer items-center gap-[0.375rem]">
            <img
              src="/assets/icons/share.svg"
              alt="share-icon"
              onClick={handleShareReel}
            />

            {/*   <p className="min-w-[10px]">{reel.shares ? reel.shares : "0"}</p> */}
          </div>
        </div>
        <div className="cursor-pointer" onClick={handleSaveReel}>
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt=""
            className="w-5"
          />
        </div>
      </div>
    </div>
  );
}

export default ReelStats;
