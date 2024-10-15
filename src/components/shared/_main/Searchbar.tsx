import React from "react";
import { Input } from "@/components/ui/input";

function Searchbar() {
  return (
    <div className="relative">
      <img
        src="/assets/icons/search.svg"
        alt="search-icon"
        className="absolute left-5 top-1/2 -translate-y-1/2"
      />
      <Input
        placeholder="Search"
        className="mt-0 pl-[3.75rem] text-lg placeholder:text-light-400"
      />
    </div>
  );
}

export default Searchbar;
