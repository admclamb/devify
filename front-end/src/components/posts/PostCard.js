import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post, toggleLike }) => {
  const {
    post_id,
    image_url = null,
    created_at,
    first_name = null,
    last_name = null,
    hashtags_array,
    post_header,
    likes = 0,
  } = post;
  const hashtags = Array.isArray(hashtags_array)
    ? hashtags_array.join('  ')
    : '';
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
                ? first_name + '   ' + last_name
                : 'No Name'}
            </h5>

            <p className="text-sm text-dark">{created_at}</p>
          </div>
        </div>
        <header className="post-card-header">
          <Link to={`/post/${post_id}`} className="post-header-link">
            <h2>{post_header}</h2>
          </Link>
        </header>

        <div className="post-card-main">
          <p className="text-dark">{hashtags}</p>
          <div className="footer d-flex align-items-center mt-5">
            <button
              className="btn me-5 text-dark"
              onClick={() => toggleLike(post_id)}
            >
              <i className="fa-light fa-heart text-dark"></i> {likes} Likes
            </button>
            <p className="text-dark">
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
