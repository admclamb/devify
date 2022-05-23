import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import PageRoutes from './pages/Routes';
import { UserContext } from './utils/UserContext';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [session, setSession] = useState({});
  //Search term used for navbar and search page
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (session.hasOwnProperty('user_id')) {
      localStorage.setItem('session', JSON.stringify(session));
    }
  }, [session]);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setSession(JSON.parse(session));
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('session');
    setSession({});
  };
  // Light and dark mode
  useEffect(() => {
    let colorLight = {
      dark: '#000',
      light: '#fff',
      lightDarker: '#f5f5f5',
      gray: '#dbdbdb',
      borderColor: '#dee2e6',
    };
    let colorDark = {
      dark: '#fff',
      light: '#333',
      lightDarker: '#222',
      gray: '#dbdbdb',
      borderColor: '#111',
    };
    let color = darkMode ? colorDark : colorLight;
    document.documentElement.style.setProperty('--color-dark', color.dark);
    document.documentElement.style.setProperty('--color-light', color.light);
    document.documentElement.style.setProperty(
      '--color-border',
      color.borderColor
    );
    document.documentElement.style.setProperty(
      '--color-light-darker',
      color.lightDarker
    );
  }, [darkMode]);
  return (
    <>
      <UserContext.Provider value={session}>
        <header>
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            session={session}
            logoutUser={logoutUser}
            search={search}
            setSearch={setSearch}
          />
        </header>
        <PageRoutes
          setSession={setSession}
          session={session}
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </UserContext.Provider>
    </>
  );
}

export default App;
