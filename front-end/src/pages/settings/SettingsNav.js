import { Link } from 'react-router-dom';
import './SettingsNav.css';
const SettingsNav = () => {
  return (
    <aside className="col-2 settings-nav__container">
      <nav>
        <ul className="settings-nav">
          <li className="settings-nav__li settings-nav__active">
            <Link to="/settings/profile" className="settings-nav__li-a">
              Profile
            </Link>
          </li>
          <li className="settings-nav__li">
            <Link to="/settings/customization" className="settings-nav__li-a">
              Customization
            </Link>
          </li>
          <li className="settings-nav__li">
            <Link to="/settings/notification" className="settings-nav__li-a">
              Notification
            </Link>
          </li>
          <li className="settings-nav__li">
            <Link to="/settings/account" className="settings-nav__li-a">
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SettingsNav;
