import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useGetUserById } from "@/lib/react-query/queries";
import { formatPostDate } from "@/lib/utils";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { IPost } from "@/types";
import { AuthContext } from "@/context/AuthContext";
import PostStats from "../shared/_main/PostStats";
import { MAX_COMMENT_LENGTH } from "@/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useGetCommentsByPostId } from "@/lib/react-query/queries";
import { getUserById } from "@/lib/firebase/api";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { useQueries } from "@tanstack/react-query";
import CommentSection from "../shared/_main/CommentSection";

function PostCard({ post }: { post: IPost }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState<boolean>(false);
  const [isCommentTooLong, setIsCommentTooLong] = useState<boolean>(false);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const { data: comments, refetch: refetchComments } = useGetCommentsByPostId(
    post.postId,
  );
  const [text, setText] = useState("");
  const { data: postAuthor } = useGetUserById(post.userId);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  if (!post || !post.userId) {
    return null;
  }

  const dateString = formatPostDate(post.createdAt);

  const captionPreview =
    post.caption.length > 100
      ? `${post.caption.slice(0, 100)} ...`
      : post.caption;

  function handlePhotoClick() {
    console.log("Photo clicked");
    console.log("post.photoUrls.length", post.photoUrls.length);
    if (post.photoUrls.length > 1) {
      setActivePhotoIndex((prev) => (prev + 1) % post.photoUrls.length);
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setActivePhotoIndex((prev) => (prev + 1) % post.photoUrls.length);
    },
    onSwipedRight: () => {
      setActivePhotoIndex((prev) => (prev - 1) % post.photoUrls.length);
    },
    trackMouse: true,
  });

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    if (e.target.value.length === 0) {
      setIsCommentTooLong(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (text.length > MAX_COMMENT_LENGTH) {
      setIsCommentTooLong(true);
      return;
    }

    if (text.length === 0) {
      return;
    }

    const colRef = collection(db, "comments");

    try {
      await addDoc(colRef, {
        postId: post.postId,
        userId: user?.userId,
        text: text,
        timestamp: serverTimestamp(),
      });

      refetchComments();
      setText("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="rounded-[30px] border border-dark-450 bg-dark-300 px-4 py-4 md:px-7 lg:py-9">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.userId}`}>
              <img
                src={
                  postAuthor?.photoUrl
                    ? postAuthor.photoUrl
                    : "/assets/images/profile.png"
                }
                alt="user"
                className="h-[50px] w-[50px] rounded-full"
              />
            </Link>
            <div>
              <p className="text-[1.125rem] font-bold tracking-[-1px] text-light-200">
                {postAuthor?.name}
              </p>
              <small className="text-sm text-light-300">{dateString}</small>
            </div>
          </div>
        </div>
        {user?.userId === post.userId && (
          <img
            onClick={() => navigate(`/edit-post/${post.postId}`)}
            src="assets/icons/edit.svg"
            alt="edit"
            className="h-5 w-5 cursor-pointer"
          />
        )}
        {/*  <img src="/assets/icons/edit.svg" alt="" className="w-5" /> */}
      </div>
      <div className="mb-4 mt-5 font-semibold leading-[1.5] md:mb-8">
        <div className="max-w-lg">
          {!isCaptionExpanded ? captionPreview : post.caption}
          {post.caption.length > 100 && (
            <span
              onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
              className={`text-xs text-light-300 ${
                isCaptionExpanded && "ml-0"
              } ml-2 cursor-pointer whitespace-nowrap`}
            >
              {isCaptionExpanded ? "Show less" : "Show more"}
            </span>
          )}
        </div>
        <span
          className={`flex gap-2 text-light-400 ${
            post.caption.length > 50 && "mt-2"
          }`}
        >
          {post.tags.slice(0, 3).map((tag: string, index) => (
            <span key={index} className={`text-light-400`}>
              #{tag}
            </span>
          ))}
        </span>
      </div>
      <div
        {...swipeHandlers}
        onClick={handlePhotoClick}
        className="relative cursor-pointer overflow-hidden rounded-[30px] border border-dark-450"
      >
        <img
          src={
            post.photoUrls[activePhotoIndex] ||
            "/assets/icons/profile-placeholder.svg"
          }
          alt="post-image"
          className="h-[295px] w-full object-cover sm:h-[520px]"
        />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        {post.photoUrls.length > 1 &&
          post.photoUrls.map((photoUrl, index) => (
            <div
              key={index}
              onClick={() => setActivePhotoIndex(index)}
              className={`h-[0.6125rem] w-[0.6125rem] cursor-pointer rounded-full ${index === activePhotoIndex ? "bg-white" : "bg-light-400"}`}
            ></div>
          ))}
      </div>
      <div className="mt-3 md:mt-[1.875rem]">
        <PostStats post={post} comments={comments} />
      </div>
      <p
        onClick={() => setShowAllComments(!showAllComments)}
        className="mt-3 cursor-pointer text-xs text-light-300"
      >
        Show all comments...
      </p>
      {showAllComments && (
        <div className="sm:hidden">
          <CommentSection
            comments={comments!}
            text={text}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
            setShowAllComments={setShowAllComments}
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-5 flex items-center gap-4 md:mt-10"
      >
        <img
          src={`${user?.photoUrl ? user?.photoUrl : "/assets/images/profile.png"}`}
          alt="profile picture"
          className="h-10 w-10 rounded-full"
        />
        <div className="form-control relative w-full">
          <Input
            className="mt-0 h-11 bg-dark-400 ring-0 placeholder:text-light-400 focus:ring-0"
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

export default PostCard;
