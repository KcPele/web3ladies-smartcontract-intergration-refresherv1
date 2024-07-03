import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
function App() {
  const [resourcesType, setResourcesType] = useState("posts");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourcesType}`)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, [resourcesType]);
  return (
    <div>
      <button onClick={() => setResourcesType("posts")}>Posts</button>
      <button onClick={() => setResourcesType("users")}>Users</button>
      <button onClick={() => setResourcesType("comments")}>Comments</button>

      <h1>{resourcesType}</h1>
      <h2>{windowWidth}</h2>
    </div>
  );
}

export default App;
