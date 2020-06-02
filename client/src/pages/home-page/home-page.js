import React, { Component } from "react";
import "./home-page.css";
import VideoBackground from "./video-background/video-background";
import { CSSTransition } from "react-transition-group";
import RoomService from "../../services/room-service";
import WithRoom from "../../hoc-helpers/with-room";

class HomePage extends Component {
  roomService = new RoomService();

  state = {
    enterName: false,
    error: null,
    roomName: "",
  };

  onRoomCreated = (room) => {
    const { updateRoom } = this.props;
    updateRoom(room);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.room !== this.props.room && this.props.room !== null) {
      this.props.history.push({
        pathname: "/musician",
      });
    }
  }

  onRoomCreatedError = (error) => {
    if (error.response) {
      this.setState({
        error: error.response.data.message,
      });
    }
  };

  onCreateRoomClick = () => {
    const { enterName, roomName } = this.state;
    if (enterName === false) {
      this.setState({
        enterName: true,
      });
    } else {
      this.roomService
        .createRoom(roomName)
        .then(this.onRoomCreated)
        .catch(this.onRoomCreatedError);
    }
  };

  onHandleChangeRoomName = (e) => {
    this.setState({
      roomName: e.target.value,
    });
  };

  render() {
    const { enterName, error, room } = this.state;
    return (
      <div className="home-page">
        <VideoBackground />
        <div className="options">
          <h1>Wanna play?</h1>
          <div className="options-buttons">
            <div className={`enter-room-container`}>
              <CSSTransition
                timeout={300}
                classNames="input-animate"
                in={enterName}
              >
                <div className="input-container">
                  <input
                    type="text"
                    value={this.state.roomName}
                    className="form-control"
                    placeholder="Name of room"
                    onChange={this.onHandleChangeRoomName}
                  />
                </div>
              </CSSTransition>

              <button
                onClick={this.onCreateRoomClick}
                className="btn btn btn-outline-light"
              >
                Create room
              </button>
              <div className="error-message">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WithRoom(HomePage);