import React from "react";
import Octave from "../octave/octave";
import "./piano.css";
import SynthService from "../../services/synth-service";

export default function Piano({onKeyPress, onKeyLeave}) {

  const synthService = new SynthService();

  const onKeyPressed = (key) => {
    synthService.triggerAttack(key);
    onKeyPress(key);
  }

  const onKeyLeaved = (key) => {
    onKeyLeave(key);
    synthService.triggerRelease();
  }


  return (
    <div className="piano">
      <Octave number={2} onKeyPress={onKeyPressed } onKeyLeave={onKeyLeaved}/>
      <Octave number={3} onKeyPress={onKeyPressed } onKeyLeave={onKeyLeaved}/>
      <Octave number={4} onKeyPress={onKeyPressed } onKeyLeave={onKeyLeaved}/>
      <Octave number={5} onKeyPress={onKeyPressed } onKeyLeave={onKeyLeaved}/>
    </div>
  );
}
