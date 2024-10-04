import React from "react";
import { IPost } from "@/types";
import PostCard from "@/components/Home/PostCard";

function SocialStream({ posts, currentPost }: { posts: IPost[] }) {
  const filterdPosts = posts.filter(
    (post) => post.postId !== currentPost.postId,
  );

  return (
    <div className="">
      {posts && (
        <ul role="list" className="flex flex-col gap-10 lg:mt-0">
          <PostCard post={currentPost} />
          {filterdPosts.flatMap((post) => (
            <li key={post.postId}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SocialStream;
