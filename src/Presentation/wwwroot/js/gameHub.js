var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as indexView from './views/indexView.js';
var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();
hub.on('RecieveAndRenderListOfMatches', (games) => {
    indexView.renderGamesInMatchList(games);
});
hub.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});
export const createGame = (game) => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('CreateGame', game.id, game.name, game.password);
});
export const refreshListOfGames = () => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('GetListOfGames');
});
//# sourceMappingURL=gameHub.js.map