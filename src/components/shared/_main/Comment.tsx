import React from "react";

function Comment({
  item,
  index,
  userQueries,
}: {
  item: any;
  index: number;
  userQueries: any;
}) {
  return (
    <div className="flex gap-2">
      <div>
        <img
          src={
            userQueries[index].data?.photoUrl
              ? userQueries[index].data?.photoUrl
              : "/assets/images/profile.png"
          }
          alt="avatar"
          width={36}
          className="h-[36px] rounded-full"
        />
      </div>

      <div className="flex flex-1 items-start justify-between">
        <div className="flex max-w-[285px] flex-col">
          <div className="w-full max-w-[361px] text-sm font-normal">
            <span className="mr-2 text-nowrap text-sm font-semibold text-light-300">
              {userQueries[index].data?.username
                ? userQueries[index].data?.username
                : userQueries[index].data?.name}
            </span>
            {item.text}
          </div>
          <div className="mt-0.5">
            <div className="flex items-center text-xs">
              <p className="mr-3 text-light-300">1d</p>
              <img
                src="/assets/icons/reply.svg"
                alt="reply-icon"
                className="mr-1"
              />
              <p>Reply</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <img src="/assets/icons/like.svg" alt="like-icon" className="w-4" />
          <p className="text-nowrap text-sm text-light-300">4 likes</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
