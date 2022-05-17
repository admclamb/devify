import { useEffect, useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { Link } from 'react-router-dom';
import './Navbar.css';
import OutsideAlerter from '../../hooks/OutsideAlerter';
import OffCanvasNav from './OffCanvasNav';
import OffCanvasNavButton from './OffCanvasNavButton';
import SignedInNav from './SignedInNav';
import NotSignedInNav from './NotSignedInNav';
const Navbar = ({
  darkMode,
  setDarkMode,
  session,
  logoutUser,
  search,
  setSearch,
}) => {
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
            <Link to="/" onClick={() => setOpenModal((p) => !p)}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to={`${user_id}/create`}
              onClick={() => setOpenModal((p) => !p)}
            >
              Create Post
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setOpenModal((p) => !p)}>
              Settings
            </Link>
          </li>
        </ul>
        <hr />
        <Link to="/" className="navbar__modal-profile" onClick={logoutUser}>
          Logout
        </Link>
      </section>
    </OutsideAlerter>
  );

  return (
    <nav className="navbar ps-4 ps-sm-0 pe-sm-0 pe-4">
      <div className="container">
        <div className="d-block d-md-none">
          <OffCanvasNavButton />
          <OffCanvasNav
            user_id={user_id}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <Link to="/" className="navbar__logo">
          <h1 className="navbar__logo text-size-p">Devify</h1>
        </Link>
        <Searchbar setSearch={setSearch} search={search} />
        {user_id ? (
          <SignedInNav
            openModal={openModal}
            setOpenModal={setOpenModal}
            modal={modal}
            user_id={user_id}
          />
        ) : (
          <NotSignedInNav />
        )}
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
