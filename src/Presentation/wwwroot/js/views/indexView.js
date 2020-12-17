import { elements } from './base.js';
import { getGameUrl } from '../models/Game.js';
export const showFindMatch__container = function () {
    elements.findMatch.classList.add('find-match_active');
};
export const hideFindMatch__container = () => {
    elements.findMatch.classList.remove('find-match_active');
};
export const showCreateMatch__container = () => {
    elements.createMatch.classList.add('create-match_active');
};
export const hideCreateMatch__container = () => {
    elements.createMatch.classList.remove('create-match_active');
};
export const getNameMatch__inputValue = () => {
    return elements.nameMatch__input.value;
};
export const getPasswordMatch__inputValue = () => {
    return elements.passwordMatch__input.value;
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
export const setIdMatch__inputValue = (id) => {
    elements.idMatch__input.value = id;
};
export const setNameMatch__inputValue = (id) => {
    elements.nameMatch__input.value = id;
};
export const getIdMatch__inputValue = () => {
    return elements.idMatch__input.value;
};
export const renderGamesInMatchList = (games) => {
    elements.matchList.innerHTML = "";
    games.forEach(game => {
        addGameToMatchList(game);
    });
};
//# sourceMappingURL=indexView.js.map