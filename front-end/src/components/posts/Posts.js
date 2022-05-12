import { useEffect } from 'react';
import PostCard from './PostCard';
import './Posts.css';
const Posts = ({ posts }) => {
  useEffect(() => {});
  if (!Array.isArray(posts)) return null;
  const postsList = posts.map((post, index) => {
    return <PostCard post={post} key={index} liked={true} />;
  });

  return <div className="post-list">{postsList}</div>;
};

export default Posts;
