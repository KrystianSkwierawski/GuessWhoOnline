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
import { elements } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameCreatorHub from './gameCreatorHub.js';
import { getGameFullUrl } from './models/Game.js';
elements.showFindMatchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield gameCreatorHub.refreshListOfGames();
    indexView.showFindMatchContainer();
    indexView.hideCreateMatchContainer();
}));
elements.showCreateMatchButton.addEventListener('click', () => {
    const id = Guid.newGuid();
    const url = Guid.newGuid();
    indexView.setIdMatchInputValue(id);
    indexView.setUrlMatchInputValue(url);
    indexView.setNameMatchInputValue(id); //the name of the game is id by default
    indexView.hideFindMatchContainer();
    indexView.showCreateMatchContainer();
});
elements.findMatch__backButton.addEventListener('click', () => {
    indexView.hideFindMatchContainer();
});
elements.createMatch_backButton.addEventListener('click', () => {
    indexView.hideCreateMatchContainer();
});
elements.createMatchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield createGameObject();
    yield gameCreatorHub.createGame(game);
    navigateToGameUrl(game.url);
}));
elements.findMatch__refreshList.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield gameCreatorHub.refreshListOfGames();
}));
export const navigateToGameUrl = (url) => {
    const fullGameUrl = getGameFullUrl(url);
    window.location.href = fullGameUrl;
};
const createGameObject = () => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = indexView.getIdMatchInputValue();
    const gameUrl = indexView.getUrlMatchInputValue();
    const gameName = indexView.getNameMatchInputValue();
    const gamePassword = indexView.getPasswordMatchInputValue();
    // TODO: usun oba connectionId
    const game = {
        id: gameId,
        url: gameUrl,
        name: gameName,
        password: gamePassword,
        hostPlayerConnectionId: null,
        guestPlayerhostConnectionId: null
    };
    return game;
});
//# sourceMappingURL=home.js.map