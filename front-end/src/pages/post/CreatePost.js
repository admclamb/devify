import { useNavigate, useParams } from 'react-router-dom';
import CreatePostNav from './CreatePostNav';
import PostBody from './PostBody';
import './CreatePost.css';
import { useState } from 'react';
import { createPost } from '../../utils/api';
import ErrorAlert from '../../errors/ErrorAlert';
const CreatePost = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const initPost = {
    post_header: '',
    image_url: '',
    hashtags_array: [],
    user_id: parseInt(user_id) || null,
  };
  const [post, setPost] = useState(initPost);
  const [error, setError] = useState(null);
  const [body, setBody] = useState('');

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
      const abortController = new AbortController();
      const outPost = {
        ...post,
        post_body: body,
      };
      console.log('Outpost: ', outPost);
      await createPost(outPost, abortController.signal);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  console.log(post, body);
  return (
    <>
      <div className="row container-lg">
        <ErrorAlert error={error} />
      </div>

      <nav className="row container-lg">
        <div className="create-post-top-nav d-flex mb-3">
          <button className="btn ms-auto me-4">Edit</button>
          <button className="btn ">Preview</button>
        </div>
      </nav>
      <article className="row container-lg create-post-container rounded">
        <header>
          <div>
            <button className="btn btn-lg btn-outline-dark mb-4">
              Add a cover image
            </button>
            <form>
              <input
                placeholder="New post title here..."
                type="text"
                value={post.post_header}
                onChange={handleChange}
                id="post_header"
              />
            </form>
          </div>
          <CreatePostNav />
        </header>
        <main className="post-body-container">
          <PostBody body={body} setBody={setBody} />
        </main>
      </article>
      <section className="footer row container-lg">
        <div className="publish-buttons mt-4">
          <button
            className="submit btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Publish
          </button>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
