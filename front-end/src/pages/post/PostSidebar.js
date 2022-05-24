import { useEffect, useState, useContext } from 'react';
import {
  readPostReaction,
  handleReaction,
  getPostReactionTotal,
} from '../../utils/api';
import { UserContext } from '../../utils/UserContext';
import './PostSidebar.css';

const PostSidebar = ({ post, setError, reactions, setReactions }) => {
  const session = useContext(UserContext);
  const { user_id } = session;
  const { post_id } = post;
  const [likes, setLikes] = useState(0);
  const [special_likes, setSpecial_likes] = useState(0);
  const [saves, setSaves] = useState(0);
  const [liked, setLiked] = useState(false);
  const [special_liked, setSpecial_liked] = useState(false);
  const [saved, setSaved] = useState(false);
  const filtered = (arr) =>
    arr.filter((x) => x.user_id === user_id && x.post_id === post_id);
  useEffect(() => {
    setLikes(post.likes);
    setSpecial_likes(post.special_likes);
    setSaves(post.saves);
  }, [post]);
  useEffect(() => {
    if (reactions) {
      if (reactions.hasOwnProperty('likes') && Array.isArray(reactions.likes)) {
        setLiked(filtered(reactions.likes));
      }
      if (
        reactions.hasOwnProperty('special_likes') &&
        Array.isArray(reactions.special_likes)
      ) {
        setSpecial_liked(filtered(reactions.special_likes));
      }
      if (reactions.hasOwnProperty('saves') && Array.isArray(reactions.saves)) {
        setSaved(filtered(reactions.saves));
      }
    }
  }, [reactions]);
  const handleLike = () => {
    const abortController = new AbortController();
    setLiked((curr) => !curr);
    const method = liked ? 'DELETE' : 'POST';
    handleReaction(post_id, user_id, abortController.signal, 'like', method);
    if (liked) {
      setReactions((curr) => ({
        likes: filtered(curr.likes),
        special_likes: curr.special_likes,
        saves: curr.saves,
      }));
    } else {
      setReactions((curr) => ({
        likes: [...curr.likes, { post_id, user_id }],
        special_likes: curr.special_likes,
        saves: curr.saves,
      }));
    }
    setLikes((curr) => (liked ? curr - 1 : curr + 1));
  };
  const handleSpecial_like = () => {
    const abortController = new AbortController();
    setSpecial_liked((curr) => !curr);
    const method = special_liked ? 'DELETE' : 'POST';
    handleReaction(
      post_id,
      user_id,
      abortController.signal,
      'special_like',
      method
    );
    if (special_liked) {
      setReactions((curr) => ({
        likes: curr.likes,
        special_likes: filtered(curr.special_likes),
        saves: curr.saves,
      }));
    } else {
      setReactions((curr) => ({
        likes: curr.likes,
        special_likes: [...curr.special_likes, { post_id, user_id }],
        saves: curr.saves,
      }));
    }
    setSpecial_likes((curr) => (special_liked ? curr - 1 : curr + 1));
  };
  const handleSave = () => {
    const abortController = new AbortController();
    setSaved((curr) => !curr);
    const method = saved ? 'DELETE' : 'POST';
    handleReaction(post_id, user_id, abortController.signal, 'save', method);
    if (saved) {
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
    setSaves((curr) => (saved ? curr - 1 : curr + 1));
  };

  const likeButton = (
    <button
      className={`sidebar-btn sidebar-heart btn ${liked ? 'text-like' : ''}`}
    >
      <i
        className="fa-solid fa-heart fa-lg mb-1"
        id="like"
        onClick={handleLike}
      ></i>
    </button>
  );
  const special_likeButton = (
    <button
      className={`sidebar-btn btn ${special_liked ? 'text-special_like' : ''}`}
    >
      <i
        className="fa-solid fa-narwhal fa-lg mb-1"
        id="special_like"
        onClick={handleSpecial_like}
      ></i>
    </button>
  );
  const saveButton = (
    <button
      className={`sidebar-btn  sidebar-save btn ${saved ? 'text-save' : ''}`}
    >
      <i
        className="fa-duotone fa-book-bookmark fa-lg mb-1"
        id="save"
        onClick={handleSave}
      ></i>
    </button>
  );

  return (
    <ul className="post-sidebar">
      <li className="post-sidebar__li">
        {likeButton}
        <p value="likes">{likes}</p>
      </li>
      <li className="post-sidebar__li">
        {special_likeButton}
        <p value="special_likes">{special_likes}</p>
      </li>
      <li className="post-sidebar__li">
        {saveButton}
        <p value="saves">{saves}</p>
      </li>
    </ul>
  );
};

export default PostSidebar;
