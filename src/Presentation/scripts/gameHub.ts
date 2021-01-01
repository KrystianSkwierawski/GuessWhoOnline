﻿declare var signalR: any;
import * as gameView from './views/gameView.js';
import { Timer } from './models/Timer.js';

const _timer = new Timer();

var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();

hub.on("GivePermisionToStartTheGame", (): void => {
    gameView.showOrHideStartGameButton();
    gameView.showOrHideGameStatus();
});

hub.on("StartTimer", (): void => {
    _timer.startTimer();
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


hub.on("ShowGameStatus", (): void => {
    gameView.showOrHideGameStatus();
});

hub.on("DisableGameBoard", (): void => {
    gameView.disableGameBoard();
});

hub.on("DisableGamePanel", (): void => {
    gameView.disableGamePanel();
});

hub.on("RecieveGameStatus", (status: string): void => {
    gameView.setGameStatus(status);
});

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
    await hub.invoke('StartGame');
};

export const finishTheTurn = async (): Promise<void> => {
    await hub.invoke('FinishTheTurn');
};

