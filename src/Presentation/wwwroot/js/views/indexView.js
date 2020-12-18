import { elements } from './base.js';
import { getGameFullUrl } from '../models/Game.js';
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
export const addGameToMatchList = (game) => {
    const gameFullUrl = getGameFullUrl(game.url);
    const gameHasPassword = (game.password === "") ? false : true;
    let markup;
    if (gameHasPassword) {
        markup = `<li><button id="${game.id}">${game.name}  <i class="fas fa-lock"></i></button></li>`;
        elements.matchList.insertAdjacentHTML('afterbegin', markup);
        document.getElementById(game.id).addEventListener('click', () => {
            // zrob promt o haslo
            // Call GameHub czy haslo sie zgadza jezeli tak wysylasz bool ze sie zgadza razem z linkiem jezeli sie nie zgadza to zrob toastr z blednym haslem
        });
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
//# sourceMappingURL=indexView.js.map