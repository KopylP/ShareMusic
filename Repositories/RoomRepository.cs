using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShareMusic.Data;
using ShareMusic.Extensions;
using ShareMusic.Models;

namespace ShareMusic.Repositories
{
    public class RoomRepository : EntityRepository<Room, ApplicationContext>
    {
        public RoomRepository(ApplicationContext applicationContext) : base(applicationContext)
        {
        }
        public async Task<string> GetListenTokenByIdAsync(int id)
        {
            var room = await FindByIdAsync(id);
            if (room == null) return null;
            return $"{room.Name}{room.ListenSald}".ComputeSha256Hash();
        }

        public async Task<string> GetPlayerTokenByIdAsync(int id)
        {
            var room = await FindByIdAsync(id);
            if (room == null) return null;
            return $"{room.Name}{room.PlayingSald}".ComputeSha256Hash();
        }
    }
}