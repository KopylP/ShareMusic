import React, { Component } from "react";
import RoomService from "../services/room-service";
import WithRoom from "./with-room";
function WithToken(Wrapper) {
  return class extends Component {
    roomService = new RoomService();

    state = {
      token: null,
      error: false,
      roomId: null
    };

    onToken = ({ token }) => {
      const { room } = this.props;
      this.setState({
        token,
        roomId: room.id
      });
    };

    onTokenError = () => {
      this.setState({
        error: true,
      });
      //TODO handle error
    };

    componentDidMount() {
      this.update();
    }

    update() {
      const { room, history, location } = this.props;
      const queryString = location.search;
      const urlParams = new URLSearchParams(queryString);
      const token = urlParams.get("token");
      const roomId = urlParams.get("roomId");

      if (token === null || roomId === null) {
        if (room === null) {
          history.push({
            pathname: "/",
          });
          return;
        }
        const ownerGuid = room.ownerGuid;
        if (typeof ownerGuid === "undefined") {
          //TODO redirect to invalid token page
        } else {
          this.roomService
            .getPlayerToken(room.id, ownerGuid)
            .then(this.onToken)
            .catch(this.onTokenError);
        }
      } else {
        this.setState({
          token,
          roomId
        });
      }
    }

    render() {
      const { token, roomId } = this.state;
      return token == null ? (
        <div>loading</div>
      ) : (
        <Wrapper {...this.props} token={token} roomId={roomId} />
      );
    }
  };
}

export default WithToken;
