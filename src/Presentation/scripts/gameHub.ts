import * as indexView from './views/indexView.js';
declare var signalR: any

var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();

hub.on('RefreshListOfGames', async game => {
    indexView.AddGameToMatchList(game);
});


hub.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});


export const createGame = async (id: string, name: string = id, password: string): Promise<void> => {
    await hub.invoke('CreateGame', id, name, password);
};

