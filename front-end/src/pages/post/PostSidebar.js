import { useEffect, useState, useContext } from 'react';
import {
  readPostReaction,
  handleReaction,
  getPostReactionTotal,
} from '../../utils/api';
import { UserContext } from '../../utils/UserContext';
import './PostSidebar.css';

const PostSidebar = ({ post, setError }) => {
  const session = useContext(UserContext);
  const { user_id } = session;
  const { post_id } = post;
  const initReaction = {
    like: null,
    save: null,
    special_like: null,
  };
  const [userReactions, setUserReactions] = useState(initReaction);
  const [likes, setLikes] = useState(0);
  const [special_likes, setSpecial_likes] = useState(0);
  const [saves, setSaves] = useState(0);
  useEffect(() => {
    if (!post_id) return;
    const abortController = new AbortController();
    readPostReaction(user_id, post_id, abortController.signal)
      .then(setUserReactions)
      .catch(setError);
    return () => abortController.abort();
  }, [post_id]);
  useEffect(() => {
    setLikes(post.likes);
    setSpecial_likes(post.special_likes);
    setSaves(post.saves);
  }, [post]);
  const handleClick = async ({ target }) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setError(null);
    try {
      const { id } = target;
      if (userReactions[id]) {
        await handleReaction(post_id, user_id, signal, id, 'DELETE');
        setUserReactions({
          ...userReactions,
          [id]: null,
        });
      } else {
        const reaction = await handleReaction(
          post_id,
          user_id,
          signal,
          id,
          'POST'
        );
        setUserReactions({
          ...userReactions,
          [id]: reaction,
        });
      }
      const total = await getPostReactionTotal(post_id, signal);
      setLikes(total[0].likes);
      setSpecial_likes(total[0].special_likes);
      setSaves(total[0].saves);
    } catch (error) {
      setError(error);
    }
  };
  const likeButton = (
    <button className={`btn ${userReactions.like ? 'text-like' : ''}`}>
      <i
        className="fa-solid fa-heart fa-2x mb-1"
        id="like"
        onClick={handleClick}
      ></i>
    </button>
  );
  const special_likeButton = (
    <button
      className={`btn ${userReactions.special_like ? 'text-special_like' : ''}`}
    >
      <i
        className="fa-solid fa-narwhal fa-2x mb-1"
        id="special_like"
        onClick={handleClick}
      ></i>
    </button>
  );
  const saveButton = (
    <button className={`btn ${userReactions.save ? 'text-save' : ''}`}>
      <i
        className="fa-duotone fa-book-bookmark fa-2x mb-1"
        id="save"
        onClick={handleClick}
      ></i>
    </button>
  );
  console.log(userReactions);
  return (
    <ul className="post-sidebar">
      <li className="text-center">
        {likeButton}
        <p value="likes">{likes}</p>
      </li>
      <li className="text-center">
        {special_likeButton}
        <p value="special_likes">{special_likes}</p>
      </li>
      <li className="text-center">
        {saveButton}
        <p value="saves">{saves}</p>
      </li>
    </ul>
  );
};

export default PostSidebar;
