namespace Application.Common.Interfaces
{
    public interface IGameStatus
    {
        public string WaitForOpponent { get; }
        public string CharacterSelect { get; }
        public string OpponentIsSelectingCharacter { get; }
        public string WaitForStart { get; }
        public string OpponentTurn { get; }
        public string YourTurn { get; }
        public string Paused { get; }
        public string Started { get; }
        public string Ended { get; }
    }
}
