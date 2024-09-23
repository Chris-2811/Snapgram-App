import React from "react";

function Filter() {
  return (
    <div>
      <div className="flex max-w-20 items-center gap-[0.625rem] rounded-[14px] bg-dark-400 px-4 py-3">
        <p className="text-xs font-medium">All</p>
        <img
          src="/assets/icons/filter.svg"
          alt="filter-icon"
          className="h-4 w-4 cursor-pointer lg:h-5 lg:w-5"
        />
      </div>
    </div>
  );
}

export default Filter;
