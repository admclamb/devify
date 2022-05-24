import { Link } from 'react-router-dom';
import './NotSignedInNav.css';
const NotSignedInNav = () => {
  return (
    <div className="d-none d-md-block navbar__profile-container not-signed-in-nav ms-auto">
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
