import FeedLoading from '../../components/Feed/FeedLoading';
import './PostMain.css';
import PostMainComments from './PostMainComments';
const PostMain = ({ post, comments }) => {
  if (!post) return <FeedLoading />;
  const {
    post_id = null,
    image_url = null,
    created_at = null,
    first_name = null,
    last_name = null,
    hashtags_array = null,
    post_header = null,
  } = post;
  if (!post_id) return <FeedLoading />;
  const hashtags = Array.isArray(hashtags_array)
    ? hashtags_array.join('  ')
    : '';
  return (
    <>
      <article className="post-main-container">
        <header>
          {image_url && (
            <div className="img-wrapper">
              <img src={image_url} width="100%" />
            </div>
          )}
        </header>
        <div className="post-main-body">
          <div className="mt-4">
            <div className="post-card-head d-flex align-items-center mb-3">
              <div className="post-card-pfp"></div>
              <div className="name_date">
                <h5 className="text-sm">{first_name + '   ' + last_name}</h5>
                <p className="text-sm">{created_at}</p>
              </div>
            </div>
          </div>
          <h2>{post_header}</h2>
          <p>{hashtags}</p>
          <div className="post-main-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
              non quis exercitationem culpa nesciunt nihil aut nostrum explicabo
              reprehenderit optio amet ab temporibus asperiores quasi
              cupiditate. Voluptatum ducimus voluptates voluptas?
            </p>
          </div>
          <PostMainComments comments={comments} />
        </div>
      </article>
    </>
  );
};
export default PostMain;
