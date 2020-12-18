import * as indexView from './views/indexView.js';
import { Game } from './models/Game.js';
declare var signalR: any

var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();

hub.on('RecieveAndRenderListOfMatches', (games: Array<Game>) => {
    indexView.renderGamesInMatchList(games);
});

hub.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});


export const createGame = async (game: Game): Promise<void> => {
    await hub.invoke('CreateGame', game);
};

export const refreshListOfGames = async (): Promise<void> => {
    await hub.invoke('GetListOfGames');
};
