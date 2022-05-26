import { useContext, useState } from 'react';
import CommentsList from './CommentsList';
import CreateComment from './CreateComment';
import ErrorAlert from '../../errors/ErrorAlert';
import { destroyComment, readComments } from '../../utils/api';

import './PostMainComments.css';
import { UserContext } from '../../utils/UserContext';

const PostMainComments = ({ comments, setComments, post_id }) => {
  const session = useContext(UserContext);
  const { user_id } = session;
  const [error, setError] = useState(null);

  const deleteComment = async (comment_id) => {
    try {
      const abortController = new AbortController();
      const res = await destroyComment(comment_id, abortController.signal);
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
      {user_id && (
        <CreateComment
          post_id={post_id}
          setError={setError}
          comments={comments}
          setComments={setComments}
        />
      )}

      <CommentsList comments={comments} deleteComment={deleteComment} />
    </section>
  );
};
export default PostMainComments;
