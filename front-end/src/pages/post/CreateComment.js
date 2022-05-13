import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';
import './CreateComment.css';
const CreateComment = ({ post_id }) => {
  const session = useContext(UserContext);
  console.log(session);
  const { user_id, first_name } = session;
  const [comment, setComment] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(comment);
  };
  const commentButtons = (
    <div>
      <button className="btn btn-primary me-2" onClick={handleSubmit}>
        Submit
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
          {first_name[0].toUpperCase()}
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
