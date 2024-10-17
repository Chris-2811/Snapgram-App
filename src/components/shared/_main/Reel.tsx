import React from "react";
import { Link } from "react-router-dom";
import { IReel } from "@/types";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { FaPlay } from "react-icons/fa";

function Reel({ reel, className }: { reel: IReel; className?: string }) {
  const [progress, setProgress] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const user = {
    username: "user1",
    photoUrl: "/assets/images/profile.png",
  };

  function togglePlayPause(e: any) {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }

    setIsPlaying(!isPlaying);
  }

  function handleTimeUpdate(e: any) {
    const { currentTime, duration } = e.target;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
    if (progress === 100) setIsPlaying(false);
  }

  return (
    <div
      className={cn(
        "relative aspect-[17/30] cursor-pointer overflow-hidden rounded-[30px] border border-light-300/60",
        className,
      )}
    >
      {!isPlaying && (
        <div className="absolute inset-0 grid place-items-center">
          <div
            onClick={togglePlayPause}
            className="z-20 grid h-20 w-20 cursor-pointer place-items-center rounded-full bg-dark-400/65"
          >
            <FaPlay size={24} />
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        onClick={togglePlayPause}
        onTimeUpdate={handleTimeUpdate}
        src={reel.videoUrl}
        alt=""
        className="h-full w-full object-cover"
      />
      {isPlaying && (
        <div className="absolute left-6 right-6 top-[1.125rem] rounded-[20px] bg-[#62636A]">
          <div
            className="h-1 rounded-[20px] bg-primary"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className="absolute bottom-7 left-6 right-6 z-50 md:hidden">
        <div className="text-sm font-bold uppercase text-primary">
          <div className="flex gap-2">
            {reel.tags.slice(0, 2).map((tag) => (
              <div className="">#{tag}</div>
            ))}
          </div>
        </div>
        <h2 className="font-base z-[100] mt-2 text-nowrap font-medium leading-[1.4]">
          {reel.caption.length > 40
            ? reel.caption.substring(0, 30) + "..."
            : reel.caption}
        </h2>
        <div className="mt-6 flex items-center justify-between">
          <Link
            to={`/profile/${reel.userId}`}
            className="flex items-center gap-2"
          >
            <img
              src={user?.photoUrl}
              alt=""
              className="h-[30px] w-[30px] rounded-full"
            />
            <p>{user?.username}</p>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <img src="/assets/icons/like.svg" alt="like" />
              <p>120</p>
            </div>
            <div className="flex items-center gap-2">
              <img src="assets/icons/play2.svg" alt="played" />
              <p>250</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reel;
