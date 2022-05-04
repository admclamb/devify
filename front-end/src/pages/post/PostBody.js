import './PostBody.css';

const PostBody = ({ body, setBody }) => {
  return (
    <form className="create-post-body-form">
      <textarea
        className="create-post-body-input mt-4"
        placeholder="Write your post content here..."
      />
    </form>
  );
};

export default PostBody;
