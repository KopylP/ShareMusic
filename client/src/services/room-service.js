import axios from "axios";

export default class RoomService {
  _baseUrl = "http://localhost:5000/api/";

  async _getRequest(path) {
    const response = await axios.get(`${this._baseUrl}${path}`);
    return response.data;
  }

  async _postRequest(path, data) {
    const response = await axios.post(`${this._baseUrl}${path}`, data);
    return response.data;
  }

  async createRoom(roomName) {
    return await this._postRequest("rooms", {
      Name: roomName,
    });
  }
}
