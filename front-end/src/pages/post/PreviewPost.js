import FormatPost from './FormatPost';
import './PreviewPost.css';
const PreviewPost = ({ body }) => {
  return (
    <div className="post-preview p-4 border rounded">
      <FormatPost post={body} />
    </div>
  );
};

export default PreviewPost;
