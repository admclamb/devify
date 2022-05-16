import { useEffect, useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { Link } from 'react-router-dom';
import './Navbar.css';
import OutsideAlerter from '../../hooks/OutsideAlerter';
const Navbar = ({ darkMode, setDarkMode, session, logoutUser }) => {
  const { user_id = '', username = '' } = session;
  const [openModal, setOpenModal] = useState(false);
  const modal = (
    <OutsideAlerter setState={setOpenModal}>
      <section className="navbar__modal rounded border">
        <Link to={`profile/${username}`} className="navbar__modal-profile">
          {username ? `@${username}` : 'Profile'}
        </Link>
        <hr />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`${user_id}/create`}>Create Post</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
        <hr />
        <Link to="/" className="navbar__modal-profile" onClick={logoutUser}>
          Logout
        </Link>
      </section>
    </OutsideAlerter>
  );
  const signedInNavbar = (
    <div className="navbar__profile-container">
      <Link to={`${user_id}/create`} className="btn btn-outline-primary">
        Create Post
      </Link>
      <i className="fa-thin fa-bell fa-lg"></i>
      <div
        className="profile-picture"
        id="modal-toggle-btn"
        onClick={() => setOpenModal((prev) => !prev)}
      ></div>
      {openModal ? modal : ''}
    </div>
  );
  const notSignedInNavbar = (
    <div className="navbar__profile-container">
      <Link to="/login" className="me-3 btn login">
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
        <button
          className="color-mode-toggle rounded bg-dark btn text-light ms-3 d-none"
          onClick={() => setDarkMode((currMode) => !currMode)}
        >
          <i className={'fa-solid fa-' + (darkMode ? 'sun-bright' : 'moon')} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
