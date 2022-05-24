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
  useEffect(() => {
    setLikes(post.likes);
    setSaves(post.saves);
    setSpecial_likes(post.special_likes);
  }, [post]);
  console.log(post);
  console.log(reactions);
  useEffect(() => {
    if (reactions) {
      const filtered = (arr) => {
        return (
          (Array.isArray(arr) && arr.some((x) => x.post_id === post_id)) ||
          false
        );
      };
      setLiked(filtered(reactions.likes));
      setSpecial_liked(filtered(reactions.special_likes));
      setSaved(filtered(reactions.saves));
    }
  }, [reactions]);

  const handleLike = () => {
    const abortController = new AbortController();
    const method = liked ? 'DELETE' : 'POST';
    handleReaction(post_id, user_id, abortController.signal, 'like', method);
    const filterOut = (arr) => arr.filter((x) => x.post_id !== post_id);
    setLikes((curr) => (liked ? curr - 1 : curr + 1));
    if (liked) {
      setReactions((curr) => ({
        likes: filterOut(curr.likes),
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
  };
  const handleSpecial_like = () => {
    const abortController = new AbortController();
    const method = special_liked ? 'DELETE' : 'POST';
    handleReaction(
      post_id,
      user_id,
      abortController.signal,
      'special_like',
      method
    );
    const filterOut = (arr) => arr.filter((x) => x.post_id !== post_id);
    setSpecial_likes((curr) => (special_liked ? curr - 1 : curr + 1));
    if (special_liked) {
      setReactions((curr) => ({
        likes: curr.likes,
        special_likes: filterOut(curr.special_likes),
        saves: curr.saves,
      }));
    } else {
      setReactions((curr) => ({
        likes: curr.likes,
        special_likes: [...curr.special_likes, { post_id, user_id }],
        saves: curr.saves,
      }));
    }
  };
  const handleSave = () => {
    const abortController = new AbortController();
    const method = saved ? 'DELETE' : 'POST';
    handleReaction(post_id, user_id, abortController.signal, 'save', method);
    const filterOut = (arr) => arr.filter((x) => x.post_id !== post_id);
    setSaves((curr) => (saved ? curr - 1 : curr + 1));
    if (saved) {
      setReactions((curr) => ({
        likes: curr.likes,
        special_likes: curr.special_likes,
        saves: filterOut(curr.saves),
      }));
    } else {
      setReactions((curr) => ({
        likes: curr.likes,
        special_likes: curr.special_likes,
        saves: [...curr.saves, { post_id, user_id }],
      }));
    }
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
