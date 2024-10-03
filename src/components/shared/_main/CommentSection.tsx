import React from "react";
import { useQueries } from "@tanstack/react-query";
import { getUserById } from "@/lib/firebase/api";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { IComment } from "@/types";
import { Input } from "@/components/ui/input";

function CommentSection({
  comments,
  text,
  handleTextChange,
  handleSubmit,
  setShowAllComments,
}: {
  comments: IComment[];
  text: string;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setShowAllComments: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userQueries = useQueries({
    queries:
      comments?.map((comment) => ({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, comment.userId],
        queryFn: () => getUserById(comment.userId),
      })) || [],
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex h-[70vh] flex-col justify-between rounded-t-2xl bg-dark-400 px-4 pb-8 pt-4">
      <div>
        <div className="border-b border-light-300 border-opacity-50 pb-4">
          <div className="relative">
            <h3 className="text-center text-base font-semibold text-light-300">
              Comments
            </h3>
            <div
              onClick={() => setShowAllComments(false)}
              className="absolute right-0 top-1/2 h-4 w-4 -translate-y-[50%] cursor-pointer"
            >
              <img
                src="/assets/icons/delete-sign.png"
                alt=""
                className="z-[100] h-full w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 pt-5">
          {comments?.map((comment, index) => (
            <div key={comment.commentId} className="flex justify-between">
              <div className="flex gap-3">
                <img
                  src={
                    userQueries[index].data?.photoUrl
                      ? userQueries[index].data?.photoUrl
                      : "/assets/images/profile.png"
                  }
                  alt="avatar"
                  className="h-9 w-9 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-light-300">
                    {userQueries[index].data?.username
                      ? userQueries[index].data?.username
                      : userQueries[index].data?.name}
                  </p>
                  <p className="text-sm text-light-200">{comment.text}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <img src="/assets/icons/like.svg" alt="like" className="w-4" />
                <p className="text-sm">1</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-control relative w-full">
          <Input
            className="mt-0 h-11 bg-dark-400 ring-1 ring-light-300 placeholder:text-light-400 focus:ring-1"
            placeholder="Write your comment..."
            value={text}
            onChange={handleTextChange}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <img src="/assets/icons/plain.svg" alt="" className="" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentSection;
