import React from "react";
import { Consumer } from "../context/room-context";

export default function WithRoom(Wrapper) {
  return (props) => {
    return (
      <Consumer>
        {({ room, updateRoom }) => (
          <Wrapper room={room} updateRoom={updateRoom} {...props} />
        )}
      </Consumer>
    );
  };
}
