import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';

import SettingsNav from './SettingsNav';
import './Settings.css';
const Settings = ({ session, setSession }) => {
  const { username } = session;
  return (
    <div className="container">
      <h2>Settings for @{username} </h2>
      <div className="row">
        <SettingsNav />
        <section className="col-12 col-md-8">
          <Outlet session={session} setSession={setSession} />
        </section>
      </div>
    </div>
  );
};

export default Settings;
