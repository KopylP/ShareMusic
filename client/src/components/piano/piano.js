import React from "react";
import Octave from "../octave/octave";
import "./piano.css";
import * as Tone from "tone";

export default function Piano() {

  const synth = new Tone.Synth().toMaster();

  const onKeyPress = (key) => {
    synth.triggerAttack(key);
  }

  const onKeyLeave = (key) => {
    synth.triggerRelease();
  }


  return (
    <div className="piano">
      <Octave number={2} onKeyPress={onKeyPress} onKeyLeave={onKeyLeave}/>
      <Octave number={3} onKeyPress={onKeyPress} onKeyLeave={onKeyLeave}/>
      <Octave number={4} onKeyPress={onKeyPress} onKeyLeave={onKeyLeave}/>
      <Octave number={5} onKeyPress={onKeyPress} onKeyLeave={onKeyLeave}/>
    </div>
  );
}
