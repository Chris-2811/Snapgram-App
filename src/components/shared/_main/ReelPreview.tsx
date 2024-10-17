import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

function ReelPreview({ reel, className }: { reel: any; className?: string }) {
  const { user } = useContext(AuthContext);

  return (
    <div
      className={cn(
        "relative aspect-[17/30] cursor-pointer overflow-hidden rounded-[30px] border border-light-300/60",
        className,
      )}
    >
      <video
        src={reel.videoUrl}
        alt=""
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      <div className="absolute right-4 top-4">
        <img
          src="assets/icons/play.svg"
          alt="play-icon"
          className="invert-white w-6"
        />
      </div>
      <div className="group absolute inset-0 flex items-center justify-center hover:bg-dark-300/50">
        <div className="hidden items-center gap-6 group-hover:flex">
          <div className="flex gap-1">
            <img src="/assets/icons/liked.svg" alt="like-icon" />
            <p>7.135</p>
          </div>
          <div className="flex gap-1">
            <img src="/assets/icons/chat.svg" alt="chat-icon" />
            <p>134</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReelPreview;
