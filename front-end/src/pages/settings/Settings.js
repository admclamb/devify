import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';

import SettingsNav from './SettingsNav';

const Settings = () => {
  const session = useContext(UserContext);
  const username = '1111';
  return (
    <div className="container-lg">
      <h2>Settings for @{username} </h2>
      <div className="row">
        <SettingsNav />
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Settings;
