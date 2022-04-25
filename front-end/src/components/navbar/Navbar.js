import Searchbar from '../Searchbar/Searchbar';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = ({ darkMode, setDarkMode, user_id }) => {
  const signedInNavbar = (
    <div className="navbar__profile-container">
      <Link to={`${user_id}/create`} className="btn btn-outline-primary">
        Create Post
      </Link>
      <i className="fa-thin fa-bell fa-lg"></i>
      <div className="profile-picture"></div>
      <button
        className="color-mode-toggle rounded bg-dark btn text-light"
        onClick={() => setDarkMode((currMode) => !currMode)}
      >
        <i className={'fa-solid fa-' + (darkMode ? 'sun-bright' : 'moon')} />
      </button>
    </div>
  );
  const notSignedInNavbar = (
    <div className="navbar__profile-container">
      <Link to="/login" className="me-3 btn">
        Log in
      </Link>
      <Link to="/signup" className="btn btn-outline-primary">
        Create account
      </Link>
    </div>
  );
  return (
    <nav className="navbar">
      <div className="container-lg ">
        <Link to="/" className="navbar__logo">
          <h1 className="navbar__logo text-size-p">Devify</h1>
        </Link>
        <Searchbar />
        {user_id ? signedInNavbar : notSignedInNavbar}
      </div>
    </nav>
  );
};

export default Navbar;
