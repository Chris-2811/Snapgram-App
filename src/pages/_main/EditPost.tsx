import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/react-query/queries";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import SidebarPost from "@/components/shared/_main/SidebarPost";

function EditPost() {
  const params = useParams();
  console.log("params", params);
  const postId = params.id || "";
  const { data: post } = useGetPostById(postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 px-4 pb-[7.25rem] pt-10 md:px-10 lg:px-[3rem] lg:pt-[5.4375rem]">
        <div className="max-w-[600px]">
          <div className="flex items-center gap-2">
            <img
              src="/assets/icons/gallery-add.svg"
              alt=""
              className="invert-white w-9"
            />
            <h1 className="heading-lg">Update Post</h1>
          </div>
          <PostForm action="update" post={post} />
        </div>
      </div>
      <SidebarPost />
    </div>
  );
}

export default EditPost;
