export const sendVotingNotificationsToRestartTheGame = () => {
    toastr["info"]("You voted to restart the game.");
};
export const sendNotificationThatYourOpponentLeftTheGame = () => {
    toastr["warning"]("Your opponent left the game.");
};
export const sendNotificationAboutNotChoosedCharacter = () => {
    toastr["info"]("Choose character to guess.");
};
export const sendNotificationAboutOpponentJoinedToTheGame = () => {
    toastr["success"]("Your opponent has joined your game.");
};
export const sendNotificationAboutGameRestart = () => {
    toastr["success"]("The game has been restarted.");
};
export const sendNotificationAboutIncorrectPassword = () => {
    toastr["warning"]('Incorrect password');
};
//# sourceMappingURL=notificationSender.js.map