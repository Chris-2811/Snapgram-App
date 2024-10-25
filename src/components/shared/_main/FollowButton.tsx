import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import cn from "classnames";
import { IUser } from "@/types";
import { useFollowUser, useUnfollowUser } from "@/lib/react-query/mutations";
import { Following } from "@/types";
import { useEffect } from "react";
import { useState } from "react";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import { ref } from "firebase/storage";
import { set } from "date-fns";
import { AuthContext } from "@/context/AuthContext";

function FollowButton({
  className,
  profileUserData,
  handleFollowChange,
}: {
  className?: string;
  profileUserData: IUser;
  handleFollowChange: () => void;
}) {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser } = useUnfollowUser();
  const { user } = useContext(AuthContext);
  const { data: currentUser } = useGetCurrentUser(user.userId);

  useEffect(() => {
    const following = currentUser?.following.some(
      (following: Following) => following.userId === profileUserData.userId,
    );

    if (currentUser?.following) {
      setIsFollowed(
        currentUser?.following.some(
          (following: Following) => following.userId === profileUserData.userId,
        ),
      );
    }
  }, [currentUser]);

  async function handleClick() {
    if (isFollowed) {
      unfollowUser({
        userId: currentUser?.userId,
        followedUserId: profileUserData.userId,
      });

      handleFollowChange();
      setIsFollowed(false);
    } else {
      followUser({
        userId: currentUser?.userId,
        followedUserId: profileUserData.userId,
      });

      handleFollowChange();
      setIsFollowed(true);
    }
  }

  return (
    <Button onClick={handleClick} className={cn("bg-primary", className)}>
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default FollowButton;
