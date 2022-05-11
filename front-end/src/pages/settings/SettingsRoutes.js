import { Route, Routes, useMatch } from 'react-router-dom';
import SettingsAccount from './SettingsAccount';
import SettingsCustomization from './SettingsCustomization';
import SettingsNotifications from './SettingsNotifications';
import SettingsProfile from './SettingsProfile';
const SettingsRoutes = () => {
  const match = useMatch();
  return <Routes></Routes>;
};

export default SettingsRoutes;
