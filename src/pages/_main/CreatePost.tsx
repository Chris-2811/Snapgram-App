import PostForm from "../../components/forms/PostForm";
import SidebarPost from "@/components/shared/_main/SidebarPost";

function CreatePost() {
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
            <h1 className="heading-md lg:heading-lg">Create a Post</h1>
          </div>
          <PostForm action="create" />
        </div>
      </div>
      <div>
        <SidebarPost />
      </div>
    </div>
  );
}

export default CreatePost;
