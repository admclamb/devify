import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreatePostNav from './CreatePostNav';
import PostBody from './PostBody';
import { useState } from 'react';
import { createPost, postImage } from '../../utils/api';
import ErrorAlert from '../../errors/ErrorAlert';
import './CreatePost.css';
import PreviewPost from './PreviewPost';
const CreatePost = () => {
  const { user_id } = useParams();
  const [publishBtnText, setPublishBtnText] = useState('Publish');
  const navigate = useNavigate();
  const initPost = {
    post_header: '',
    image_url: '',
    hashtags_array: [],
    user_id: parseInt(user_id) || null,
  };
  const [post, setPost] = useState(initPost);
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState(null);
  const [body, setBody] = useState('');
  const [previewPost, setPreviewPost] = useState(false);
  const textareaRef = useRef();
  const handleChange = async ({ target }) => {
    const { id } = target;
    setPost({
      ...post,
      [id]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setError(null);
      setPublishBtnText('Publishing...');
      const abortController = new AbortController();
      const outPost = {
        ...post,
        post_body: body,
        image_url: null,
      };
      if (coverImage) {
        const imageResponse = await postImage(coverImage);
        outPost.image_url = imageResponse.data.data;
      }
      await createPost(outPost, abortController.signal);
      navigate('/');
      setPublishBtnText('Publish');
    } catch (error) {
      setError(error);
      setPublishBtnText('Publish');
    }
  };
  console.log(body);
  return (
    <div className="container">
      <div className="row">
        <ErrorAlert error={error} />
      </div>
      <nav className="row">
        <div className="create-post-top-nav d-flex mb-3">
          <button
            className={`create-post-button btn ms-auto me-4 ${
              previewPost ? '' : 'preview-active'
            }`}
            onClick={() => setPreviewPost(false)}
          >
            Edit
          </button>
          <button
            className={`create-post-button btn ${
              previewPost ? 'preview-active' : ''
            }`}
            onClick={() => setPreviewPost(true)}
          >
            Preview
          </button>
        </div>
      </nav>
      <article className="row create-post-container rounded gx-0 border">
        {previewPost ? (
          <PreviewPost body={body} />
        ) : (
          <>
            <header>
              <div className="create-post-header-main">
                <form>
                  <input
                    type="file"
                    className="create-post__add-cover-image form-control mb-3"
                    onChange={({ target }) => setCoverImage(target.files[0])}
                  />
                </form>
                <form>
                  <input
                    placeholder="New post title here..."
                    type="text"
                    value={post.post_header}
                    onChange={handleChange}
                    id="post_header"
                    className="post_header-input"
                  />
                </form>
              </div>
              <CreatePostNav
                setBody={setBody}
                body={body}
                textareaRef={textareaRef}
              />
            </header>
            <main className="create-post-body-container">
              <PostBody
                body={body}
                setBody={setBody}
                textareaRef={textareaRef}
              />
            </main>
          </>
        )}
      </article>
      <section className="footer row container">
        <div className="publish-buttons mt-4">
          <button
            className="submit btn btn-primary"
            type="submit"
            onClick={handleSubmit}
            disabled={publishBtnText !== 'Publish'}
          >
            {publishBtnText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
