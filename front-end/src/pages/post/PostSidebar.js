import { useEffect, useState, useContext } from 'react';
import {
  getPostReactionTotal,
  handleLike,
  handleSave,
  handleSpecialLike,
  readPostReaction,
} from '../../utils/api';
import { UserContext } from '../../utils/UserContext';
import './PostSidebar.css';

const PostSidebar = ({ post, setError }) => {
  const session = useContext(UserContext);
  const { user_id } = session;
  const [userReactions, setUserReactions] = useState({
    like: '',
    save: '',
    special_likes: '',
  });
  let { likes = 0, special_likes = 0, saves = 0 } = post;
  useEffect(() => {
    const abortController = new AbortController();
    readPostReaction(user_id, post.post_id, abortController.signal)
      .then(setUserReactions)
      .catch(setError);
    return () => abortController.abort();
  }, [post]);

  const handleClick = async ({ target }) => {
    console.log('Here');
    const abortController = new AbortController();
    const signal = abortController.signal;
    const { id } = target;
    const { post_id } = post;
    let { like, special_like, save } = userReactions;
    console.log(post_id, user_id);
    if (id === 'like') {
      like = await handleLike(
        post_id,
        user_id,
        signal,
        userReactions.like ? 'DELETE' : 'POST'
      );
    } else if (id === 'special_like') {
      special_like = await handleSpecialLike(
        post_id,
        user_id,
        signal,
        userReactions.special_likes ? 'DELETE' : 'POST'
      );
    } else if (id === 'save') {
      save = await handleSave(
        post_id,
        user_id,
        signal,
        userReactions.save ? 'DELETE' : 'POST'
      );
    }
    setUserReactions({
      like,
      special_like,
      save,
    });
    const response = await getPostReactionTotal(post_id, signal);
    likes = response.likes;
    special_likes = response.special_likes;
    saves = response.saves;
    console.log(target, id, user_id);
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
