import "./App.css";
import React from "react";
import FunctonContextComponent from "./FunctonContextComponent";
export const ThemeContext = React.createContext();
function App() {
  const [darkTheme, setDarkTheme] = React.useState(false);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }
  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <FunctonContextComponent />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
