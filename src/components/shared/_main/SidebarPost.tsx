import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";

function SidebarPost() {
  const { user } = useContext(AuthContext);

  return (
    <div className="hidden h-screen border border-green-500 lg:px-11 lg:pt-20 2xl:block 2xl:w-[420px]">
      <div className="flex flex-col items-center">
        {user.photoUrl ? (
          <Avatar>
            <AvatarImage src={user.photoUrl} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="grid place-items-center rounded-full bg-gray-200 text-2xl text-black lg:h-[130px] lg:w-[130px]">
            {user?.name && getInitials(user?.name)}
          </div>
        )}
        <h3 className="heading-md mt-6">{user?.name}</h3>
        <p>{user?.username}</p>
      </div>
      <div className="mt-[3.5rem]">
        <h3 className="heading-sm">Top posts by you</h3>
        <div className="mt-8">
          <img
            src="/assets/icons/testimage.avif"
            alt=""
            className="h-[315px] w-[330px] rounded-[16px]"
          />
          <img
            src="/assets/icons/testimage.avif"
            alt=""
            className="mt-4 h-[315px] w-[330px] rounded-[16px]"
          />
        </div>
      </div>
    </div>
  );
}

export default SidebarPost;
