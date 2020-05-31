using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShareMusic.Models
{
    public class Room
    {
        #region props
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string ListenSald { get; set; }
        public string PlayingSald { get; set; }
        public DateTime FirstConnectionExpired { get; set; }
        public string OwnerGuid { get; set; }
        #endregion
        #region lazy props
        public virtual IEnumerable<Participant> Participants { get; set; }
        #endregion
    }
}