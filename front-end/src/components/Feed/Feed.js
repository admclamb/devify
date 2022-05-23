import { useContext, useEffect, useState } from 'react';
import { listPosts, readSaves } from '../../utils/api';
import FeedLoading from './FeedLoading';
import FeedNav from './FeedNav';
import ErrorAlert from '../../errors/ErrorAlert';
import Posts from '../posts/Posts';
import { sortPosts } from '../../utils/sort';
import { UserContext } from '../../utils/UserContext';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [userSaves, setUserSaves] = useState([]);
  const [userReactions, setUserReactions] = useState({});
  const [updatedSave, setUpdatedSave] = useState({});
  const session = useContext(UserContext);
  const { user_id } = session;
  useEffect(() => {
    setError(null);
    const abortController = new AbortController();
    const getUserSaves = async () => {
      try {
        if (user_id) {
          const response = await readSaves(user_id, abortController.signal);
          setUserSaves(response);
        }
      } catch (error) {
        setError(error);
      }
    };
    getUserSaves();
  }, [updatedSave, user_id]);
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
  console.log('user_saves: ', userSaves);
  const content =
    posts.length > 0 ? (
      <Posts posts={posts} setError={setError} userSaves={userSaves} />
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
