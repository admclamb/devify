import CreateComment from './CreateComment';

const PostMainComments = ({ comments, post_id }) => {
  return (
    <section className="comments">
      <h4>Discussion ({comments.length})</h4>
      <CreateComment post_id={post_id} />
    </section>
  );
};
export default PostMainComments;
