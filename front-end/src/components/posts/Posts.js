import PostCard from './PostCard';
import './Posts.css';
const Posts = ({ posts }) => {
  if (!Array.isArray(posts)) return null;
  const postsList = posts.map((post) => {
    return <PostCard post={post} key={post.post_id} />;
  });

  return <div className="post-list">{postsList}</div>;
};

export default Posts;
