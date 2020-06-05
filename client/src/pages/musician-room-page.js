import React from "react";
import WithToken from "../hoc-helpers/with-token";
import WithRoom from "../hoc-helpers/with-room";
import WithName from "../hoc-helpers/with-name";

function MusicianRoomPage() {
  return <div>Musician Room Page</div>;
}

export default WithRoom(WithToken(WithName(MusicianRoomPage)));
