using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShareMusic.Data;
using ShareMusic.Models;

namespace ShareMusic.Repositories
{
    public class ParticipantRepository : EntityRepository<Participant, ApplicationContext>
    {
        public ParticipantRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<Participant> FindByConnectionIdAsync(string connectionId)
        {
            return (await GetAsync(p => p.ConnectionId == connectionId)).FirstOrDefault();
        }
    }
}