import CreatePost from "../posts/createPost";
import Post from "./post";

const PostsList = ({ posts, user }) => {
  return (
    <div className="w-full flex flex-col gap-4 mt-4 lg:mt-16 md:px-4 relative">
      <div className="w-max absolute right-4 top-1">
        <CreatePost userId={user.publicMetadata.userId} />
      </div>
      <h1 className="hidden lg:block text-2xl text-primary font-bold">Posts</h1>
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default PostsList;
