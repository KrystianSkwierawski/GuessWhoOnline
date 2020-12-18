import { elements, elementStrings } from './base.js';
import { getGameUrl, Game } from '../models/Game.js';

export const showFindMatchContainer = function (): void {
    elements.findMatch.classList.add('find-match_active');
};

export const hideFindMatchContainer = (): void => {
    elements.findMatch.classList.remove('find-match_active');
};

export const showCreateMatchContainer = (): void => {
    elements.createMatch.classList.add('create-match_active');
};

export const hideCreateMatchContainer = (): void  =>{
    elements.createMatch.classList.remove('create-match_active');
};

export const getNameMatchInputValue = (): string => {
    return (<HTMLInputElement>elements.nameMatchInput).value;
}

export const getPasswordMatchInputValue = (): string => {
    return (<HTMLInputElement>elements.passwordMatchInput).value;
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

export const setIdMatchInputValue = (id: string): void => {
    (<HTMLInputElement>elements.idMatchInput).value = id;
};

export const setNameMatchInputValue = (id: string): void => {
    (<HTMLInputElement>elements.nameMatchInput).value = id;
};

export const getIdMatchInputValue = (): string => {
    return (<HTMLInputElement>elements.idMatchInput).value;
};

export const renderGamesInMatchList = (games: Array<Game>): void => {
    elements.matchList.innerHTML = "";

    games.forEach(game => {
        addGameToMatchList(game);
    });
};



