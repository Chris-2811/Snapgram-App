import { IReel } from "@/types";
import { set } from "date-fns";
import React from "react";
import Reel from "./Reel";
import { FaPlay } from "react-icons/fa";
import PostStats from "./PostStats";
import { Input } from "@/components/ui/input";
import ReelStats from "./ReelStats";
import { useGetUserById } from "@/lib/react-query/queries";
import { Link } from "react-router-dom";

function ReelDetails({
  handleCloseReelDetails,
  currentReel,
}: {
  handleCloseReelDetails: () => void;
  currentReel: IReel;
}) {
  console.log("currentReel", currentReel);

  const [text, setText] = React.useState<string>("");
  const [isCommentTooLong, setIsCommentTooLong] =
    React.useState<boolean>(false);

  const { data: user } = useGetUserById(currentReel.userId);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    if (e.target.value.length > 150) {
      setIsCommentTooLong(true);
    } else {
      setIsCommentTooLong(false);
    }
  }

  return (
    <>
      <div
        onClick={handleCloseReelDetails}
        className="fixed inset-0 bg-[#202020] opacity-75"
      ></div>
      <div className="fixed left-1/2 top-1/2 z-[100] -translate-x-[50%] -translate-y-[50%]">
        <div className="flex flex-col overflow-hidden rounded-[15px] bg-dark-200 md:flex-row">
          <div className="relative aspect-[17/30] w-[550px]">
            <Reel reel={currentReel} className="z-[10] rounded-none" />
          </div>
          <div className="flex w-[440px] flex-col px-4 py-5">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Link to={`/profile/${user?.userId}`}>
                  <img
                    src={`${
                      user?.photoUrl
                        ? user.photoUrl
                        : "/assets/images/profile.png"
                    }`}
                    alt="profile picture"
                    className="h-[50px] w-[50px] rounded-full"
                  />
                </Link>
                <div>
                  <Link to={`/profile/${user?.userId}`}>
                    <p className="text-[1.125rem] font-bold tracking-[-1px] text-light-200">
                      {user?.name}
                    </p>
                  </Link>
                  <small className="text-sm text-light-300">
                    @Lewishamilton
                  </small>
                </div>
              </div>
              <div className="mt-6">
                <p className="">{currentReel.caption}</p>
                <ul role="list" className="flex items-center gap-2">
                  {currentReel.tags.map((tag, index) => (
                    <span key={index} className="text-light-300">
                      {tag.includes("#") ? tag : "#" + tag}
                    </span>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-[1.875rem]">
              <ReelStats />
              <div className="form-control relative w-full">
                <Input
                  className="mt-0 h-11 bg-dark-400 pr-14 ring-0 placeholder:text-light-400 focus:ring-0"
                  placeholder="Write your comment..."
                  onChange={handleTextChange}
                  value={text}
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                  <img src="/assets/icons/plain.svg" alt="" className="" />
                </button>
                {isCommentTooLong && (
                  <small className="absolute -bottom-6 right-1 text-red">
                    Maximum 150 characters
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReelDetails;
