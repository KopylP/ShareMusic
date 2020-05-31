using Newtonsoft.Json;

namespace ShareMusic.ViewModels
{
    public class RoomViewModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string OwnerGuid { get; set; }
    }
}