import React from "react";
import Octave from "../octave/octave";
import "./piano.css";

export default function Piano() {
  return (
    <div className="piano">
      <Octave />
      <Octave />
      <Octave />
      <Octave />
    </div>
  );
}
