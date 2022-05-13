import { useContext } from 'react';

import { UserContext } from '../../utils/UserContext';

import SettingsNav from './SettingsNav';

import SettingsRoutes from './SettingsRoutes';

const Settings = () => {
  const session = useContext(UserContext);
  const username = '1111';
  return (
    <div className="container-lg">
      <h2>Settings for @{username} </h2>
      <div className="row">
        <SettingsNav />
        <section>
          <SettingsRoutes />
        </section>
      </div>
    </div>
  );
};

export default Settings;
