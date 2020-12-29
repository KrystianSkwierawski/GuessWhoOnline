declare var signalR: any;
import * as gameView from './views/gameView.js';


var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();

hub.on("GivePermisionToStartTheGame", (): void => {
    gameView.showOrHideStartGameButton();
    gameView.showOrHideGameStatus();
});


hub.on("ChangeGameStatusToWaitForStart", (): void => {
    gameView.setGameStatusToWaitForStart();
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
