import { Models } from "appwrite";

// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

const Home = () => {
  // const { toast } = useToast();

  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 bg-[#5A04FF]">
      <div className="home-container">
        {/* Home Feed Section */}
        <div className="home-posts">
          <div className="flex gap-2 w-full max-w-5xl">
            <img
              src="/assets/icons/home.svg"
              width={36}
              height={36}
              alt="edit"
              className="invert-white "
            />
            <h2 className="h3-bold md:h2-bold text-left w-full flex items-center bg-transparent border border-white/20 px-4 py-2 rounded-full relative">
              Home Feed
            </h2>
          </div>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Top Creators Section (Now inside home-container) */}
        <div className="hidden xl:flex w-[600px] px-6 py-10 gap-10 mt-10 flex-col">
          {/* Title Centered on Full Row */}
          <h3 className="h3-bold text-light-1 w-full text-center flex items-center bg-transparent border border-white/20 px-4 py-2 rounded-full relative">
            Top Creators
          </h3>

          {isUserLoading && !creators ? (
            <Loader />
          ) : (
            <ul className="flex flex-row gap-6 overflow-x-auto">
              {creators?.documents.map((creator) => (
                <li key={creator?.$id} className="flex-shrink-0 w-[200px]">
                  <UserCard user={creator} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
