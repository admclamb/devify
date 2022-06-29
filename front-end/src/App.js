import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import PageRoutes from './pages/Routes';
import { UserContext } from './utils/UserContext';
import { readUserReactions, readNotifications } from './utils/api';
import BetaBanner from './components/banner/BetaBanner';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [session, setSession] = useState({});
  //Search term used for navbar and search page
  const [search, setSearch] = useState('');
  //State for users reactions to a post
  const [reactions, setReactions] = useState({
    likes: [],
    specialLikes: [],
    saves: [],
  });
  const [notifications, setNotifications] = useState([]);
  const [saveChange, setSaveChange] = useState(0);
  const [likeChange, setLikeChange] = useState(0);
  const [specialLikeChange, setSpecialLikeChange] = useState(0);
  const [error, setError] = useState(null);
  const { user_id } = session;
  useEffect(() => {
    const abortController = new AbortController();

    const getReactions = async () => {
      setError(null);
      try {
        const response = await readUserReactions(
          user_id,
          abortController.signal
        );
        setReactions(response);
      } catch (error) {
        setError(error);
      }
    };
    const getNotifications = async () => {
      setError(null);
      try {
        console.log('in here', user_id);
        const response = await readNotifications(
          user_id,
          abortController.signal
        );
        console.log(response);
        setNotifications(response);
      } catch (error) {
        setError(error);
      }
    };
    getReactions();
    getNotifications();
    return () => abortController.abort();
  }, [user_id]);
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
          <BetaBanner />
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            session={session}
            logoutUser={logoutUser}
            search={search}
            setSearch={setSearch}
            notifications={notifications}
          />
        </header>
        <PageRoutes
          setSession={setSession}
          session={session}
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          reactions={reactions}
          setReactions={setReactions}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      </UserContext.Provider>
    </>
  );
}

export default App;
