using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareMusic.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task CreateAsync(TEntity item, bool commit = true);
        Task<TEntity> FindByIdAsync(int id);
        Task<IEnumerable<TEntity>> GetAsync();
        Task<IEnumerable<TEntity>> GetAsync(Func<TEntity, bool> predicate);
        Task RemoveAsync(TEntity item, bool commit = true);
        Task UpdateAsync(TEntity item, bool commit = true);
        Task  SaveChangesAsync();
    }
}