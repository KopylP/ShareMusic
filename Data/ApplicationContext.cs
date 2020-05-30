using Microsoft.EntityFrameworkCore;
using ShareMusic.Models;

namespace ShareMusic.Data
{
    public class ApplicationContext : DbContext
    {
        DbSet<Room> Rooms { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
    }
}