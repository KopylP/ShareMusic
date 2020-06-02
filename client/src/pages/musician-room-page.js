import React from "react";
import WithToken from "../hoc-helpers/with-token";
import WithRoom from "../hoc-helpers/with-room";

function MusicianRoomPage() {
    return <div>Musician Room Page</div>
}

export default WithRoom(WithToken(MusicianRoomPage));