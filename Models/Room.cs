using System;
using System.ComponentModel.DataAnnotations;

namespace ShareMusic.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string ListenSald { get; set; }
        public string PlayingSald { get; set; }
        public DateTime FirstConnectionExpired { get; set; }
    }
}