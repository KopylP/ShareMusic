import React, { Component } from "react";
import WithToken from "../../hoc-helpers/with-token";
import WithRoom from "../../hoc-helpers/with-room";
import WithName from "../../hoc-helpers/with-name";
import ConcertHubService from "../../services/concert-hub-service";
import Spinner from "../../spinner/spinner";
import Piano from "../../components/piano/piano";
import SynthService from "../../services/synth-service";

class MusicianRoomPage extends Component {
  concertHubService = new ConcertHubService();

  state = {
    loading: true,
    coMusiciansSynth: [],
    connectionId: null,
    roomName: null,
  };

  onError = (err) => {
    console.log(err);
  };

  onJoin = (participant) => {
    if (participant.connectionId === this.state.connectionId) {
      this.setState({
        loading: false,
        roomName: participant.roomName,
      });
    } else {
      this.setState((prevState) => {
        return {
          coMusiciansSynth: [
            ...prevState.coMusiciansSynth,
            {
              connectionId: participant.connectionId,
              synth: new SynthService(),
            },
          ],
        };
      });
    }
  };

  onLeave = (participant) => {
    this.setState((prevState) => {
      const { coMusiciansSynth } = prevState;
      const index = coMusiciansSynth.findIndex(
        (p) => p.connectionId === participant.connectionId
      );
      if (index !== -1) {
        return {
          ...coMusiciansSynth.slice(index - 1),
          ...coMusiciansSynth.slice(index + 1, coMusiciansSynth.length),
        };
      }
    });
  };

  componentDidMount() {
    this.initConcertHub();
  }

  componentWillUnmount() {
    this.concertHubService.stop();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.connectionId !== this.state.connectionId) {
      setTimeout(() => {
        const { name, token, roomId } = this.props;
        console.log(roomId, token);
        this.concertHubService.enterRoom({
          name: name,
          token: "" + token,
          roomId: parseInt(roomId),
          participantType: "Player",
        });
      }, 400);
    }
  }

  onKeyPress = (key) => {
    const { roomName } = this.state;
    this.concertHubService.pressKey(roomName, key);
  };

  onKeyPressed = ({ connectionId, key }) => {
    console.log(connectionId, key);
    if (this.state.connectionId !== connectionId) {
      const { coMusiciansSynth } = this.state;
      console.log(coMusiciansSynth);
      const index = coMusiciansSynth.findIndex(
        (p) => p.connectionId == connectionId
      );
      console.log("index", index);
      if (index >= 0) {
        coMusiciansSynth[index].synth.triggerAttack(key);
      }
    }
  };

  onKeyLeaved = ({ connectionId, key }) => {
    console.log(connectionId, key);
    if (this.state.connectionId !== connectionId) {
      const { coMusiciansSynth } = this.state;
      const index = coMusiciansSynth.findIndex(
        (p) => p.connectionId == connectionId
      );
      if (index >= 0) {
        coMusiciansSynth[index].synth.triggerRelease();
      }
    }
  };

  onKeyLeave = (key) => {
    const { roomName } = this.state;
    this.concertHubService.leaveKey(roomName, key);
  };

  initConcertHub() {
    this.concertHubService.onError(this.onError);
    this.concertHubService.onJoin(this.onJoin);
    this.concertHubService.onLeave(this.onLeave);
    this.concertHubService.onKeyPressed(this.onKeyPressed);
    this.concertHubService.onKeyLeaved(this.onKeyLeaved);
    this.concertHubService
      .start()
      .then(() => {
        this.concertHubService
          .GetConnectionId()
          .then((connectionId) => this.setState({ connectionId }));
      })
      .catch((err) => {
        //TODO handle error
      });
  }

  render() {
    const { loading } = this.state;

    return loading ? (
      <Spinner />
    ) : (
      <div>
        <Piano onKeyPress={this.onKeyPress} onKeyLeave={this.onKeyLeave} />
      </div>
    );
  }
}

export default WithRoom(WithToken(WithName(MusicianRoomPage)));
