import { elements, elementStrings } from './base.js';
import * as Game from '../models/Game.js';

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
    const gameUrl: string = Game.getGameUrl(game.id);  
    const markup: string = `<li><a href="${gameUrl}">${game.name}</a></li>`; // jezeli nie ma hasla to taki link

    // jak jest halslo to zrob buttona ktory ma ikonki klodki, odpala promt i sprawdza haslo, jezeli sie zgadza do kierujesz go do
    // gamehubn i szukasz gre z danymi context.id hosta i hasla, zwracasz url i wchodzisz do gry. zaczynasz nasluchiwac buttona po swotrzeniu go.


    elements.matchList.insertAdjacentHTML('afterbegin', markup);
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



