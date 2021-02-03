namespace Domain
{
    public static class GameStatus
    {
        public static string WaitForOpponent { get; } = "Wait for opponent";

        public static string CharacterSelect { get; } = "Select your character";

        public static string OpponentIsSelectingCharacter { get; } = "Opponent is selecting character";

        public static string WaitForStart { get; } = "Wait for start";

        public static string OpponentTurn { get; } = "Opponent turn";

        public static string YourTurn { get; } = "Your turn";

        public static string Paused { get; } = "Game is paused";

        public static string Started { get; } = "Started";

        public static string Ended { get; } = "Ended";
    }
}
