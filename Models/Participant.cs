using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareMusic.Models
{
    public class Participant
    {
        #region props
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string ParticipantType { get; set; }
        public string ConnectionId { get; set; }
        public int RoomId { get; set; }
        #endregion
        #region lazy props
        [ForeignKey("RoomId")]
        public Room Room { get; set; }
        #endregion
    }
}