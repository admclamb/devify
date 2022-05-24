import { useContext, useEffect, useState } from 'react';
import { listPosts, readSaves, readUserReactions } from '../../utils/api';
import FeedLoading from './FeedLoading';
import FeedNav from './FeedNav';
import ErrorAlert from '../../errors/ErrorAlert';
import Posts from '../posts/Posts';
import { sortPosts } from '../../utils/sort';
import { UserContext } from '../../utils/UserContext';
const Feed = ({ reactions, setReactions }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({ type: '' });
  const session = useContext(UserContext);
  const { user_id } = session;
  useEffect(() => {
    const abortController = new AbortController();
    setPosts([]);
    setError(null);
    listPosts(query, abortController.signal).then(setPosts).catch(setError);
    return () => abortController.abort();
  }, [query]);
  const content =
    posts.length > 0 ? (
      <Posts
        posts={posts}
        setError={setError}
        reactions={reactions}
        setReactions={setReactions}
      />
    ) : !error ? (
      <>
        <div className="mb-3">
          <FeedLoading />
        </div>
        <div className="mb-3">
          <FeedLoading />
        </div>
        <div className="mb-3">
          <FeedLoading />
        </div>
      </>
    ) : (
      ''
    );
  return (
    <section>
      <FeedNav setQuery={setQuery} query={query} />
      <ErrorAlert error={error} />
      {content}
    </section>
  );
};

export default Feed;
