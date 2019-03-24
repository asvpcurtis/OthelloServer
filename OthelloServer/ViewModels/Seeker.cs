using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.ViewModels
{
    public class ConnectedUser
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int Rating { get; set; }
    }
}
