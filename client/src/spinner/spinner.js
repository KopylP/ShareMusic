import React from "react";
import "./spinner.css";
import spinner from "./spinner.svg";

export default function Spinner() {
  return (
    <div className="spinner">
      <img src={spinner} />
    </div>
  );
}
