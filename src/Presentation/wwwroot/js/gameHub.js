var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as gameView from './views/gameView.js';
import { Timer } from './models/Timer.js';
import { GameSounds } from './models/GameSounds.js';
import * as NotificationSender from './models/NotificationSender.js';
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
    NotificationSender.sendNotificationAboutOpponentJoinedToTheGame();
});
hub.on("RestartGameBoard", () => {
    gameView.restartGameBoard();
});
hub.on("RestartGamePanel", () => {
    gameView.restartGamePanel();
});
hub.on("SendNotificationAboutGameRestart", () => {
    NotificationSender.sendNotificationAboutGameRestart();
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
hub.on("ActivateChatCommunicator", () => {
    gameView.activateChatCommunicator();
});
hub.on("PlayWinSound", () => {
    GameSounds.playWinSound();
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
    NotificationSender.sendNotificationThatYourOpponentLeftTheGame();
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
hub.start().then(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = gameView.getGameIdInputValue();
        yield tryJoinGame(gameId);
    });
}).catch(function (err) {
    return console.error(err.toString());
});
const tryJoinGame = (gameId) => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('TryJoinGame', gameId);
});
export const selectCharacter = (gameId, characterName) => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('SelectCharacter', gameId, characterName);
});
export const startGame = () => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('StartTheGame');
});
export const finishTheTurn = () => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('FinishTheTurn');
});
export const checkCharacterTypeAndEndTheGame = (characterType) => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('CheckCharacterTypeAndEndTheGame', characterType);
});
export const sendMessageToOpponent = (message) => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('SendMessageToOpponent', message);
});
export const voteToRestartGame = () => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('VoteToRestartGame');
});
//# sourceMappingURL=gameHub.js.map