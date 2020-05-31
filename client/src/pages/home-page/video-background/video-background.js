import React from "react";
import "./video-background.css";
import pianoVideo from "../assets/piano.mp4";

export default function VideoBackground() {
  return (
    <video autoPlay muted loop id="video" className="background-video">
      <source src={pianoVideo} type="video/mp4" />
    </video>
  );
}
