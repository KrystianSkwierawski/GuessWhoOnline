namespace Domain.Models
{
    public class Game
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }

        public string HostPlayerConnectionId { get; set; }
        public string GuestPlayerConnectionId { get; set; }
    }
}
