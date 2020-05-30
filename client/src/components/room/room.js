import React, { useEffect } from "react";
import "./room.css";
import ConcertHubService from "../../services/concert-hub-service";
import SynthService from "../../services/synth-service";
import Piano from "../piano/piano";

export default function Room(props) {
  const synthService = new SynthService();
  const concertHubService = new ConcertHubService();
  const musicianJoin = (id) => {
    console.log(id);
  };

  const onKeyPressed = (key) => {
    synthService.triggerAttack(key);
  };

  const onKeyLeaved = (key) => {
    console.log("leave");
    synthService.triggerRelease();
  };

  function initSubscriptions() {
    concertHubService.musicianJoin(musicianJoin);
    concertHubService.onKeyPressed(onKeyPressed);
    concertHubService.onKeyLeaved(onKeyLeaved);
  }

  useEffect(() => {
    initSubscriptions();
    concertHubService.start();
    return () => {
      concertHubService.stop();
    };
  }, []);

  return (
    <div className="room">
      <Piano
        onKeyPress={concertHubService.pressKey}
        onKeyLeave={concertHubService.leaveKey}
      />
    </div>
  );
}
