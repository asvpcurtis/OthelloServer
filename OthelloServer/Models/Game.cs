using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.Models
{
    public class Game
    {
        [Required]
        public string BlackPlayer { get; set; }
        [Required]
        public string WhitePlayer { get; set; }
        public Guid Id { get; set; }
        public List<Move> Moves { get; set; }
        
    }
}
