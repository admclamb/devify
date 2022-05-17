import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import CreatePost from './post/CreatePost';
import Post from './post/Post';
import Login from './login/Login';
import Signup from './signup/Signup';
import About from './about/About';
import Profile from './profile/Profile';
import ProfileSetup from './signup/ProfileSetup';
import Settings from './settings/Settings';
import NoMatch from '../errors/NoMatch';
import SettingsProfile from './settings/SettingsProfile';
import SettingsCustomization from './settings/SettingsCustomization';
import SettingsNotifications from './settings/SettingsNotifications';
import SettingsAccount from './settings/SettingsAccount';
import Search from './search/Search';
const PageRoutes = ({
  setSession,
  session,
  darkMode,
  setDarkMode,
  search,
  setSearch,
}) => {
  return (
    <Routes>
      <Route index exact={true} path="/" element={<Home />} />
      <Route exact={true} path="/settings" element={<Settings />}>
        <Route index element={<SettingsProfile />} />
        <Route path="profile" element={<SettingsProfile />} />
        <Route
          path="customization"
          element={
            <SettingsCustomization
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        <Route path="notification" element={<SettingsNotifications />} />
        <Route path="account" element={<SettingsAccount />} />
      </Route>
      <Route exact={true} path="/post/:post_id" element={<Post />} />
      <Route exact={true} path="/profile/:username" element={<Profile />} />
      <Route exact={true} path="/:user_id/create" element={<CreatePost />} />
      <Route
        exact={true}
        path="/login"
        element={<Login setSession={setSession} />}
      />
      <Route
        exact={true}
        path="/signup"
        element={<Signup setSession={setSession} session={session} />}
      />
      <Route exact={true} path="/profileCreation" element={<ProfileSetup />} />
      <Route exact={true} path="/about" element={<About />} />
      <Route
        exact={true}
        path="/search"
        element={<Search search={search} setSearch={setSearch} />}
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
export default PageRoutes;
