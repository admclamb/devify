import CommentCard from './CommentCard';
import './CommentList.css';
const CommentsList = ({ comments }) => {
  if (!Array.isArray(comments)) return null;
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment_data={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
