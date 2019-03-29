using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using OthelloServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.Hubs
{
    [Authorize]
    public class GameHub : Hub
    {
        private readonly UserManager<AppUser> UserManager;
        private readonly GamePool Pool;
        public GameHub(UserManager<AppUser> userManager, GamePool pool) : base()
        {
            Pool = pool;
            UserManager = userManager;
        }
    }
}
