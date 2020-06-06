import * as signalR from "@aspnet/signalr";

export default class ConcertHubService {
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/concert", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  musicianJoin = (callback = (f) => f) => {
    this.connection.on("Notify", (data) => {
      callback(data);
    });
  };

  onJoin = (callback = f => f) => {
    this.connection.on("Join", (participant) => callback(participant));
  };

  onLeave = (callback = f => f) => {
    this.connection.on("Leave", participant => callback(participant));
  }

  onError = (callback = (f) => f) => {
    this.connection.on("Error", (data) => callback(data));
  };

  enterRoom = (enterRoomModel) => {
    this.connection.invoke("EnterRoom", enterRoomModel);
  };

  pressKey = (key) => {
    this.connection.invoke("PressKey", key);
  };

  onKeyPressed = (callback = (f) => f) => {
    this.connection.on("KeyPressed", (data) => {
      callback(data);
    });
  };

  leaveKey = (key) => {
    this.connection.invoke("LeaveKey", key);
  };

  onKeyLeaved = (callback = (f) => f) => {
    this.connection.on("KeyLeaved", (data) => {
      callback(data);
    });
  };

  start = async () => {
    await this.connection.start();
  };

  stop = () => {
    this.connection.stop();
  };
}
