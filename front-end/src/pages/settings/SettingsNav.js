import { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import './SettingsNav.css';
const SettingsNav = () => {
  const [currPath, setCurrPath] = useState('profile');
  const onClick = ({ target }) => {
    const { id } = target;
    setCurrPath(id);
    console.log(id);
  };
  return (
    <aside className="col-2 settings-nav__container">
      <nav>
        <ul className="settings-nav">
          <li
            className={`settings-nav__li ${
              currPath === 'profile' ? 'settings-nav__active' : ''
            }`}
          >
            <Link
              to="profile"
              className="settings-nav__li-a"
              onClick={onClick}
              id="profile"
            >
              Profile
            </Link>
          </li>
          <li
            className={`settings-nav__li ${
              currPath === 'customization' ? 'settings-nav__active' : ''
            }`}
          >
            <Link
              to="customization"
              className="settings-nav__li-a"
              onClick={onClick}
              id="customization"
            >
              Customization
            </Link>
          </li>
          <li
            className={`settings-nav__li ${
              currPath === 'notification' ? 'settings-nav__active' : ''
            }`}
          >
            <Link
              to="notification"
              className="settings-nav__li-a"
              onClick={onClick}
              id="notification"
            >
              Notification
            </Link>
          </li>
          <li
            className={`settings-nav__li ${
              currPath === 'account' ? 'settings-nav__active' : ''
            }`}
          >
            <Link
              to="account"
              className="settings-nav__li-a"
              onClick={onClick}
              id="account"
            >
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SettingsNav;
