import SidebarNav from '../sidebarNav/SidebarNav';
import { Link } from 'react-router-dom';
import './OffCanvasNav.css';
const OffCanvasNav = ({ user_id, searchBar, setSearchBar, onSearchSubmit }) => {
  const signedInButtons = (
    <div className="post-buttons">
      <Link
        to={`${user_id}/create`}
        className="btn btn-primary w-100"
        data-bs-dismiss="offcanvas"
      >
        CreatePost
      </Link>
    </div>
  );
  const notSignedInButtons = (
    <div className="post-buttons">
      <Link
        to="/login"
        className="btn btn-secondary w-100 mb-2"
        data-bs-dismiss="offcanvas"
      >
        Log in
      </Link>
      <Link
        to="/signup"
        className="btn btn-outline-primary w-100"
        data-bs-dismiss="offcanvas"
      >
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
        {user_id ? signedInButtons : notSignedInButtons}
        <form className="d-flex mb-4 mt-4">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            value={searchBar}
            onChange={({ target }) => setSearchBar(target.value)}
          />
          <Link
            to="/search"
            className="btn btn-outline-primary"
            data-bs-dismiss="offcanvas"
            aria-label="Search"
            onClick={onSearchSubmit}
          >
            Search
          </Link>
        </form>
        <SidebarNav />
        <ul className="offcanvas-nav__other">
          <li>
            <Link to="/" data-bs-dismiss="offcanvas">
              <i className="fa-duotone fa-pen-paintbrush fa-lg"></i> Create Post
            </Link>
          </li>
          <li>
            <Link to="/" data-bs-dismiss="offcanvas">
              <i className="fa-duotone fa-gear fa-lg"></i> Settings
            </Link>
          </li>
          <li>
            <Link to="/" data-bs-dismiss="offcanvas">
              <i className="fa-duotone fa-right-from-bracket fa-lg"></i> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OffCanvasNav;
