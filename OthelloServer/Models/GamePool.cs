using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.Models
{
    public class GamePool
    {
        private readonly Dictionary<Guid, Game> Games;
        public GamePool()
        {
            Games = new Dictionary<Guid, Game>();
        }

    }
}
