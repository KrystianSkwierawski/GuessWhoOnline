declare var toastr: any

export const sendVotingNotificationsToRestartTheGame = () => {
    toastr["info"]("You voted to restart the game.");
};

export const sendNotificationThatYourOpponentLeftTheGame = () => {
    toastr["warning"]("Your opponent left the game.");
};

export const sendNotificationAboutNotChoosedCharacter = (): void => {
    toastr["info"]("Choose character to guess.");
};

export const sendNotificationAboutOpponentJoinedToTheGame = (): void => {
    toastr["success"]("Your opponent has joined your game.");
};

export const sendNotificationAboutGameRestart = (): void => {
    toastr["success"]("The game has been restarted.");
};
