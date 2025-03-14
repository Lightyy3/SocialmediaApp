import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { Button } from "@/components/ui";
import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { GridPostList, Loader } from "@/components/shared";
import { useFollowUser } from "@/lib/react-query/queries"; // Import the follow hook
import React from "react";

interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">
      {value !== undefined ? value : 0}{" "}
      {/* Fallback to 0 if value is undefined */}
    </p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser, refetch } = useGetUserById(id || ""); // Fetch user data
  const { mutate: follow, isLoading } = useFollowUser(); // Mutation hook for following users

  const [isFollowing, setIsFollowing] = React.useState(false); // State to track if the user has clicked "Follow"

  // Check if the user has already followed when the component mounts
  React.useEffect(() => {
    const followedUsers = JSON.parse(
      localStorage.getItem("followedUsers") || "[]"
    );
    if (followedUsers.includes(id)) {
      setIsFollowing(true);
    }
  }, [id]);

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const handleFollowClick = () => {
    if (currentUser && user && !isFollowing) {
      // Optimistically update the followers count
      const updatedFollowCount = currentUser.followCount + 1;
      refetch(); // Refetch data to get the updated count

      // Call the follow mutation
      follow({
        user: {
          userId: currentUser.$id,
          name: currentUser.name,
          bio: currentUser.bio,
          imageId: currentUser.imageId,
          imageUrl: currentUser.imageUrl,
          file: currentUser.file,
        },
        currentFollowCount: updatedFollowCount,
      });

      // Update the state to reflect the follow action
      setIsFollowing(true);

      // Save the followed user's ID to localStorage
      const followedUsers = JSON.parse(
        localStorage.getItem("followedUsers") || "[]"
      );
      followedUsers.push(id);
      localStorage.setItem("followedUsers", JSON.stringify(followedUsers));
    }
  };

  return (
    <div className="profile-container bg-[#5A04FF]">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full items-start bg-transparent border border-white/20 px-4 py-2 rounded-full relative">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-white text-left xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock
                value={currentUser.followCount || 0} // Fallback to 0 if `followCount` is undefined
                label="Followers"
              />
              <StatBlock value={9} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {/* Conditional rendering for the edit profile button */}
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>

            {/* Conditional rendering for the follow button */}
            <div className={`${user.id === currentUser.$id && "hidden"}`}>
              <Button
                type="button"
                className="shad-button_primary px-8"
                onClick={handleFollowClick}
                disabled={isLoading || isFollowing} // Disable the button if already following or while loading
              >
                {isLoading
                  ? "Following..."
                  : isFollowing
                  ? "Following"
                  : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
