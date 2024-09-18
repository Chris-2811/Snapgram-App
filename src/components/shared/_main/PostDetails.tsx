import React, { ChangeEvent, FormEvent, useContext } from "react";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useGetCommentsByPostId } from "@/lib/react-query/queries";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { getUserById } from "@/lib/firebase/api";
import { useQueries } from "@tanstack/react-query";
import { AuthContext } from "@/context/AuthContext";
import { IPost } from "@/types";
import { useSwipeable } from "react-swipeable";
import PostStats from "./PostStats";

interface PostDetailsProps {
  handleCloseModal: (e: React.MouseEvent) => void;
  currentPost: IPost;
  creator: any;
  imageUrls: string[];
}

function PostDetails({
  handleCloseModal,
  currentPost,
  creator,
  imageUrls,
}: PostDetailsProps) {
  const [text, setText] = useState("");
  const [isCaptionExpened, setIsCaptionExpended] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const { data: comments, refetch: refetchComments } = useGetCommentsByPostId(
    currentPost.postId,
  );
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const recentComments = comments?.slice(0, 3);
  console.log("recentComments", recentComments);
  const userQueries = useQueries({
    queries:
      recentComments?.map((comment) => ({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, comment.userId],
        queryFn: () => getUserById(comment.userId),
      })) || [],
  });

  const { user } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const colRef = collection(db, "comments");

    try {
      await addDoc(colRef, {
        postId: currentPost.postId,
        userId: user?.userId,
        text: text,
        timestamp: serverTimestamp(),
      });

      setText("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setActivePhotoIndex((prev) => (prev + 1) % imageUrls.length);
    },
    onSwipedRight: () => {
      setActivePhotoIndex((prev) => (prev - 1) % imageUrls.length);
    },
    trackMouse: true,
  });

  const captionPreview =
    currentPost.caption.length > 60
      ? `${currentPost.caption.slice(0, 60)}...`
      : currentPost.caption;

  const filteredTags =
    currentPost.tags.length > 3
      ? currentPost.tags.filter((_, index) => (index + 1) % 3 === 0)
      : currentPost.tags;

  return (
    <div>
      <div
        onClick={handleCloseModal}
        className="fixed inset-0 bg-[#202020] opacity-60"
      ></div>

      {isImageLoaded && (
        <div className="fixed left-1/2 top-1/2 hidden h-[500px] w-full -translate-x-1/2 -translate-y-1/2 justify-center overflow-hidden rounded-[30px] px-5 lg:flex lg:max-w-[900px] xl:h-[582px] xl:max-w-[1120px] 2xl:max-w-none">
          <div className="relative w-[45%] overflow-hidden rounded-l-[30px] xl:w-[509px]">
            <img
              src={imageUrls[activePhotoIndex]}
              alt=""
              className="h-full w-full object-cover"
              {...swipeHandlers}
            />
            <div className="absolute bottom-[1.125rem] left-1/2 flex justify-center gap-2">
              {imageUrls.length > 1 &&
                imageUrls.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setActivePhotoIndex(index)}
                    className={`h-[0.6125rem] w-[0.6125rem] cursor-pointer rounded-full ${index === activePhotoIndex ? "bg-white" : "bg-light-400"}`}
                  ></div>
                ))}
            </div>
          </div>
          <div className="flex w-[55%] flex-col rounded-r-[30px] bg-dark-200 px-7 pb-[1.875rem] pt-9 xl:w-[600px]">
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={`${
                    creator.photoUrl
                      ? creator.photoUrl
                      : "/assets/images/profile.png"
                  }`}
                  alt="profile picture"
                  className="h-[50px] w-[50px] rounded-full"
                />
                <div>
                  <p className="text-[1.125rem] font-bold tracking-[-1px] text-light-200">
                    {creator.name}
                  </p>
                  <small className="text-sm text-light-300">
                    @Lewishamilton
                  </small>
                </div>
              </div>
              {user.userId === currentPost.userId && (
                <div className="flex gap-3">
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    className="w-5 cursor-pointer"
                  />
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    className="w-5 cursor-pointer"
                  />
                </div>
              )}
            </div>
            <div className="mt-5">
              <div>
                <div className="max-w-lg font-semibold">
                  {isCaptionExpened ? currentPost.caption : captionPreview}
                  {currentPost.caption.length > 60 && (
                    <span
                      onClick={() => setIsCaptionExpended(!isCaptionExpened)}
                      className="ml-2 cursor-pointer whitespace-nowrap text-xs text-light-300"
                    >
                      {isCaptionExpened ? "show less" : "show more"}
                    </span>
                  )}
                </div>

                <span
                  className={`flex gap-2 text-light-400 ${
                    currentPost.caption.length > 60 && "mt-2"
                  }`}
                >
                  {filteredTags.map((tag: string, index: number) => (
                    <p key={index}>#{tag}</p>
                  ))}
                </span>
              </div>
            </div>

            {/* Comments */}
            <div className="flex flex-1 flex-col justify-between">
              <div className="mt-[1.875rem] space-y-[1.875rem] border-t border-t-dark-400 lg:pt-[1.75rem]">
                {recentComments?.map((item, index) => (
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2">
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
                      <div className="">
                        <div className="flex items-center gap-[0.625rem]">
                          <p className="text-xs font-medium lg:max-w-[376px]">
                            <h3 className="mr-3 inline text-sm font-semibold tracking-[-1px] text-light-300">
                              {userQueries[index].data?.username
                                ? userQueries[index].data?.username
                                : userQueries[index].data?.name}
                            </h3>
                            {item.text}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center gap-[0.6875rem]">
                          <div className="text-[0.625rem] text-light-300">
                            1d
                          </div>
                          <div className="flex items-center gap-[0.1875rem]">
                            <img
                              src="/assets/icons/reply.svg"
                              alt="like-comment"
                              width={16}
                            />
                            <p className="text-[10px]">Reply</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/assets/icons/like.svg"
                        alt="like-post"
                        width={16}
                      />
                      <p className="text-[10px] text-light-300">4 likes</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="">
                <PostStats post={currentPost} comments={comments} />
                <form
                  onSubmit={handleSubmit}
                  className="mt-10 flex items-center gap-4"
                >
                  <img
                    src="/assets/images/profile.png"
                    alt="profile picture"
                    className="h-10 w-10"
                  />
                  <div className="form-control relative w-full">
                    <Input
                      className="mt-0 h-11 bg-dark-400 placeholder:text-light-400"
                      placeholder="Write your comment..."
                      onChange={handleTextChange}
                      value={text}
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2">
                      <img src="/assets/icons/plain.svg" alt="" className="" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <img
        src={imageUrls[0]}
        alt=""
        style={{ display: "none" }}
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  );
}

export default PostDetails;
