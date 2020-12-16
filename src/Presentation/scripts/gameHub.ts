import * as indexView from './views/indexView.js';

var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();

hub.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

hub.on('RefreshListOfGames', async game => {
    indexView.AddGameToMatchList(game);
});

export const createGame = async (id, name = id, password) => {
    await hub.invoke('CreateGame', id, name, password);
};

