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
import * as Game from './models/Game.js';
elements.showFindMatch__button.addEventListener('click', () => {
    indexView.showFindMatch__container();
    indexView.hideCreateMatch__container();
});
elements.showCreateMatch__button.addEventListener('click', () => {
    const id = Guid.newGuid();
    indexView.setIdMatch__inputValue(id);
    indexView.setNameMatch__inputValue(id); //the name of the game is id by default
    indexView.hideFindMatch__container();
    indexView.showCreateMatch__container();
});
elements.findMatch__backButton.addEventListener('click', () => {
    indexView.hideFindMatch__container();
});
elements.createMatch_backButton.addEventListener('click', () => {
    indexView.hideCreateMatch__container();
});
elements.createMatch__button.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const id = indexView.getIdMatch__inputValue();
    const name = indexView.getNameMatch__inputValue();
    const password = indexView.getPasswordMatch__inputValue();
    yield gameHub.createGame(id, name, password);
    const gameUrl = Game.getGameUrl(id);
    window.location.href = gameUrl;
}));
//# sourceMappingURL=index.js.map