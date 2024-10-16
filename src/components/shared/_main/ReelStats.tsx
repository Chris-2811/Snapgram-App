import React from "react";
import { checkIsLiked } from "@/lib/utils";

function ReelStats() {
  const [isSaved, setIsSaved] = React.useState<boolean>(false);

  function handleShareReel() {
    console.log("Share reel");
  }

  function handleSaveReel() {
    console.log("Save reel");
  }

  function handleLikeReel() {
    console.log("Like reel");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex justify-between gap-[1.5rem]">
          <div className="flex items-center gap-[0.375rem]">
            <img
              /*   src={
                checkIsLiked(likes, user.userId)
                  ? "/assets/icons/liked.svg"
                  : "/assets/icons/like.svg"
              } */
              src={"/assets/icons/like.svg"}
              alt=""
              className="w-5 cursor-pointer"
              onClick={handleLikeReel}
            />
            <p className="min-w-[10px]">{/* {likes.length} */}1</p>
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

            {/*   <p className="min-w-[10px]">{post.shares ? post.shares : "0"}</p> */}
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
