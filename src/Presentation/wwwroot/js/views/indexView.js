import { elements } from './base.js';
export const showFindMatch__container = function () {
    elements.findMatch.classList.add('find-match_active');
};
export const hideFindMatch__container = function () {
    elements.findMatch.classList.remove('find-match_active');
};
export const showCreateMatch__container = function () {
    elements.createMatch.classList.add('create-match_active');
};
export const hideCreateMatch__container = function () {
    elements.createMatch.classList.remove('create-match_active');
};
export const getNameMatch__inputValue = function () {
    return elements.nameMatch__input.value;
};
export const getPasswordMatch__inputValue = function () {
    return elements.passwordMatch__input.value;
};
export const AddGameToMatchList = function (game) {
    console.log(game);
    /*const markup: string = `<li a href="./game/${game.id}">${game.name}</li>`;


    elements.matchList.insertAdjacentHTML('afterbegin', markup);*/
};
export const setIdMatch__inputValue = function (id) {
    elements.idMatch__input.value = id;
};
export const setNameMatch__inputValue = function (id) {
    elements.nameMatch__input.value = id;
};
export const getIdMatch__inputValue = function () {
    return elements.idMatch__input.value;
};
//# sourceMappingURL=indexView.js.map