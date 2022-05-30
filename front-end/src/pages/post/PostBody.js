import { useEffect, useState } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import './PostBody.css';
const PostBody = ({ body, setBody }) => {
  const [scrollHeight, setScrollHeight] = useState(3);
  const handleChange = ({ target }) => {
    setBody(target.value);
  };
  return (
    <form className="create-post-body-form">
      <TextareaAutoSize
        className="create-post-body-input mt-4"
        placeholder="Write your post content here..."
        value={body}
        onChange={handleChange}
      />
    </form>
  );
};

export default PostBody;
