import { elements, elementStrings } from './base.js';

export const showFindMatch__container = function (): void {
    elements.findMatch.classList.add('find-match_active');
};

export const hideFindMatch__container = function (): void {
    elements.findMatch.classList.remove('find-match_active');
};

export const showCreateMatch__container = function (): void {
    elements.createMatch.classList.add('create-match_active');
};

export const hideCreateMatch__container = function (): void {
    elements.createMatch.classList.remove('create-match_active');
};

export const getNameMatch__inputValue = function (): string {
    return (<HTMLInputElement>elements.nameMatch__input).value;
}

export const getPasswordMatch__inputValue = function (): string {
    return (<HTMLInputElement>elements.passwordMatch__input).value;
};

export const AddGameToMatchList = function (game): void {
    console.log(game);
    /*const markup: string = `<li a href="./game/${game.id}">${game.name}</li>`;


    elements.matchList.insertAdjacentHTML('afterbegin', markup);*/
};

export const setIdMatch__inputValue = function (id: string): void {   
    (<HTMLInputElement>elements.idMatch__input).value = id;
};

export const setNameMatch__inputValue = function (id: string): void {
    (<HTMLInputElement>elements.nameMatch__input).value = id;
};

export const getIdMatch__inputValue = function (): string {
    return (<HTMLInputElement>elements.idMatch__input).value;
};



