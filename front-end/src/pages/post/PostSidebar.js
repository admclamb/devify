import "./PostSidebar.css";

const PostSidebar = () => {
  return (
    <ul className="post-sidebar">
      <li className="text-center">
        <i className="fa-duotone fa-book-bookmark fa-2x mb-1"></i>
        <p>0</p>
      </li>
      <li className="text-center">
        <i className="fa-solid fa-narwhal fa-2x mb-1"></i>
        <p>2</p>
      </li>
      <li className="text-center">
        <i className="fa-solid fa-heart fa-2x mb-1"></i>
        <p>8</p>
      </li>
    </ul>
  );
};

export default PostSidebar;
