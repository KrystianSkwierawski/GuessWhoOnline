declare var signalR: any;
import * as gameView from './views/gameView.js';


var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();

hub.on("GivePermisionToStartTheGame", (): void => {
    gameView.showOrHideStartGameButton();
    gameView.showOrHideGameStatus();
});

hub.on("ActivateGameBoard", (): void => {
    gameView.activateGameBoard();
});


hub.on("DisableGameBoard", (): void => {
    gameView.disableGameBoard();
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

