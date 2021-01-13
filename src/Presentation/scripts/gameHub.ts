declare var signalR: any;
import * as gameView from './views/gameView.js';
import { Timer } from './models/Timer.js';
import { GameSounds } from './models/GameSounds.js';
import * as NotificationSender from './models/NotificationSender.js';

const _timer = new Timer();

var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();

hub.on("GivePermisionToStartTheGame", (): void => {
    gameView.ShowGamePanel__startGameButton();
    gameView.hideGameStatus();
});

hub.on("SendNotificationAboutOpponentJoinedToTheGame", (): void => {
    NotificationSender.sendNotificationAboutOpponentJoinedToTheGame();
});

hub.on("RestartGameBoard", (): void => {
    gameView.restartGameBoard();
});

hub.on("RestartGamePanel", (): void => {
    gameView.restartGamePanel();
});

hub.on("SendNotificationAboutGameRestart", (): void => {
    NotificationSender.sendNotificationAboutGameRestart();
});

hub.on("RemoveEndGameNotification", (): void => {
    gameView.removeTheNotificationAboutEndTheGame();
});

hub.on("SendNotificationAboutPauseTheGame", (): void => {
    gameView.renderTheNotificationAboutPausingTheGame();
});

hub.on("RemoveNotificationAboutPauseTheGame", (): void => {
    gameView.remvoeTheNotificationAboutPausingTheGame();
});

hub.on("ActivateChatCommunicator", (): void => {
    gameView.activateChatCommunicator();
});

hub.on("PlayWinSound", (): void => {
    GameSounds.playWinSound();
});

hub.on("PlayLoseSound", (): void => {
    GameSounds.playLoseSound();
});

hub.on("PlayEndTurnSound", (): void => {
    GameSounds.playEndRoundSound();
});

hub.on("SendNotificationAboutEndOfTheGame", (status: string, characterName: string): void => {
    gameView.renderTheNotificationAboutEndTheGame(status, characterName);
});

hub.on("SendNotificationThatYourOpponentLeftTheGame", (): void => {
    NotificationSender.sendNotificationThatYourOpponentLeftTheGame();
});

hub.on("StartTimer", (): void => {
    _timer.startTimer();
});

hub.on("StopTimer", (): void => {
    _timer.stopTimer();
});

hub.on("ResetTimer", (): void => {
    _timer.resetTimer();
});

hub.on("SetYourCharacter", (characterName: string): void => {
    gameView.setYourCharacterImg(characterName);
    gameView.setYourCharacterName(characterName);
});

hub.on("ActivateGameBoard", (): void => {
    gameView.activateGameBoard();
});

hub.on("ActivateGamePanel", (): void => {
    gameView.activateGamePanel();
});

hub.on("HideStartGameButton", (): void => {
    gameView.HideGamePanel__startGameButton();
});

hub.on("RecieveOpponentMessage", (message: string): void => {
    const sender = "Opponent";

    gameView.renderMessage(message, sender);
    gameView.scrollMessagesContainerToBottom();
});

hub.on("ShowGameStatus", (): void => {
    gameView.showGameStatus();
});

hub.on("DisableGameBoard", (): void => {
    gameView.disableGameBoard();
});

hub.on("DisableGamePanel", (): void => {
    gameView.disableGamePanel();
});

hub.on("RecieveGameStatus", (status: string): void => {
    gameView.setGameStatus(status);
})

hub.start().then(async function () {
    const gameId: string = gameView.getGameIdInputValue();
    await tryJoinGame(gameId);
}).catch(function (err) {
    return console.error(err.toString());
});

const tryJoinGame = async (gameId: string): Promise<void> => {
    await hub.invoke('TryJoinGame', gameId);
};

export const selectCharacter = async (gameId: string, characterName: string): Promise<void> => {
    await hub.invoke('SelectCharacter', gameId, characterName);
};

export const startGame = async (): Promise<void> => {
    await hub.invoke('StartTheGame');
};

export const finishTheTurn = async (): Promise<void> => {
    await hub.invoke('FinishTheTurn');
};

export const checkCharacterTypeAndEndTheGame = async (characterType: string): Promise<void> => {
    await hub.invoke('CheckCharacterTypeAndEndTheGame', characterType);
};

export const sendMessageToOpponent = async (message: string): Promise<void> => {
    await hub.invoke('SendMessageToOpponent', message);
};

export const voteToRestartGame = async (): Promise<void> => {
    await hub.invoke('VoteToRestartGame');
};

