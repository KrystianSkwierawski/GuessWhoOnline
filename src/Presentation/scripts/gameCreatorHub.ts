declare var signalR: any
import * as indexView from './views/indexView.js';
import { Game } from './models/Game.js';
import { navigateToGameUrl } from './index.js';


var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();


hub.on('DisplayNotification', (): void => {
    indexView.displayNotificationAboutIncorrectPassword();
});

hub.on('RecieveGameUrl', (url: string): void => {
    navigateToGameUrl(url);
});

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

export const tryJoinMatch = async (id: string, password: string): Promise<void> => {
    await hub.invoke('TryJoinMatch', id, password)
};
