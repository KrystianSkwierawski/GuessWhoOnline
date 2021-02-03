<<<<<<< HEAD:src/Application/Models/Game.cs
﻿namespace Application.Models
=======
﻿namespace Application.Common.Models
>>>>>>> master:src/Application/Common/Models/Game.cs
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
