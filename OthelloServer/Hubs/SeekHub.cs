using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using OthelloServer.Models;
using OthelloServer.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace OthelloServer.Hubs
{
    [Authorize]
    public class SeekHub : Hub
    {
        private readonly UserManager<AppUser> UserManager;
        private readonly SeekPool Pool;
        public SeekHub(UserManager<AppUser> userManager, SeekPool pool)
        {
            Pool = pool;
            UserManager = userManager;
        }
        public void CreateSeek(SeekParameters data)
        {
            // this is actually their username which is neat
            string sub = Context.UserIdentifier;
            Seeker seeker = new Seeker
            {
                Name = sub,
                Rating = 1700
            };

            Seek seek = new Seek(seeker, data);
            Pool.Add(seek);
            //Clients.All.SendAsync("send", Pool.GetRelevantSeekers(seeker));
            //Clients.All.SendAsync("send", sub);
            // can actually send messages by username also neat
            Clients.User(sub).SendAsync("send", sub);
        }

        public Task CancelSeek()
        {
            return Clients.All.SendAsync("send", "seek cancelled");
        }

        public Task AcceptSeek(Seeker data)
        {
            return Clients.All.SendAsync("send", "accepted seek");
        }

        // how to authenticate signalr
        //https://docs.microsoft.com/en-us/aspnet/core/signalr/authn-and-authz?view=aspnetcore-2.2

        // signalr at microsoft build (things have changed since though)
        //https://www.youtube.com/watch?v=1TrttIkbs6c

        // clients subscribe to a list of current seeks
        // clients only see seeks that they can accept
        // client either makes a seek, cancels a seek or accepts a seek
        // if a seek is made then check open seeks if a pairing can be made between seeks then make a game else add to open seeks
        // if a user cancels their seek then remove their seek from the open seeks (if one exists since could be a hacked client)
        // if a user accepts a seek then verify that the accepted seek still exists
    }
}
