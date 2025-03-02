import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const handleWindow = (e) => {
    e.preventDefault();
    window.open(
      "/awarder/app",
      "my popup",
      "width=400,height=320,position=absolute,top=400,left=1500"
    );
  };
  return (
    <div>
      <main>
        <h1>Awarder App</h1>
        <p>Click launch to start in a popup window.</p>
        <button onClick={handleWindow}>Launch</button>
        <Link to="/app">Go to App</Link>
      </main>
    </div>
  );
};

export default Home;
