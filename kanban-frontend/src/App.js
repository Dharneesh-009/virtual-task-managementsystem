import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './themes.css';
import TaskBoard from "./TaskBoard";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <TaskBoard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
}

export default App;


