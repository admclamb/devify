import { useState } from 'react';
import CommentsList from './CommentsList';
import CreateComment from './CreateComment';
import ErrorAlert from '../../errors/ErrorAlert';
import './PostMainComments.css';
const PostMainComments = ({ comments, setComments, post_id }) => {
  const [error, setError] = useState(null);
  return (
    <section className="comments">
      <ErrorAlert error={error} />
      <h4 className="mb-4">Discussion ({comments.length})</h4>
      <CreateComment
        post_id={post_id}
        setError={setError}
        comments={comments}
        setComments={setComments}
      />
      <CommentsList comments={comments} />
    </section>
  );
};
export default PostMainComments;
