import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import PageRoutes from './pages/Routes';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [session, setSession] = useState({});
  useEffect(() => {
    document.documentElement.style.setProperty('--color-dark', '#fff');
  }, [darkMode]);

  return (
    <>
      <header>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user_id={session.user_id}
        />
      </header>
      <PageRoutes />
    </>
  );
}

export default App;
