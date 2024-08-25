import React from "react";

function StoryItem(avatar: string) {
  return (
    <div className="grid place-items-center">
      <div className="grid h-[3rem] w-[3rem] cursor-pointer place-items-center rounded-full bg-gradient-border p-[3px] lg:h-[4.5rem] lg:w-[4.5rem]">
        <div className="h-full w-full rounded-full bg-dark-100">
          <div className="h-full w-full overflow-hidden rounded-full p-[2px]">
            <img
              src="/assets/images/profile.png"
              alt=""
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-1 font-medium">
        <p className="text-[9px]">my story</p>
      </div>
    </div>
  );
}

export default StoryItem;
