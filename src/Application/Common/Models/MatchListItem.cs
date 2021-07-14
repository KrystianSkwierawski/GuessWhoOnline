namespace Application.Common.Models
{
    public class MatchListItem
    {
        public string Id { get; set; }

        public string Url { get; set; }

        private string _name;
        public string Name
        {
            get => _name;
            set
            {
                if(value.Length > 85)
                {
                    _name = value.Substring(0, 82) + "...";
                    return;
                }

                _name = value;
            }
        }

        public string Password { get; set; }

        public int NumberOfConnections { get; set; }
    }
}
