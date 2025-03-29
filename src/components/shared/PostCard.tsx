import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { PostStats } from "@/components/shared";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useAddComment, useGetComments } from "@/lib/react-query/queries";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext(); // Logged-in user context
  const [comment, setComment] = useState("");
  const [areCommentsVisible, setAreCommentsVisible] = useState(false); // State to toggle comments visibility
  const { mutate: addCommentMutate } = useAddComment(); // Mutate to add a comment

  if (!post.creator) return null;

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return; // Don't submit empty comments

    // Ensure the comment has the correct logged-in user's data
    try {
      await addCommentMutate({
        postId: post.$id, // The post ID to link the comment to
        accountId: user.id, // The logged-in user's ID (this is the one submitting the comment)
        username: user.username, // The logged-in user's username
        text: comment, // The content of the comment
        imageUrl: user.imageUrl, // The logged-in user's image URL
      });

      // Clear the comment input after submission
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Fetch comments for the post
  const {
    data: comments,
    isLoading,
    isError,
    refetch,
  } = useGetComments(post.$id);

  // UseEffect to refetch comments after adding a comment
  useEffect(() => {
    if (comments) {
      refetch();
    }
  }, [comments, refetch]);

  // Toggle the visibility of comments
  const toggleCommentsVisibility = () => {
    setAreCommentsVisible((prev) => !prev);
  };

  return (
    <div className="post-card">
      {/* Existing Post Card UI */}
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        {/* Edit button */}
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>

      {/* Post Content */}
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />

      {/* Comment SVG Icon to Toggle Comments */}
      <div className="comments-toggle mt-4">
        <img
          onClick={toggleCommentsVisibility} // Handles click event
          src="/assets/icons/comment.svg"
          alt="Comment Icon" // Adding alt for accessibility
          className="cursor-pointer w-5 h-5" // Add a pointer cursor to indicate interactivity
        />
      </div>

      {/* Comment Input - Always visible */}
      <div className="comment-input mt-4 flex gap-3">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="user"
          className="w-8 h-8 rounded-full"
        />
        <textarea
          className="w-full p-2 border rounded-lg bg-transparent resize-none"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleCommentSubmit}
          className="p-2 bg-[#5A04FF] text-white rounded-lg hover:bg-[#4803cc] focus:outline-none focus:ring-2 focus:ring-[#5A04FF] transition duration-300 ease-in-out shadow-lg h-full">
          Post
        </button>
      </div>

      {/* Comments Section - Toggle visibility based on the state */}
      {areCommentsVisible && (
        <div className="comments-section mt-5">
          <div className="comments-header">
            <p className="text-light-1">Comments</p>
          </div>

          {/* Display Comments */}
          <div className="comments-list mt-5">
            {isLoading && <p>Loading comments...</p>}
            {isError && <p>Error loading comments.</p>}
            {comments && comments.length > 0 ? (
              comments.map((comment: any) => (
                <div key={comment.$id} className="comment-item flex gap-3 mb-4">
                  <img
                    src={comment.imageUrl}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-light-1">
                      @{comment.username}
                    </p>
                    <p className="text-light-2">{comment.text}</p>
                    <p className="text-light-3 text-sm">
                      {multiFormatDateString(comment.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
