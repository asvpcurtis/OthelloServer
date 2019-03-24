using OthelloServer.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.Models
{
    public class SeekPool
    {
        private readonly List<Seek> Pool;
        // keep tuples entirely internal as a best practice where full context exists, not on a public api
        // tuples are essentially the solution for creating bloated internal classes like a node in a linked list
        // or storing multiple values that may not make sense to group into an object since they are so unrelated
        private readonly Dictionary<string, (int rating, int count)> SubscriberInfo;
        public SeekPool()
        {
            Pool = new List<Seek>();
            SubscriberInfo = new Dictionary<string, (int, int)>();
        }

        public void AddSeek(Seek seek)
        {
            // remove all old seeks by user
            Pool.RemoveAll(s =>
            {
                return s.Seeker.Name == seek.Seeker.Name;
            });
            // add their newest seek
            Pool.Add(seek);
        }
        public void AddSubscriber(ConnectedUser user)
        {
            if (SubscriberInfo.ContainsKey(user.Name))
            {
                (int rating, int count) = SubscriberInfo[user.Name];
                SubscriberInfo[user.Name] = (user.Rating, count + 1);
            }
            else
            {
                SubscriberInfo[user.Name] = (user.Rating, 1);
            }
        }
        public void RemoveSubscriber(string user)
        {
            if (SubscriberInfo.ContainsKey(user))
            {
                SubscriberInfo.Remove(user);
            }
        }
        public List<ConnectedUser> GetRelevantSeekers(string user)
        {
            int userRating = SubscriberInfo[user].rating;
            return Pool.Where(e => {
                return e.Parameters.Max >= userRating
                && e.Parameters.Min <= userRating
                && e.Seeker.Name != user;
            }).Select(e => e.Seeker).ToList();
        }

        public List<string> GetSubscribers()
        {
            return SubscriberInfo.Keys.ToList();
        }

        public void RemoveSeek(string seeker)
        {
            Pool.RemoveAll(seek =>
            {
                return seek.Seeker.Name == seeker;
            });
        }
        public string FindCompatibleSeeker(Seek newSeek)
        {
            List<ConnectedUser> acceptableSeeks = GetRelevantSeekers(newSeek.Seeker.Name);
            ConnectedUser compatibleSeeker = acceptableSeeks.FirstOrDefault(cu => {
                return (cu.Rating <= newSeek.Parameters.Max) && (cu.Rating >= newSeek.Parameters.Min);
            });
            return compatibleSeeker?.Name;
        }
        public bool IsAcceptableSeek(string acceptingUser, string acceptedSeeker)
        {
            List<ConnectedUser> acceptableSeeks = GetRelevantSeekers(acceptingUser);
            return acceptableSeeks.Exists(cu => cu.Name == acceptedSeeker);
        }
    }
}
