"use client";
import React from "react";
import StoryItem from "@/components/ui/StoryItem";

function StoriesSlider() {
  return (
    <div className="flex max-w-md justify-between pb-8 pt-5 md:pb-9 md:pt-8 lg:gap-[1.375rem] lg:pb-10 lg:pt-[3.75rem]">
      <StoryItem />
      <StoryItem />
      <StoryItem />
      <StoryItem />
      <StoryItem />
      <StoryItem />
    </div>
  );
}

export default StoriesSlider;
