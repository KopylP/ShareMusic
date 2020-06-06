using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ShareMusic.Repositories
{
    public abstract class EntityRepository<TEntity, TContext> : IRepository<TEntity>
            where TEntity : class
            where TContext : DbContext
    {
        protected readonly TContext context;
        public EntityRepository(TContext context)
        {
            this.context = context;
        }

        public async Task CreateAsync(TEntity item, bool commit = true)
        {
            context.Set<TEntity>().Add(item);
            if(commit)
                await SaveChangesAsync();
        }

        public async Task<TEntity> FindByIdAsync(int id)
        {
            return await context.Set<TEntity>().FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> GetAsync()
        {
            return await context.Set<TEntity>().ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAsync(Func<TEntity, bool> predicate)
        {
            var list = await context.Set<TEntity>().ToListAsync();
            return list.Where(predicate).ToList();
        }

        public async Task RemoveAsync(TEntity item, bool commit = true)
        {
            context.Entry(item).State = EntityState.Deleted;
            if(commit)
                await SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TEntity item, bool commit = true)
        {
            context.Entry(item).State = EntityState.Modified;
            if(commit)
                await SaveChangesAsync();
        }
    }
}