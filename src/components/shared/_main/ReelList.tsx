import React from "react";
import { IReel } from "@/types";
import Reel from "./Reel";
import ReelDetails from "./ReelDetails";
import ReelPreview from "./ReelPreview";
import { useMediaQuery } from "react-responsive";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ReelList({ reels }: { reels: IReel[] }) {
  const [showReelDetails, setShowReelDetails] = React.useState<boolean>(false);
  const [currentReel, setCurrentReel] = React.useState<IReel>();
  const [currentReelIndex, setCurrentReelIndex] = React.useState<number>(0);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  function handleCloseReelDetails() {
    setShowReelDetails(false);
  }

  function handleReelClick(reel: IReel) {
    setShowReelDetails(!showReelDetails);
    setCurrentReel(reel);
  }

  function handleNextReel() {
    if (currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1);
      setCurrentReel(reels[currentReelIndex + 1]);
    } else if (currentReelIndex === reels.length - 1) {
      setCurrentReelIndex(0);
      setCurrentReel(reels[0]);
    }
  }

  function handlePrevReel() {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1);
      setCurrentReel(reels[currentReelIndex - 1]);
    } else if (currentReelIndex === 0) {
      setCurrentReelIndex(reels.length - 1);
      setCurrentReel(reels[reels.length - 1]);
    }
  }

  return (
    <div>
      <div className="grid justify-center gap-y-5 md:grid-cols-2 md:justify-start md:gap-5 md:gap-y-6 lg:grid-cols-[repeat(auto-fill,340px)] lg:gap-x-6">
        {reels.map((reel) => (
          <div onClick={() => handleReelClick(reel)}>
            <div className="hidden md:block">
              <ReelPreview reel={reel} />
            </div>
            <div className="md:hidden">
              <Reel reel={reel} />
            </div>
          </div>
        ))}
      </div>
      {showReelDetails && isLargeScreen && (
        <>
          <div
            onClick={handlePrevReel}
            className="fixed top-1/2 z-[1000] hidden -translate-y-[50%] cursor-pointer rounded-full bg-light-300 p-6 hover:bg-light-400 lg:left-2 lg:block xl:left-4"
          >
            <FaArrowLeft />
          </div>
          <ReelDetails
            handleCloseReelDetails={handleCloseReelDetails}
            currentReel={currentReel!}
          />
          <div
            onClick={handleNextReel}
            className="fixed top-1/2 z-[1000] hidden -translate-y-[50%] cursor-pointer rounded-full bg-light-300 p-6 hover:bg-light-400 lg:right-2 lg:block xl:right-4"
          >
            <FaArrowRight />
          </div>
        </>
      )}
    </div>
  );
}

export default ReelList;
