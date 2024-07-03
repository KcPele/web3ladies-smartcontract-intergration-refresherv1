import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
function App() {
  const [name, setName] = useState("");
  const renderCount = React.useRef(0);
  const inpurRef = React.useRef();
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>{name}</p>
      <p>Render count: {renderCount.current}</p>
    </div>
  );
}

export default App;
