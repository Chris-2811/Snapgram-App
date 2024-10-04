import React from "react";
import { Link } from "react-router-dom";

function Reel() {
  const [progress, setProgress] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const reel = {
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    caption: "This is a caption",
    userId: "user1",
  };

  const user = {
    username: "user1",
    photoUrl: "/assets/images/profile.png",
  };

  function togglePlayPause(e: any) {
    if (e.target.paused) {
      e.target.play();
    } else {
      e.target.pause();
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
    <div className="relative aspect-[17/30] w-[340px] overflow-hidden rounded-[30px]">
      <video
        onClick={togglePlayPause}
        onTimeUpdate={handleTimeUpdate}
        src={reel.url}
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
      <div className="absolute bottom-7 left-6 right-6 z-50">
        <div className="text-sm font-bold uppercase text-primary">
          <p>fitness</p>
        </div>
        <h2 className="font-base mt-2 font-semibold leading-[1.4] text-white">
          {reel.caption.length > 40
            ? reel.caption.substring(0, 37) + "..."
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
