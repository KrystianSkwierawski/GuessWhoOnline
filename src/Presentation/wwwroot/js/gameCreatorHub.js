var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as indexView from './views/homeView.js';
import { navigateToGameUrl } from './home.js';
var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameCreatorHub')
    .build();
hub.on('DisplayNotification', () => {
    indexView.displayNotificationAboutIncorrectPassword();
});
hub.on('RecieveGameUrl', (url) => {
    navigateToGameUrl(url);
});
hub.on('RecieveAndRenderListOfMatches', (games) => {
    indexView.renderGamesInMatchList(games);
});
hub.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});
export const createGame = (game) => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('CreateGame', game);
});
export const refreshListOfGames = () => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('GetListOfGames');
});
export const tryJoinMatch = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('TryJoinMatch', id, password);
});
//# sourceMappingURL=gameCreatorHub.js.map