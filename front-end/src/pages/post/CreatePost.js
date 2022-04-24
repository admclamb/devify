import { useParams } from "react-router-dom";
import CreatePostNav from "./CreatePostNav";

const CreatePost = () => {
  const { user_id } = useParams();
  return (
    <article className="row container-lg">
      <header>
        <button className="btn btn-lg btn-outline-dark">
          Add a cover image
        </button>
        <form>
          <input placeholder="New post title here..." />
        </form>
        <CreatePostNav />
      </header>
    </article>
  );
};

export default CreatePost;
