import { Link } from 'react-router-dom';
import './SidebarNav.css';

const SidebarNav = () => {
  return (
    <ul className="sidebar-nav">
      <li>
        <Link to="/">
          <i className="fa-duotone fa-house fa-lg me-1"></i> Home
        </Link>
      </li>
      <li>
        <Link to="/about">
          <i className="fa-duotone fa-address-card  fa-lg me-1"></i> About
        </Link>
      </li>
      <li>
        <a href="https://github.com/admclamb/devify">
          <i className="fa-brands fa-github-alt fa-lg me-1"></i> Github
        </a>
      </li>
    </ul>
  );
};

export default SidebarNav;
