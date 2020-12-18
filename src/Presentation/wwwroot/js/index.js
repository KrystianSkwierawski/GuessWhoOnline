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
import { elements } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameHub from './gameHub.js';
import { getGameFullUrl } from './models/Game.js';
elements.showFindMatchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield gameHub.refreshListOfGames();
    indexView.showFindMatchContainer();
    indexView.hideCreateMatchContainer();
}));
elements.showCreateMatchButton.addEventListener('click', () => {
    const id = Guid.newGuid();
    const url = Guid.newGuid();
    indexView.setIdMatchInputValue(id);
    indexView.setUrlMatchInputValue(url);
    indexView.setNameMatchInputValue(url); //the name of the game is id by default
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
    const gameId = indexView.getIdMatchInputValue();
    const gameUrl = indexView.getUrlMatchInputValue();
    const gameName = indexView.getNameMatchInputValue();
    const gamePassword = indexView.getPasswordMatchInputValue();
    const game = {
        id: gameId,
        url: gameUrl,
        name: gameName,
        password: gamePassword,
        hostPlayerConnectionId: null,
        guestPlayerhostConnectionId: null
    };
    yield gameHub.createGame(game);
    const fullGameUrl = getGameFullUrl(gameUrl);
    window.location.href = fullGameUrl;
}));
elements.findMatch__refreshList.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield gameHub.refreshListOfGames();
}));
//# sourceMappingURL=index.js.map