import SidebarNav from '../sidebarNav/SidebarNav';
import { Link } from 'react-router-dom';
import './OffCanvasNav.css';
const OffCanvasNav = ({ user_id }) => {
  const signedInButtons = (
    <div className="post-buttons">
      <button className="btn btn-primary w-100">CreatePost</button>
    </div>
  );
  const notSignedInButtons = (
    <div className="post-buttons">
      <Link to="/login" className="btn btn-secondary w-50">
        Log in
      </Link>
      <Link to="/signup" className="btn btn-outline-primary w-50">
        Create account
      </Link>
    </div>
  );
  return (
    <div
      className="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
          Devify
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {user_id ? signedInButtons : ''}
        <form className="d-flex mb-4 mt-4">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
        <SidebarNav />
        <ul className="offcanvas-nav__other">
          <li>
            <Link to="/">
              <i class="fa-duotone fa-pen-paintbrush fa-lg"></i> Create Post
            </Link>
          </li>
          <li>
            <Link to="/">
              <i class="fa-duotone fa-gear fa-lg"></i> Settings
            </Link>
          </li>
          <li>
            <Link to="/">
              <i class="fa-duotone fa-right-from-bracket fa-lg"></i> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OffCanvasNav;
