import PostCard from './PostCard';
import { likePost } from '../../utils/api';
import './Posts.css';
const Posts = ({ posts, setError }) => {
  const toggleLike = async (post_id) => {
    try {
      setError(null);
      const abortController = new AbortController();
      const like = await likePost(post_id);
      console.log(like);
    } catch (error) {
      setError(error);
    }
  };
  if (!Array.isArray(posts)) return null;
  const postsList = posts.map((post) => {
    return <PostCard post={post} key={post.post_id} toggleLike={toggleLike} />;
  });

  return <div className="post-list">{postsList}</div>;
};

export default Posts;
