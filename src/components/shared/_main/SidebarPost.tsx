import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";
import { Link } from "react-router-dom";

function SidebarPost() {
  const { user } = useContext(AuthContext);

  return (
    <div className="hidden h-screen border border-green-500 lg:px-11 lg:pt-20 2xl:block 2xl:w-[420px]">
      <div className="flex flex-col items-center">
        <Link to={`/profile/${user.userId}`}>
          <Avatar>
            <AvatarImage
              src={user.photoUrl}
              className="h-[130px] w-[130px] rounded-full"
            />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
        </Link>
        <Link to={`/profile/${user.userId}`}>
          <h3 className="heading-sm mt-6">{user?.name}</h3>
        </Link>
        <p className="mt-1 text-base text-light-300">{user?.username}</p>
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
