import { useEffect, useState } from 'react';
import { listPosts } from '../../utils/api';
import FeedLoading from './FeedLoading';
import FeedNav from './FeedNav';
import ErrorAlert from '../../errors/ErrorAlert';
import Posts from '../posts/Posts';
import { sortPosts } from '../../utils/sort';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  console.log(error);
  useEffect(() => {
    const abortController = new AbortController();
    setPosts([]);
    setError(null);
    listPosts({}, abortController.signal)
      .then(sortPosts)
      .then(setPosts)
      .catch(setError);
    return () => abortController.abort();
  }, []);
  console.log(posts);
  const content =
    posts.length > 0 ? (
      <Posts posts={posts} setError={setError} />
    ) : !error ? (
      <FeedLoading />
    ) : (
      ''
    );
  return (
    <section>
      <FeedNav />
      <ErrorAlert error={error} />
      {content}
    </section>
  );
};

export default Feed;
