import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1 bg-[#5A04FF]">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/1.svg" width={36} height={36} alt="add" />
          <h2 className="h3-bold md:h2-bold text-left w-full flex items-center bg-transparent border border-white/20 px-4 py-2 rounded-full relative">
            Create Post
          </h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
