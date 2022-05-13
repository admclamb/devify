import { useContext, useState } from 'react';
import { UserContext } from '../../utils/UserContext';
import './CreateComment.css';
const CreateComment = ({ post_id }) => {
  const session = useContext(UserContext);
  const { user_id } = session;
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
  );
};

export default CreateComment;
