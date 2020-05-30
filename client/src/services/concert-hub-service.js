import * as signalR from "@aspnet/signalr";

export default class ConcertHubService {
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://sharemusic2020.azurewebsites.net/concert", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    console.log("constructor", this.connection);
  }

  musicianJoin = (callback = (f) => f) => {
    this.connection.on("Notify", (data) => {
      callback(data);
    });
  }

  pressKey = (key) => {
      console.log(key);
      this.connection.invoke("PressKey", key);
  }

  onKeyPressed = (callback = (f) => f) => {
    this.connection.on("KeyPressed", (data) => {
      callback(data);
    });
  }

  leaveKey = (key) => {
      this.connection.invoke("LeaveKey", key);
  }

  onKeyLeaved = (callback = (f) => f) => {
    this.connection.on("KeyLeaved", (data) => {
      callback(data);
    });
  }

  start = () => {
    this.connection.start().catch((err) => console.log(err));
    console.log("start", this.connection);
  }

  stop = () => {
    this.connection.stop();
  }
}
