import { elements, elementStrings } from './base.js';
import { getGameUrl, Game } from '../models/Game.js';

export const showFindMatch__container = function (): void {
    elements.findMatch.classList.add('find-match_active');
};

export const hideFindMatch__container = (): void => {
    elements.findMatch.classList.remove('find-match_active');
};

export const showCreateMatch__container = (): void => {
    elements.createMatch.classList.add('create-match_active');
};

export const hideCreateMatch__container = (): void  =>{
    elements.createMatch.classList.remove('create-match_active');
};

export const getNameMatch__inputValue = (): string => {
    return (<HTMLInputElement>elements.nameMatch__input).value;
}

export const getPasswordMatch__inputValue = (): string => {
    return (<HTMLInputElement>elements.passwordMatch__input).value;
};

export const addGameToMatchList = (game: Game): void => {
    const gameUrl: string = getGameUrl(game.id);

    const gameHasPassword: boolean = (game.password === "") ? false : true;

    let markup: string;
    if (gameHasPassword) {
        markup = `<li><a href="${gameUrl}">${game.name}</a></li>`;
        // TODO:  jak jest halslo to zrob buttona ktory ma ikonki klodki, odpala promt i sprawdza haslo, jezeli sie zgadza do kierujesz go do gamehuba i szukasz gre z danymi context.id hosta i hasla, zwracasz url i wchodzisz do gry. zaczynasz nasluchiwac buttona po swotrzeniu go.
    }
    else {
        markup = `<li><a href="${gameUrl}">${game.name}</a></li>`;
    }

    elements.matchList.insertAdjacentHTML('afterbegin', markup);
};

export const setIdMatch__inputValue = (id: string): void => {
    (<HTMLInputElement>elements.idMatch__input).value = id;
};

export const setNameMatch__inputValue = (id: string): void => {
    (<HTMLInputElement>elements.nameMatch__input).value = id;
};

export const getIdMatch__inputValue = (): string => {
    return (<HTMLInputElement>elements.idMatch__input).value;
};

export const renderGamesInMatchList = (games: Array<Game>): void => {
    elements.matchList.innerHTML = "";

    games.forEach(game => {
        addGameToMatchList(game);
    });
};



