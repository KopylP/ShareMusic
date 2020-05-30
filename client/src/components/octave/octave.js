import React from "react";
import "./octave.css";

export default function Octave({ number, onKeyPress, onKeyLeave }) {
  const whiteKeys = ["c", "d", "e", "f", "g", "a", "b"];
  const blackKeys = ["c#", "d#", "", "f#", "g#", "a#"];

  const whiteKeysView = whiteKeys.map((key) => {
    return (
      <div
        key={key + number}
        className="white-key"
        onMouseDown={() => onKeyPress(key + number)}
        onMouseOver={(e) => {
          if (e.buttons === 1 || e.buttons === 3) onKeyPress(key + number);
        }}
        onMouseUp={() => onKeyLeave(key + number)}
        onMouseLeave={() => onKeyLeave(key + number)}
      />
    );
  });
  const blackKeysView = blackKeys.map((key, i) => {
    let translate = `translate(${37.5 + i * 50}px, 0px)`;
    var keyView = (
      <div
        key={i}
        className="black-key"
        style={{ transform: translate }}
        onMouseDown={() => onKeyPress(key + number)}
        onMouseOver={(e) => {
          if (e.buttons === 1 || e.buttons === 3) onKeyPress(key + number);
        }}
        onMouseUp={() => onKeyLeave(key + number)}
        onMouseLeave={() => onKeyLeave(key + number)}
      />
    );
    return i === 2 ? null : keyView;
  });
  return (
    <div className="octave">
      {whiteKeysView}
      {blackKeysView}
    </div>
  );
}
