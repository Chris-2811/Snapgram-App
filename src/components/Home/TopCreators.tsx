import React from "react";
import { HoverEffect } from "../ui/card-hover-effect";
import { useGetUsers } from "../../lib/react-query/queries";

function TopCreators({ user }: any) {
  const { data: userPages } = useGetUsers();
  const allUsers = userPages?.pages.flatMap((page: any) => page).slice(0, 8);

  return (
    <div className="pt-custom sticky top-0 hidden h-screen w-full max-w-[465px] grow border border-orange-400 px-6 pt-10 lg:max-h-[1024px] xl:block">
      <h1 className="heading-md">Top Creators</h1>
      <HoverEffect items={allUsers} />
    </div>
  );
}

export default TopCreators;
