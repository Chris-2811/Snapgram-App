import React, { useState } from "react";
import { IPost, IReel } from "@/types";
import ReelPreview from "./ReelPreview";
import PostDetails from "./PostDetails";
import { useGetUserById } from "@/lib/react-query/queries";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReelDetails from "./ReelDetails";

// Type guard to check if the item is a reel
function isReel(item: IPost | IReel): item is IReel {
  return (item as IReel).videoUrl !== undefined; // Adjust based on your IReel definition
}

function MediaList({ mediaItems }: { mediaItems: (IPost | IReel)[] }) {
  const [showPostDetails, setShowPostDetails] = useState<boolean>(false);
  const [showReelDetails, setShowReelDetails] = useState<boolean>(false);
  const [currentMediaItem, setCurrentMediaItem] = useState<IPost | IReel>();
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
  const { data: creator, isLoading } = useGetUserById(currentMediaItem?.userId);

  function handlePostClick(mediaItem: IPost) {
    setCurrentMediaItem(mediaItem);
    setShowPostDetails(!showPostDetails);
  }

  function handleReelClick(mediaItem: IReel) {
    setCurrentMediaItem(mediaItem);
    setShowReelDetails(!showReelDetails);
  }

  function handleCloseModal() {
    setShowPostDetails(false);
    setShowReelDetails(false);
  }

  function handleNextMediaItem() {
    if (currentMediaIndex < mediaItems.length - 1) {
      if (isReel(mediaItems[currentMediaIndex + 1])) {
        setShowReelDetails(true);
        setShowPostDetails(false);
      } else {
        setShowReelDetails(false);
        setShowPostDetails(true);
      }
      setCurrentMediaIndex(currentMediaIndex + 1);
      setCurrentMediaItem(mediaItems[currentMediaIndex + 1]);
    }
  }

  function handlePrevMediaItem() {
    if (currentMediaIndex > 0) {
      if (isReel(mediaItems[currentMediaIndex - 1])) {
        setShowReelDetails(true);
        setShowPostDetails(false);
      } else {
        setShowReelDetails(false);
        setShowPostDetails(true);
      }
      setCurrentMediaIndex(currentMediaIndex - 1);
      setCurrentMediaItem(mediaItems[currentMediaIndex - 1]);
    }
  }

  console.log("creator", creator);

  return (
    <div className="">
      <ul
        className="grid w-full grid-cols-3 gap-1 lg:justify-start lg:gap-2 xl:grid-cols-[repeat(auto-fill,340px)]"
        style={{
          gridAutoRows: "lg:340px",
        }}
      >
        {mediaItems.map((mediaItem, index) => (
          <li
            key={index}
            className={`max-w-[340px] ${isReel(mediaItem) ? "row-span-2" : ""}`}
          >
            {isReel(mediaItem) ? (
              <div
                onClick={() => handleReelClick(mediaItem)}
                className="h-full w-full"
              >
                <ReelPreview
                  reel={mediaItem}
                  className="h-full w-full rounded-none"
                />
              </div>
            ) : (
              <div
                onClick={() => handlePostClick(mediaItem as IPost)}
                className="relative row-span-1 aspect-square cursor-pointer"
              >
                <img
                  src={mediaItem.photoUrls[0]}
                  alt=""
                  className="h-full w-full"
                />
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
            )}
          </li>
        ))}
      </ul>

      {(showPostDetails || showReelDetails) &&
        !isLoading &&
        currentMediaItem && (
          <div>
            <div
              onClick={handlePrevMediaItem}
              className="fixed top-1/2 z-[1000] hidden -translate-y-[50%] cursor-pointer rounded-full bg-light-300 p-6 hover:bg-light-400 lg:left-2 lg:block xl:left-4"
            >
              <FaArrowLeft />
            </div>
            {currentMediaItem &&
              (isReel(currentMediaItem) ? (
                <ReelDetails
                  currentReel={currentMediaItem}
                  handleCloseReelDetails={handleCloseModal}
                />
              ) : (
                <PostDetails
                  currentPost={currentMediaItem}
                  handleCloseModal={handleCloseModal}
                  creator={creator}
                  imageUrls={currentMediaItem.photoUrls
                    .slice(0, 3)
                    .map((url) => `${url}&w=550&fit=max&q=85`)}
                />
              ))}
            <div
              onClick={handleNextMediaItem}
              className="fixed top-1/2 z-[1000] hidden -translate-y-[50%] cursor-pointer rounded-full bg-light-300 p-6 hover:bg-light-400 lg:right-2 lg:block xl:right-4"
            >
              <FaArrowRight />
            </div>
          </div>
        )}
    </div>
  );
}

export default MediaList;
