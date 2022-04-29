import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import PageRoutes from './pages/Routes';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [session, setSession] = useState({});
  useEffect(() => {
    let colorLight = {
      dark: '#000',
      light: '#fff',
      lightDarker: '#f5f5f5',
      gray: '#dbdbdb',
    };
    let colorDark = {
      dark: '#fff',
      light: '#333',
      lightDarker: '#222',
      gray: '#dbdbdb',
    };
    let color = darkMode ? colorDark : colorLight;
    document.documentElement.style.setProperty('--color-dark', color.dark);
    document.documentElement.style.setProperty('--color-light', color.light);
    document.documentElement.style.setProperty(
      '--color-light-darker',
      color.lightDarker
    );
  }, [darkMode]);
  console.log(session);
  return (
    <>
      <header>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user_id={session.user_id}
        />
      </header>
      <PageRoutes setSession={setSession} />
    </>
  );
}

export default App;
