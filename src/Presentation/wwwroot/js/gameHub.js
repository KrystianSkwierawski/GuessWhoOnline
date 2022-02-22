import * as gameView from './views/gameView.js';
import { Timer } from './models/Timer.js';
import { GameSounds } from './models/GameSounds.js';
import * as notificationSender from './views/notificationSender.js';
const _timer = new Timer();
var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();
hub.on("GivePermisionToStartTheGame", () => {
    gameView.ShowGamePanel__startGameButton();
    gameView.hideGameStatus();
});
hub.on("RedirectToHomeGameWasFull", () => {
    document.location.href = "/User/Home/GameWasFull";
});
hub.on("SendNotificationAboutOpponentJoinedToTheGame", () => {
    notificationSender.sendNotificationAboutOpponentJoinedToTheGame();
});
hub.on("RestartGameBoard", () => {
    gameView.restartGameBoard();
});
hub.on("RestartGamePanel", () => {
    gameView.restartGamePanel();
});
hub.on("SendNotificationAboutGameRestart", () => {
    notificationSender.sendNotificationAboutGameRestart();
});
hub.on("RemoveEndGameNotification", () => {
    gameView.removeTheNotificationAboutEndTheGame();
});
hub.on("SendNotificationAboutPauseTheGame", () => {
    gameView.renderTheNotificationAboutPausingTheGame();
});
hub.on("RemoveNotificationAboutPauseTheGame", () => {
    gameView.remvoeTheNotificationAboutPausingTheGame();
});
hub.on("PlayWinSound", () => {
    GameSounds.playWinSound();
});
hub.on("PauseTikTokTimerSound", () => {
    GameSounds.pauseTiktokTimerSound();
});
hub.on("PlayLoseSound", () => {
    GameSounds.playLoseSound();
});
hub.on("PlayEndTurnSound", () => {
    GameSounds.playEndRoundSound();
});
hub.on("SendNotificationAboutEndOfTheGame", (status, characterName) => {
    gameView.renderTheNotificationAboutEndTheGame(status, characterName);
});
hub.on("SendNotificationThatYourOpponentLeftTheGame", () => {
    notificationSender.sendNotificationThatYourOpponentLeftTheGame();
});
hub.on("StartTimer", () => {
    _timer.startTimer();
});
hub.on("StopTimer", () => {
    _timer.stopTimer();
});
hub.on("ResetTimer", () => {
    _timer.resetTimer();
});
hub.on("SetYourCharacter", (characterName) => {
    gameView.setYourCharacterImg(characterName);
    gameView.setYourCharacterName(characterName);
});
hub.on("ActivateGameBoard", () => {
    gameView.activateGameBoard();
});
hub.on("ActivateGamePanel", () => {
    gameView.activateGamePanel();
});
hub.on("HideStartGameButton", () => {
    gameView.HideGamePanel__startGameButton();
});
hub.on("RecieveOpponentMessage", (message) => {
    const sender = "Opponent";
    gameView.renderMessage(message, sender);
    gameView.scrollMessagesContainerToBottom();
});
hub.on("ShowGameStatus", () => {
    gameView.showGameStatus();
});
hub.on("DisableGameBoard", () => {
    gameView.disableGameBoard();
});
hub.on("DisableGamePanel", () => {
    gameView.disableGamePanel();
});
hub.on("RecieveGameStatus", (status) => {
    gameView.setGameStatus(status);
});
hub.start().then(async function () {
    const gameId = gameView.getGameIdInputValue();
    await tryJoinGame(gameId);
}).catch(function (err) {
    return console.error(err.toString());
});
const tryJoinGame = async (gameId) => {
    await hub.invoke('TryJoinGame', gameId);
};
export const selectCharacter = async (gameId, characterName) => {
    await hub.invoke('SelectCharacter', gameId, characterName);
};
export const startGame = async () => {
    await hub.invoke('StartTheGame');
};
export const finishTheTurn = async () => {
    await hub.invoke('FinishTheTurn');
};
export const checkCharacterTypeAndEndTheGame = async (characterType) => {
    await hub.invoke('CheckCharacterTypeAndEndTheGame', characterType);
};
export const sendMessageToOpponent = async (message) => {
    await hub.invoke('SendMessageToOpponent', message);
};
export const voteToRestartGame = async () => {
    await hub.invoke('VoteToRestartGame');
};
//# sourceMappingURL=gameHub.js.map