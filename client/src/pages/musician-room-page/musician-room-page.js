import React, { Component } from "react";
import WithToken from "../../hoc-helpers/with-token";
import WithRoom from "../../hoc-helpers/with-room";
import WithName from "../../hoc-helpers/with-name";
import ConcertHubService from "../../services/concert-hub-service";

class MusicianRoomPage extends Component {
  concertHubService = new ConcertHubService();

  state = {};

  onError = (err) => {
    console.log(err);
  };

  onJoin = (participant) => {
    console.log(participant);
  };

  onLeave = (participant) => {
    console.log(participant);
  };

  componentDidMount() {
    const { name, token, roomId } = this.props;
    this.joinRoom({
      name: name,
      token: "" + token,
      roomId: parseInt(roomId),
      participantType: "Player",
    });
  }

  componentWillUnmount() {
    this.concertHubService.stop();
  }

  joinRoom(enterRoomModel) {
    console.log(enterRoomModel);
    this.concertHubService.onError(this.onError);
    this.concertHubService.onJoin(this.onJoin);
    this.concertHubService.onLeave(this.onLeave);
    this.concertHubService
      .start()
      .then(() => {
        setTimeout(() => {
          this.concertHubService.enterRoom(enterRoomModel);
        }, 100);
      })
      .catch((err) => {
        //TODO handle error
      });
  }

  render() {
    return <div>Musician Room Page</div>;
  }
}

export default WithRoom(WithToken(WithName(MusicianRoomPage)));
