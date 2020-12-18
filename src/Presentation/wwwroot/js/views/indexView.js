import { elements } from './base.js';
import { getGameUrl } from '../models/Game.js';
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
    const gameUrl = getGameUrl(game.id);
    const gameHasPassword = (game.password === "") ? false : true;
    let markup;
    if (gameHasPassword) {
        markup = `<li><a href="${gameUrl}">${game.name}</a></li>`;
        // TODO:  jak jest halslo to zrob buttona ktory ma ikonki klodki, odpala promt i sprawdza haslo, jezeli sie zgadza do kierujesz go do gamehuba i szukasz gre z danymi context.id hosta i hasla, zwracasz url i wchodzisz do gry. zaczynasz nasluchiwac buttona po swotrzeniu go.
    }
    else {
        markup = `<li><a href="${gameUrl}">${game.name}</a></li>`;
    }
    elements.matchList.insertAdjacentHTML('afterbegin', markup);
};
export const setIdMatchInputValue = (id) => {
    elements.idMatchInput.value = id;
};
export const setNameMatchInputValue = (id) => {
    elements.nameMatchInput.value = id;
};
export const getIdMatchInputValue = () => {
    return elements.idMatchInput.value;
};
export const renderGamesInMatchList = (games) => {
    elements.matchList.innerHTML = "";
    games.forEach(game => {
        addGameToMatchList(game);
    });
};
//# sourceMappingURL=indexView.js.map