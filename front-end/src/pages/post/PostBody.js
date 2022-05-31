import { useEffect, useState } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import './PostBody.css';
const PostBody = ({ body, setBody, textareaRef }) => {
  const handleChange = ({ target }) => {
    setBody(target.value);
  };
  return (
    <form className="create-post-body-form">
      <TextareaAutoSize
        ref={textareaRef}
        className="create-post-body-input mt-4"
        placeholder="Write your post content here..."
        value={body}
        onChange={handleChange}
        id="post-textarea"
      />
    </form>
  );
};

export default PostBody;
