import { useParams } from 'react-router-dom';
import CreatePostNav from './CreatePostNav';
import PostBody from './PostBody';
import './CreatePost.css';
const CreatePost = () => {
  const { user_id } = useParams();
  return (
    <>
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
              <input placeholder="New post title here..." />
            </form>
          </div>
          <CreatePostNav />
        </header>
        <main>
          <PostBody />
        </main>
      </article>
    </>
  );
};

export default CreatePost;
