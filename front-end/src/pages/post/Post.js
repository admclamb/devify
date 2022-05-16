import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserReactions, readComments, readPost } from '../../utils/api';
import PostSidebar from './PostSidebar';
import PostMain from './PostMain';
import FeedLoading from '../../components/Feed/FeedLoading';
import ErrorAlert from '../../errors/ErrorAlert';
import ProfileBio from '../../components/Profile/ProfileBio';
const Post = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    setPost({});
    setError(null);
    readPost(post_id, abortController.signal).then(setPost).catch(setError);
    readComments(post_id, abortController.signal)
      .then((res) => setComments(res.reverse()))
      .catch(setError);
    return () => abortController.abort();
  }, [post_id]);

  if (!post && !error) return <FeedLoading />;
  return (
    <div className="container">
      <main className="row gx-4">
        <ErrorAlert error={error} />
        <aside className="col-sm-1">
          <PostSidebar post={post} setError={setError} />
        </aside>
        <section className="col-sm-8">
          <PostMain post={post} comments={comments} setComments={setComments} />
        </section>
        <section className="col-sm-3">
          <ProfileBio post_user_id={post.user_id} />
        </section>
      </main>
    </div>
  );
};

export default Post;
