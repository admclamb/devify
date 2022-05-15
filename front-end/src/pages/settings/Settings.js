import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';

import SettingsNav from './SettingsNav';
import './Settings.css';
const Settings = () => {
  const session = useContext(UserContext);
  const username = '1111';
  return (
    <div className="container-lg">
      <h2>Settings for @{username} </h2>
      <div className="row">
        <SettingsNav />
        <section className="col-8">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Settings;
