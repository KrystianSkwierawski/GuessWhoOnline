declare var signalR: any;
import * as indexView from './views/homeView.js';
import { Game } from './models/Game.js';
import { navigateToMatchUrl } from './home.js';


var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameCreatorHub')
    .build();


hub.on('DisplayNotification', (): void => {
    indexView.displayNotificationAboutIncorrectPassword();
});

hub.on('RecieveMatchUrl', (url: string): void => {
    navigateToMatchUrl(url);
});

hub.on('RecieveAndRenderListOfMatches', (games: Array<Game>) => {
    indexView.renderMatchesInMatchList(games);
});

hub.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});


export const createMatch = async (game: Game): Promise<void> => {
    await hub.invoke('CreateMatch', game);
};

export const refreshListOfGames = async (): Promise<void> => {
    await hub.invoke('GetMatchListItems');
};

export const tryJoinMatch = async (id: string, password: string): Promise<void> => {
    await hub.invoke('TryJoinMatch', id, password)
};
