using Application.Common.Interfaces;
using Application.Common.Models;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Services
{
    public class MatchListItemsService : IMatchListItemsService
    {
        private static List<MatchListItem> _matches = new List<MatchListItem>();

        public List<MatchListItem> GetAll()
        {
            return _matches;
        }

        public void AddMatchListItem(MatchListItem match)
        {
            _matches.Add(match);
        }

        public void RemoveMatchByUrl(string url)
        {
            MatchListItem match = _matches.FirstOrDefault(x => x.Url == url);

            if (match != null)
            {
                _matches.Remove(match);
            }
        }

        public MatchListItem GetMatchById(string id)
        {
            return _matches.FirstOrDefault(x => x.Id == id);
        }

        public void AddConnection(string url)
        {
            MatchListItem match = _matches.FirstOrDefault(x => x.Url == url);

            if (match != null)
            {
                match.NumberOfConnections++;
            }
        }

        public void RemoveConnection(string url)
        {
            MatchListItem match = _matches.FirstOrDefault(x => x.Url == url);

            if (match != null)
            {
                match.NumberOfConnections--;
            }
        }

        public int GetNumberOfConnections(string url)
        {
            int o_numberOfConnections = 0;

            MatchListItem match = _matches.FirstOrDefault(x => x.Url == url);

            if (match != null)
            {
                o_numberOfConnections = match.NumberOfConnections;
            }

            return o_numberOfConnections;
        }
    }
}
