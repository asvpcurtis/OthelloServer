using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.ViewModels
{
    public class SeekParameters
    {
        [Required]
        public int Min { get; set; }
        [Required]
        public int Max { get; set; }
    }
}
