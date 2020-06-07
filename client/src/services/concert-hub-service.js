import * as signalR from "@aspnet/signalr";
import { apiUrl } from "../config";

export default class ConcertHubService {
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}concert`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

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

  pressKey = (roomName, key) => {
    this.connection.invoke("PressKey", roomName, key);
  };

  onKeyPressed = (callback = (f) => f) => {
    this.connection.on("KeyPressed", (data) => {
      callback(data);
    });
  };

  leaveKey = (roomName, key) => {
    this.connection.invoke("LeaveKey", roomName, key);
  };

  onKeyLeaved = (callback = (f) => f) => {
    this.connection.on("KeyLeaved", (data) => {
      callback(data);
    });
  };

  GetConnectionId =  async () => {
    return await this.connection.invoke("GetConnectionId");
  }

  start = async () => {
    await this.connection.start();
  };

  stop = () => {
    this.connection.stop();
  };
}
