import "./PostCard.css";

const PostCard = ({ post }) => {
  console.log(post);
  const {
    post_url,
    created_at,
    first_name,
    last_name,
    post_body,
    post_header,
  } = post;
  return (
    <article className="post-card">
      <div className="post-card-head d-flex align-items-center mb-3">
        <div className="post-card-pfp"></div>
        <div className="name_date">
          <h5 className="text-sm">{first_name + " " + last_name}</h5>
          <p className="text-sm">{created_at}</p>
        </div>
      </div>
      <header className="post-card-header">
        <h4>{post_header}</h4>
      </header>
      <div className="post-card-main">
        <p>{post_body}</p>
        <div className="footer d-flex align-items-center mt-5">
          <p className="me-5">
            <i class="fa-light fa-heart"></i> 0 Likes
          </p>
          <p>
            <i class="fa-light fa-comment"></i> Add Comment
          </p>
          <button className=" ms-auto btn btn-secondary">Save</button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
