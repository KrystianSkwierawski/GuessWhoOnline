using Application.Common.Interfaces;

namespace Infrastructure.Services
{
    public class GameStatusService : IGameStatus
    {
        public string WaitForOpponent => "Wait for opponent";

        public string CharacterSelect => "Select your character";

        public string OpponentIsSelectingCharacter => "Opponent is selecting character";

        public string WaitForStart => "Wait for start";

        public string OpponentTurn => "Opponent turn";

        public string YourTurn => "Your turn";

        public string Paused => "Game is paused";

        public string Started => "Started";

        public string Ended => "Ended";
    }
}
