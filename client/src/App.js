import React from "react";
import "./App.css";
import Header from "./components/header/header";
import Piano from "./components/piano/piano";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="center-container">
        <Piano />
      </div>
    </div>
  );
}

export default App;
