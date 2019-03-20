using Microsoft.AspNetCore.SignalR;
using OthelloServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.Hubs
{
    public class SeekHub : Hub
    {
        public Task Send(string data)
        {
            return Clients.All.SendAsync("send", "get r done");
            //return Clients.All.SendCoreAsync('/send',)
        }
    }
}
