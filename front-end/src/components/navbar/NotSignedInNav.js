import { Link } from 'react-router-dom';

const NotSignedInNav = () => {
  return (
    <div className="navbar__profile-container">
      <Link to="/login" className="me-3 btn login">
        Log in
      </Link>
      <Link to="/signup" className="btn btn-outline-primary">
        Create account
      </Link>
    </div>
  );
};

export default NotSignedInNav;
