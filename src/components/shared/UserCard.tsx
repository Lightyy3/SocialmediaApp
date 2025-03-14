import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import React from "react";
import { Models } from "appwrite";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  // State to track if the current user is following the displayed user
  const [isFollowing, setIsFollowing] = React.useState(false);

  // Get current user's ID (assumes you have the current user from context)
  const currentUserId = "currentUserId"; // Replace with actual logic for getting current user's ID

  // Check if the user is already followed (based on localStorage)
  React.useEffect(() => {
    const followedUsers = JSON.parse(
      localStorage.getItem("followedUsers") || "[]"
    );
    if (followedUsers.includes(user.$id)) {
      setIsFollowing(true); // Set follow state if already in localStorage
    }
  }, [user.$id]);

  // Handle follow button click
  const handleFollowClick = () => {
    if (!isFollowing) {
      // Optimistically update the follow state
      setIsFollowing(true);

      // Save the followed user to localStorage
      const followedUsers = JSON.parse(
        localStorage.getItem("followedUsers") || "[]"
      );
      followedUsers.push(user.$id);
      localStorage.setItem("followedUsers", JSON.stringify(followedUsers));
    } else {
      // If already following, unfollow the user
      setIsFollowing(false);

      // Remove from localStorage
      let followedUsers = JSON.parse(
        localStorage.getItem("followedUsers") || "[]"
      );
      followedUsers = followedUsers.filter((id: string) => id !== user.$id);
      localStorage.setItem("followedUsers", JSON.stringify(followedUsers));
    }
  };

  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className={`shad-button_primary px-5 ${
          isFollowing ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        onClick={handleFollowClick}
        disabled={isFollowing} // Disable button when following
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </Link>
  );
};

export default UserCard;
