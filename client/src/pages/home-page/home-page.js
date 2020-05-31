import React, { Component } from "react";
import "./home-page.css";
import VideoBackground from "./video-background/video-background";
import { CSSTransition } from "react-transition-group";
import RoomService from "../../services/room-service";

export default class HomePage extends Component {
  roomService = new RoomService();

  state = {
    enterName: false,
    error: false,
    roomName: "",
  };

  onRoomCreated = (room) => {
    console.log(room);
    this.props.history.push({
      pathname: '/musician',
      search: `?owner=${room.ownerGuid}`,
    })
  };

  onRoomCreatedError = (error) => {
    if (error.response && error.response.status === 500) {
      this.setState({
        error: true,
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
      if(roomName === "") {
        this.setState({
          error: true
        });
        return;
      }
      this.roomService
        .createRoom(roomName)
        .then(this.onRoomCreated)
        .catch(this.onRoomCreatedError);
    }
  };

  onHandleChangeRoomName = (e) => {
    this.setState({
      roomName: e.target.value,
      error: false
    });
  };

  render() {
    const { enterName, error, roomName } = this.state;

    let errorClass = null;
    if (error && roomName === "") errorClass = "error-message-none";
    else if (error) errorClass = "error-message";

    return (
      <div className="home-page">
        <VideoBackground />
        <div className="options">
          <h1>Wanna play?</h1>
          <div className="options-buttons">
            <div className={`errorContainer ${errorClass}`}>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
