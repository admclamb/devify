import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { createComment, readComments } from '../../utils/api';
import { UserContext } from '../../utils/UserContext';
import './CreateComment.css';
const CreateComment = ({ post_id, setError, setComments, comments }) => {
  const session = useContext(UserContext);
  console.log(session);
  const { user_id, first_name } = session;
  const [comment, setComment] = useState('');
  const [submitBtnText, setSubmitBtnText] = useState('Submit');
  const handleSubmit = async (event) => {
    setError(null);
    setSubmitBtnText('Loading...');
    try {
      event.preventDefault();
      console.log({ post_id, user_id, comment });
      const abortController = new AbortController();
      await createComment(
        { post_id, user_id, comment },
        abortController.signal
      );
      const comments = await readComments(post_id, abortController.signal);
      console.log(comments);
      setComments(comments.reverse());
      setComment('');
      setSubmitBtnText('Submit');
    } catch (error) {
      setError(error);
      setSubmitBtnText('Submit');
    }
  };
  const commentButtons = (
    <div>
      <button className="btn btn-primary me-2" onClick={handleSubmit}>
        {submitBtnText}
      </button>
      <button className="btn btn-secondary" onClick={() => setComment('')}>
        Cancel
      </button>
    </div>
  );
  return (
    <article className="comment-card">
      <aside>
        <Link to={`/`} className="comment-pfp">
          {first_name ? first_name[0].toUpperCase() : 'P'}
        </Link>
      </aside>
      <main className="comment-card__main">
        <form>
          <textarea
            type="text"
            placeholder="Add to the discussion"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            className="comment-text-input"
          />
          {comment ? commentButtons : ''}
        </form>
      </main>
    </article>
  );
};

export default CreateComment;
