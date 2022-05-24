import PostSidebar from './PostSidebar';

const PostSidebarBottom = ({ post, setError, reactions, setReactions }) => {
  return (
    <PostSidebar
      post={post}
      setError={setError}
      reactions={reactions}
      setReactions={setReactions}
    />
  );
};

export default PostSidebarBottom;
