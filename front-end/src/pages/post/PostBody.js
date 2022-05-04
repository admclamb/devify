import './PostBody.css';

const PostBody = ({ body, setBody }) => {
  return (
    <form className="create-post-body-form">
      <input className="create-post-body-input" type="text" />
    </form>
  );
};

export default PostBody;
