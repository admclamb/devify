import { useEffect } from 'react';
import PostCard from './PostCard';
import './Posts.css';
const Posts = ({ posts, userSaves, reactions, setReactions }) => {
  if (!Array.isArray(posts)) return null;
  const postsList = posts.map((post, index) => {
    return (
      <PostCard
        post={post}
        key={post.post_id}
        liked={true}
        userSaves={userSaves}
        reactions={reactions}
        setReactions={setReactions}
      />
    );
  });

  return <div className="post-list">{postsList}</div>;
};

export default Posts;
