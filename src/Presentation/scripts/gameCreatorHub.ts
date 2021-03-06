﻿declare var signalR: any;
import * as indexView from './views/homeView.js';
import { MatchListItem } from './models/MatchListItem.js';
import { navigateToMatchUrl } from './home.js';
import * as notificationSender from './views/notificationSender.js';


var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameCreatorHub')
    .build();


hub.on('SendNotificationAboutIncorrectPassword', (): void => {
    notificationSender.sendNotificationAboutIncorrectPassword();
});

hub.on('RecieveMatchUrl', (url: string): void => {
    navigateToMatchUrl(url);
});

hub.on('RecieveAndRenderListOfMatches', (matches: Array<MatchListItem>) => {
    indexView.renderMatchesInMatchList(matches);
});

hub.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});


export const createMatch = async (match: MatchListItem): Promise<void> => {
    await hub.invoke('CreateMatch', match);
};

export const refreshListOfGames = async (): Promise<void> => {
    await hub.invoke('GetMatchListItems');
};

export const tryJoinMatch = async (id: string, password: string): Promise<void> => {
    await hub.invoke('TryJoinMatch', id, password)
};
