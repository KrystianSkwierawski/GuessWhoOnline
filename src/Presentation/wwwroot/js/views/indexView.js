var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { elements } from './base.js';
import { getGameFullUrl } from '../models/Game.js';
import { tryJoinMatch } from '../gameHub.js';
export const showFindMatchContainer = function () {
    elements.findMatch.classList.add('find-match_active');
};
export const hideFindMatchContainer = () => {
    elements.findMatch.classList.remove('find-match_active');
};
export const showCreateMatchContainer = () => {
    elements.createMatch.classList.add('create-match_active');
};
export const hideCreateMatchContainer = () => {
    elements.createMatch.classList.remove('create-match_active');
};
export const getNameMatchInputValue = () => {
    return elements.nameMatchInput.value;
};
export const getPasswordMatchInputValue = () => {
    return elements.passwordMatchInput.value;
};
const addEventListenerToMatchButton = (gameId) => {
    document.getElementById(gameId).addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const password = prompt('Password:');
        yield tryJoinMatch(gameId, password);
    }));
};
export const addGameToMatchList = (game) => {
    const gameFullUrl = getGameFullUrl(game.url);
    const gameHasPassword = (game.password === "") ? false : true;
    let markup;
    if (gameHasPassword) {
        markup = `<li><button id="${game.id}">${game.name}  <i class="fas fa-lock"></i></button></li>`;
        elements.matchList.insertAdjacentHTML('afterbegin', markup);
        addEventListenerToMatchButton(game.id);
    }
    else {
        markup = `<li><a href="${gameFullUrl}">${game.name}</a></li>`;
        elements.matchList.insertAdjacentHTML('afterbegin', markup);
    }
};
export const setIdMatchInputValue = (id) => {
    elements.idMatchInput.value = id;
};
export const getIdMatchInputValue = () => {
    return elements.idMatchInput.value;
};
export const setUrlMatchInputValue = (url) => {
    elements.urlMatchInput.value = url;
};
export const setNameMatchInputValue = (name) => {
    elements.nameMatchInput.value = name;
};
export const getUrlMatchInputValue = () => {
    return elements.urlMatchInput.value;
};
export const renderGamesInMatchList = (games) => {
    elements.matchList.innerHTML = "";
    games.forEach(game => {
        addGameToMatchList(game);
    });
};
export const displayNotificationAboutIncorrectPassword = () => {
    toastr["warning"]('Incorrect password');
};
//# sourceMappingURL=indexView.js.map