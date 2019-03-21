using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OthelloServer.ViewModels;

namespace OthelloServer.Models
{
    public class Seek
    {
        public readonly Seeker Seeker;
        public readonly SeekParameters Parameters;
        public Seek(Seeker seeker, SeekParameters parameters)
        {
            Seeker = seeker;
            Parameters = parameters;
        }
    }
}
