namespace Domain.Models
{
    public class Game
    {
        public string Id { get; set; }
        public string FirstTurnPlayerId { get; set; }
        public string FirstTurnPlayerCharacter { get; set; }
        public string SecondTurnPlayerId { get; set; }
        public string SecondTurnPlayerCharacter { get; set; }
        public string Status { get; set; }
        public string CurrentTurnPlayerId { get; set; }
        public string NextTurnPlayerId { get; set; }
        public int VotesToRestartGame { get; set; }
    }
}
