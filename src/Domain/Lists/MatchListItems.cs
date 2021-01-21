using Domain.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Lists
{
    public static class MatchListItems
    {
        public static List<MatchListItem> Matches { get; set; } = new List<MatchListItem>();

        public static async Task RemoveMatchByUrl(string url)
        {
            MatchListItem match = Matches.FirstOrDefault(x => x.Url == url);

            if (match != null)
            {
                Matches.Remove(match);
            }
        }

        public static async Task AddConnection(string url)
        {
            MatchListItem match = Matches.FirstOrDefault(x => x.Url == url);

            if (match != null)
            {
                match.NumberOfConnections++;
            }
        }

        public static async Task RemoveConnection(string url)
        {
            MatchListItem match = Matches.FirstOrDefault(x => x.Url == url);

            if (match != null)
            {
                match.NumberOfConnections--;
            }
        }

        public static async Task<int> GetNumberOfConnections(string url)
        {
            int o_numberOfConnections = 0;

            MatchListItem match = Matches.FirstOrDefault(x => x.Url == url);

            if (match != null)
            {
                o_numberOfConnections = match.NumberOfConnections;
            }

            return o_numberOfConnections;
        }
    }
}
