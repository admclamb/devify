import "./PostSidebar.css";

const PostSidebar = ({ post }) => {
  let { likes = 0, special_likes = 0, bookmarks = 0 } = post;
  const handleClick = ({ target }) => {
    const { value } = target;
  };
  return (
    <ul className="post-sidebar">
      <li className="text-center">
        <i className="fa-duotone fa-book-bookmark fa-2x mb-1"></i>
        <p value="likes">{likes}</p>
      </li>
      <li className="text-center">
        <i className="fa-solid fa-narwhal fa-2x mb-1"></i>
        <p value="special_likes">{special_likes}</p>
      </li>
      <li className="text-center">
        <i className="fa-solid fa-heart fa-2x mb-1"></i>
        <p value="bookmarks">{bookmarks}</p>
      </li>
    </ul>
  );
};

export default PostSidebar;
