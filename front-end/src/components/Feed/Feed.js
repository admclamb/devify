import { useEffect, useState } from "react";
import { listPosts } from "../../utils/api";
import FeedLoading from "./FeedLoading";
import FeedNav from "./FeedNav";
import ErrorAlert from "../../errors/ErrorAlert";
import Posts from "../posts/Posts";
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setPosts([]);
    listPosts({}, abortController.signal).then(setPosts).catch(setError);
    return () => abortController.abort();
  }, []);
  const content =
    posts.length > 0 ? <Posts posts={posts} /> : !error ? <FeedLoading /> : "";
  return (
    <section>
      <FeedNav />
      <ErrorAlert error={error} />
      {content}
    </section>
  );
};

export default Feed;
