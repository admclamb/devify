import { useState } from 'react';
import CommentsList from './CommentsList';
import CreateComment from './CreateComment';
import ErrorAlert from '../../errors/ErrorAlert';
import { destroyComment, readComments } from '../../utils/api';

import './PostMainComments.css';

const PostMainComments = ({ comments, setComments, post_id }) => {
  const [error, setError] = useState(null);

  const deleteComment = async (comment_id) => {
    try {
      console.log('deleting comment');
      console.log(comment_id);
      const abortController = new AbortController();
      const res = await destroyComment(comment_id, abortController.signal);
      console.log(res);
      const comments = await readComments(post_id, abortController.signal);
      setComments(comments);
    } catch (error) {
      setError(error);
    }
  };
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
      <CommentsList comments={comments} deleteComment={deleteComment} />
    </section>
  );
};
export default PostMainComments;
