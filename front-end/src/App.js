import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import PageRoutes from "./pages/Routes";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.documentElement.style.setProperty("--color-dark", "#fff");
  }, [darkMode]);
  return (
    <>
      <header>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <PageRoutes />
    </>
  );
}

export default App;
