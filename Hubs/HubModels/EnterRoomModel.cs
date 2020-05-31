namespace ShareMusic.Hubs.HubModels
{
    public class EnterRoomModel
    {
        public string ParticipantType { get; set; }
        public string Token { get; set; }
        public int RoomId { get; set; }
        public string Name { get; set; }
    }
}