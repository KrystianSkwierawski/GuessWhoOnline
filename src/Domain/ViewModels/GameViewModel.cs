using System.Collections.Generic;

namespace Domain.ViewModels
{
    public class GameViewModel
    {
        public string Id { get; set; }
        public List<string> CharactersNames { get; set; }
        public int NumberOfConnections { get; set; }
    }
}
