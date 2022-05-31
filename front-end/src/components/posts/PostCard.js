import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleReaction } from '../../utils/api';
import { formatAsMonthDay } from '../../utils/formatDate';
import { UserContext } from '../../utils/UserContext';
import './PostCard.css';

const PostCard = ({ post, reactions, setReactions }) => {
  const [saveBtnText, setSaveBtnText] = useState('Save');
  const {
    post_id,
    avatar,
    image_url = null,
    created_at,
    first_name = null,
    last_name = null,
    hashtags_array,
    post_header,
    likes = 0,
  } = post;
  const session = useContext(UserContext);
  const { user_id } = session;
  const hashtags = Array.isArray(hashtags_array)
    ? hashtags_array.join('  ')
    : '';
  const pfp = (
    <img src={avatar} width="100%" className="post-card-pfp pfp-img" />
  );
  const handleSave = async () => {
    const abortController = new AbortController();
    const method = saveBtnText === 'Save' ? 'POST' : 'DELETE';
    handleReaction(post_id, user_id, abortController.signal, 'save', method);
    if (saveBtnText === 'Saved') {
      const filtered = (arr) =>
        arr.filter((x) => x.user_id !== user_id && x.post_id !== post_id);
      setReactions((curr) => ({
        likes: curr.likes,
        special_likes: curr.special_likes,
        saves: filtered(curr.saves),
      }));
    } else {
      setReactions((curr) => ({
        likes: curr.likes,
        special_likes: curr.special_likes,
        saves: [...curr.saves, { post_id, user_id }],
      }));
    }
  };

  useEffect(() => {
    if (
      reactions &&
      reactions.hasOwnProperty('saves') &&
      Array.isArray(reactions.saves)
    ) {
      const saves = reactions.saves.some(
        (save) => save.post_id === post_id && save.user_id === user_id
      );
      setSaveBtnText(saves ? 'Saved' : 'Save');
    }
  }, [reactions]);
  return (
    <article className="post-card">
      {image_url && (
        <img src={image_url} width="100%" className="rounded-top" />
      )}
      <div className="post-card-container">
        <div className="post-card-head d-flex align-items-center mb-3">
          <div className="post-card-pfp">{avatar && pfp}</div>
          <div className="name_date">
            <h5 className="text-sm">
              {first_name && last_name
                ? first_name + '   ' + last_name
                : 'No Name'}
            </h5>

            <p className="text-sm text-dark">{formatAsMonthDay(created_at)}</p>
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
            <Link
              to={`/post/${post_id}`}
              className="me-md-5 me-1 text-dark post-like"
            >
              <i className="fa-light fa-heart text-dark"></i> {likes} Likes
            </Link>
            <Link to={`/post/${post_id}`} className="text-dark post-comment">
              <i className="fa-light fa-comment"></i> Add Comment
            </Link>
            <button
              className=" ms-auto btn btn-secondary"
              onClick={handleSave}
              disabled={user_id === 'undefined'}
            >
              {saveBtnText}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
