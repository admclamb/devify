import CommentsList from './CommentsList';
import CreateComment from './CreateComment';
import './PostMainComments.css';
const PostMainComments = ({ comments, post_id }) => {
  return (
    <section className="comments">
      <h4 className="mb-4">Discussion ({comments.length})</h4>
      <CreateComment post_id={post_id} />
      <CommentsList comments={comments} />
    </section>
  );
};
export default PostMainComments;
