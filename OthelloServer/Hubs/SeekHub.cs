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
        public SeekHub(UserManager<AppUser> userManager, SeekPool pool) : base()
        {
            Pool = pool;
            UserManager = userManager;
        }
        public override Task OnConnectedAsync()
        {
            Pool.AddSubscriber(CallerUser());
            string user = Context.UserIdentifier;
            List<ConnectedUser> releventSeekers = Pool.GetRelevantSeekers(user);
            Clients.User(user).SendAsync("UpdateSeeks", releventSeekers);
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception e)
        {
            Pool.RemoveSeek(Context.UserIdentifier);
            Pool.RemoveSubscriber(Context.UserIdentifier);
            return base.OnDisconnectedAsync(e);
        }

        public void CreateSeek(SeekParameters data)
        {
            ConnectedUser seeker = CallerUser();
            if (seeker == null)
            {
                return;
            }
            Seek seek = new Seek(seeker, data);
            string compatibleSeeker = Pool.FindCompatibleSeeker(seek);
            if (compatibleSeeker != null)
            {
                Pool.RemoveSeek(compatibleSeeker);
                string gameId = "lskjndf";
                Clients.User(seeker.Name).SendAsync("GameMade", gameId);
                Clients.User(compatibleSeeker).SendAsync("GameMade", gameId);
            }
            else
            {
                Pool.AddSeek(seek);
            }
            UpdateSubscribers();
        }

        public void CancelSeek()
        {
            string seeker = Context.UserIdentifier;
            if (seeker != null)
            {
                Pool.RemoveSeek(seeker);
                UpdateSubscribers();
            }
        }

        public void AcceptSeek(string seeker)
        {
            if (Pool.IsAcceptableSeek(Context.UserIdentifier, seeker))
            {
                Pool.RemoveSeek(seeker);
                //game gets created
            }
            UpdateSubscribers();
            //return Clients.All.SendAsync("send", "accepted seek");
        }
        private ConnectedUser CallerUser()
        {
            string userName = Context.UserIdentifier;
            AppUser user = UserManager.FindByNameAsync(userName).Result;
            if (user == null)
            {
                return null;
            }
            ConnectedUser seeker = new ConnectedUser
            {
                Name = user.UserName,
                Rating = user.Rating
            };
            return seeker;
        }
        private void UpdateSubscribers()
        {
            List<string> subscribers = Pool.GetSubscribers();
            foreach (string user in subscribers)
            {
                List<ConnectedUser> releventSeekers = Pool.GetRelevantSeekers(user);
                Clients.User(user).SendAsync("UpdateSeeks", releventSeekers);
            }
        }
    }
}
