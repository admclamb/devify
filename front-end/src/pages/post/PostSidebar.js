import { useEffect, useState, useContext } from 'react';
import { readPostReaction } from '../../utils/api';
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
  useEffect(() => {
    const abortController = new AbortController();
    readPostReaction(user_id, post.post_id, abortController.signal)
      .then(setUserReactions)
      .catch(setError);
    return () => abortController.abort();
  }, [post]);
  let { likes = 0, special_likes = 0, bookmarks = 0 } = post;
  const handleClick = ({ target }) => {
    const { value } = target;
    console.log(value);
  };
  return (
    <ul className="post-sidebar">
      <li className="text-center">
        <button onClick={handleClick} className="btn">
          <i className="fa-duotone fa-book-bookmark fa-2x mb-1"></i>
          <p value="likes">{likes}</p>
        </button>
      </li>
      <li className="text-center">
        <button onClick={handleClick} className="btn">
          <i className="fa-solid fa-narwhal fa-2x mb-1"></i>
          <p value="special_likes">{special_likes}</p>
        </button>
      </li>
      <li className="text-center" onClick={handleClick} className="btn">
        <button onClick={handleClick}>
          <i className="fa-solid fa-heart fa-2x mb-1"></i>
          <p value="bookmarks">{bookmarks}</p>
        </button>
      </li>
    </ul>
  );
};

export default PostSidebar;
