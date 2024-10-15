import React from "react";
import { IReel } from "@/types";
import Reel from "./Reel";

function ReelList({ reels }: { reels: IReel[] }) {
  return (
    <div className="grid justify-center gap-y-5 md:gap-y-6 lg:grid-cols-[repeat(auto-fill,340px)] lg:justify-start lg:gap-x-6">
      {reels.map((reel) => (
        <Reel reel={reel} />
      ))}
    </div>
  );
}

export default ReelList;
