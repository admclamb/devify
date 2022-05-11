import { Link } from 'react-router-dom';

const ProfileStats = ({ user_id }) => {
  const posts = 0;
  const comments = 0;
  const saves = 0;
  return (
    <section className="profile-stats col-12 col-md-3 p-3 mt-3 border rounded">
      <Link to="/" className="mb-3">
        <i className="fa-thin fa-memo fa-2x me-3"></i>
        {posts} Post Published
      </Link>
      <Link to="/" className="mb-3">
        <i className="fa-thin fa-comment fa-2x me-3"></i>
        {comments} Comments
      </Link>
      <Link to="/">
        <i className="fa-thin fa-bookmark fa-2x me-3"></i>
        {saves} Posts Saved
      </Link>
    </section>
  );
};

export default ProfileStats;
