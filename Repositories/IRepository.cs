using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareMusic.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task CreateAsync(TEntity item);
        Task<TEntity> FindByIdAsync(int id);
        Task<IEnumerable<TEntity>> GetAsync();
        Task<IEnumerable<TEntity>> GetAsync(Func<TEntity, bool> predicate);
        Task RemoveAsync(TEntity item);
        Task UpdateAsync(TEntity item);
        Task  SaveChangesAsync();
    }
}