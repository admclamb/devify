import { Link } from 'react-router-dom';
import { formatAsMonthDay } from '../../utils/formatDate';
import './CommentCard.css';
const CommentCard = ({ comment_data }) => {
  const { comment, first_name, last_name, user_id, created_at } = comment_data;
  return (
    <article className="comment-card">
      <aside>
        <Link to={`/`} className="comment-pfp">
          P
        </Link>
      </aside>

      <main className="comment-card__main">
        <div className="comment-card-main border p-3 rounded">
          <header className="comment-header">
            <p className="text-sm">{`${first_name} ${last_name}`}</p>
            <p className="ms-4 text-sm">{formatAsMonthDay(created_at)}</p>
          </header>
          <article>
            <p>{comment}</p>
          </article>
        </div>
        <div className="buttons">
          <button className="btn me-2 comment-button">
            <i className="fa-solid fa-heart me-2"></i>0 Likes
          </button>
          <button className="btn comment-button">
            <i className="fa-solid fa-comment me-2"></i>
            Reply
          </button>
        </div>
      </main>
    </article>
  );
};

export default CommentCard;
