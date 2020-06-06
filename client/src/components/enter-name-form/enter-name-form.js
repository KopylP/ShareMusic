import React, { useState } from "react";
import "./enter-name-form.css";

export default function EnterNameForm({ onNameSubmit = (p) => p }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    if (name !== "") onNameSubmit(name);
    else setError(true);
  };

  return (
    <form onSubmit={onSubmit} className="enter-name-form">
      <div className="center">
        <h2>
          Enter your name and
          <br /> <span className="lets-music">let`s music</span>
        </h2>
        <i className="fa fa-play-circle text-primary" onClick={onSubmit} />
        <div className="items-container">
          <input
            type="text"
            placeholder="Enter your name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
      </div>
    </form>
  );
}
