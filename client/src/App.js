import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MusicianRoomPage from "./pages/musician-room-page/musician-room-page";
import ListenRoomPage from "./pages/listen-room-page";
import HomePage from "./pages/home-page/";
import { Provider } from "./context/room-context";

class App extends Component {
  state = {
    room: this._getPersistenceRoom(),
  };

  _keyRoom = "room";

  _getPersistenceRoom() {
    const room = localStorage.getItem(this._keyRoom);
    return room !== null ? JSON.parse(room) : null;
  }

  _setPersistenceRoom(room) {
    localStorage.setItem(this._keyRoom, JSON.stringify(room));
  }

  updateRoom = (room) => {
    if (this.state.room !== room) {
      this.setState({
        room,
      });
      this._setPersistenceRoom(room);
    }
  };

  render() {
    const value = {
      room: this.state.room,
      updateRoom: this.updateRoom,
    };

    return (
      <Provider value={value}>
        <div className="App">
          {/* <Header /> */}
          <Router>
            <Route exact path="/" component={HomePage} />
            <Route path="/musician" component={MusicianRoomPage} />
            <Route path="/listen" component={ListenRoomPage} />
          </Router>
          {/* <Room/> */}
        </div>
      </Provider>
    );
  }
}

export default App;
