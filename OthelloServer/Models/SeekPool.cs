using OthelloServer.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.Models
{
    public class SeekPool
    {
        private List<Seek> Pool;
        public SeekPool()
        {
            Pool = new List<Seek>();
        }

        public void Add(Seek seek)
        {
            Pool.Add(seek);
        }
        // seeker might be a bad name in this case it is just a user who may not be seeking
        public List<Seeker> GetRelevantSeekers(Seeker user)
        {
            return Pool.Where(e => {
                return e.Parameters.Max >= user.Rating 
                && e.Parameters.Min <= user.Rating;
            }).Select(e => e.Seeker).ToList();
        }
    }
}
