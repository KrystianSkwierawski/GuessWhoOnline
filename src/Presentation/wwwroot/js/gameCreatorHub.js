import * as indexView from './views/homeView.js';
import { navigateToMatchUrl } from './home.js';
import * as notificationSender from './views/notificationSender.js';
var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameCreatorHub')
    .build();
hub.on('SendNotificationAboutIncorrectPassword', () => {
    notificationSender.sendNotificationAboutIncorrectPassword();
});
hub.on('RecieveMatchUrl', (url) => {
    navigateToMatchUrl(url);
});
hub.on('RecieveAndRenderListOfMatches', (matches) => {
    indexView.renderMatchesInMatchList(matches);
});
hub.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});
export const createMatch = async (match) => {
    await hub.invoke('CreateMatch', match);
};
export const refreshListOfGames = async () => {
    await hub.invoke('GetMatchListItems');
};
export const tryJoinMatch = async (id, password) => {
    await hub.invoke('TryJoinMatch', id, password);
};
//# sourceMappingURL=gameCreatorHub.js.map