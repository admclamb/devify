import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readComments, readPost } from "../../utils/api";
import PostSidebar from "./PostSidebar";
import PostMain from "./PostMain";
import PostBio from "./PostBio";
import FeedLoading from "../../components/Feed/FeedLoading";
import ErrorAlert from "../../errors/ErrorAlert";
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
      .then(setComments)
      .catch(setError);
  }, [post_id]);
  console.log(post);
  if (!post && !error) return <FeedLoading />;
  return (
    <main className="row container-lg gx-0">
      <ErrorAlert error={error} />
      <aside className="col-sm-1">
        <PostSidebar />
      </aside>
      <section className="col-sm-8">
        <PostMain post={post} comments={comments} />
      </section>
      <section className="col-sm-4">
        <PostBio />
      </section>
    </main>
  );
};

export default Post;
