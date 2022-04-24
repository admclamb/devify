import { Link } from "react-router-dom";
import "./PostCard.css";

const PostCard = ({ post }) => {
  console.log(post);
  const {
    post_id,
    image_url,
    created_at,
    first_name = null,
    last_name = null,
    hashtags_array,
    post_header,
  } = post;
  const hashtags = Array.isArray(hashtags_array)
    ? hashtags_array.join("  ")
    : "";
  return (
    <article className="post-card">
      {image_url && (
        <div className="post-card-image">
          <img src={image_url} width="100%" className="mb-4" />
        </div>
      )}
      <div className="post-card-container">
        <div className="post-card-head d-flex align-items-center mb-3">
          <div className="post-card-pfp"></div>
          <div className="name_date">
            <h5 className="text-sm">
              {first_name && last_name
                ? first_name + "   " + last_name
                : "No Name"}
            </h5>

            <p className="text-sm">{created_at}</p>
          </div>
        </div>
        <header className="post-card-header">
          <Link to={`/post/${post_id}`} className="post-header-link">
            <h2>{post_header}</h2>
          </Link>
        </header>

        <div className="post-card-main">
          <p>{hashtags}</p>
          <div className="footer d-flex align-items-center mt-5">
            <p className="me-5">
              <i className="fa-light fa-heart"></i> 0 Likes
            </p>
            <p>
              <i className="fa-light fa-comment"></i> Add Comment
            </p>
            <button className=" ms-auto btn btn-secondary">Save</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
