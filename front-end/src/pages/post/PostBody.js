import './PostBody.css';

const PostBody = ({ body, setBody }) => {
  const handleChange = ({ target }) => {
    setBody(target.value);
  };
  return (
    <form className="create-post-body-form">
      <textarea
        className="create-post-body-input mt-4"
        placeholder="Write your post content here..."
        value={body}
        onChange={handleChange}
      />
    </form>
  );
};

export default PostBody;
