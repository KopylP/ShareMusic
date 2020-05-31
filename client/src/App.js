import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MusicianRoomPage from "./pages/musician-room-page";
import ListenRoomPage from "./pages/listen-room-page";
import HomePage from "./pages/home-page/";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Router>
        <Route exact path="/" component={HomePage}/>
        <Route path="/musician" component={MusicianRoomPage} />
        <Route path="/listen" component={ListenRoomPage}/>
      </Router>
      {/* <Room/> */}
    </div>
  );
}

export default App;
