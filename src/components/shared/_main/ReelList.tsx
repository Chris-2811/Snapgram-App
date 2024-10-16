import React from "react";
import { IReel } from "@/types";
import Reel from "./Reel";
import ReelDetails from "./ReelDetails";
import ReelPreview from "./ReelPreview";
import { useMediaQuery } from "react-responsive";

function ReelList({ reels }: { reels: IReel[] }) {
  const [showReelDetails, setShowReelDetails] = React.useState<boolean>(false);
  const [currentReel, setCurrentReel] = React.useState<IReel>();
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  function handleCloseReelDetails() {
    setShowReelDetails(false);
  }

  function handleReelClick(reel: IReel) {
    setShowReelDetails(!showReelDetails);
    setCurrentReel(reel);
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
        <ReelDetails
          handleCloseReelDetails={handleCloseReelDetails}
          currentReel={currentReel!}
        />
      )}
    </div>
  );
}

export default ReelList;
