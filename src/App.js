import logo from "./logo.svg";
import "./App.css";
import React, { useState, useMemo, useEffect } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  // const doubleNumber = slowFunction(number);
  //solution to avoid re-rendering
  const doubleNumber = useMemo(() => slowFunction(number), [number]);

  // const themeStyles = {
  //   backgroundColor: dark ? "black" : "white",
  //   color: dark ? "white" : "black",
  // };
  //solution to avoid re-rendering
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  useEffect(() => {
    console.log("Theme changed");
  }, [themeStyles]);
  return (
    <>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Change Theme
      </button>
      <div style={themeStyles}>{doubleNumber}</div>
    </>
  );
}

export default App;

function slowFunction(num) {
  console.log("Calling slow function");
  for (let i = 0; i <= 100000000; i++) {}
  return num * 2;
}
