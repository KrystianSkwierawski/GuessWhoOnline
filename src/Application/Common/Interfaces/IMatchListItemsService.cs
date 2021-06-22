using Application.Common.Models;
using System.Collections.Generic;

namespace Application.Common.Interfaces
{
    public interface IMatchListItemsService
    {
        public List<MatchListItem> GetAll();
        public void AddMatchListItem(MatchListItem match);
        public void RemoveMatchByUrl(string url);
        public MatchListItem GetMatchById(string id);
        public void AddConnection(string url);
        public void RemoveConnection(string url);
        public int GetNumberOfConnections(string url);
        public void RemoveEmptyMatches();

    }
}
