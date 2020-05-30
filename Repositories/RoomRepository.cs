using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShareMusic.Data;
using ShareMusic.Models;

namespace ShareMusic.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private ApplicationContext _appContext;
        public RoomRepository(ApplicationContext applicationContext)
        {
            _appContext = applicationContext;
        }

        public async Task CreateAsync(Room item)
        {
            await _appContext.Rooms.AddAsync(item);
            await SaveChangesAsync();
        }

        public async Task<Room> FindByIdAsync(int id)
        {
            return await _appContext.Rooms.FindAsync(id);
        }

        public async Task<IEnumerable<Room>> GetAsync()
        {
            return await _appContext.Rooms.ToListAsync();
        }

        public async Task<IEnumerable<Room>> GetAsync(Func<Room, bool> predicate)
        {
            var list = await _appContext.Rooms.ToListAsync();
            return list.Where(predicate).ToList();
        }

        public async Task RemoveAsync(Room item)
        {
            _appContext.Rooms.Remove(item);
            await SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _appContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Room item)
        {
            _appContext.Rooms.Update(item);
            await SaveChangesAsync();
        }
    }
}