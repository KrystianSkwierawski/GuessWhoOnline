declare var toastr: any
import { elements, elementStrings } from './base.js';
import { getGameFullUrl, Game } from '../models/Game.js';
import { tryJoinMatch } from '../gameHub.js';


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

const addEventListenerToMatchButton =  (gameId: string): void => {
    document.getElementById(gameId).addEventListener('click', async (): Promise<void> => {
        const password = prompt('Password:');

        if (password) {
            await tryJoinMatch(gameId, password);
        }     
    });
};

export const addGameToMatchList = (game: Game): void => {
    const gameFullUrl: string = getGameFullUrl(game.url);

    const gameHasPassword: boolean = (game.password === "") ? false : true;

    let markup: string;
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



export const setIdMatchInputValue = (id: string): void => {
    (<HTMLInputElement>elements.idMatchInput).value = id;
};

export const getIdMatchInputValue = (): string => {
    return (<HTMLInputElement>elements.idMatchInput).value;
};


export const setUrlMatchInputValue = (url: string): void => {
    (<HTMLInputElement>elements.urlMatchInput).value = url;
};

export const setNameMatchInputValue = (name: string): void => {
    (<HTMLInputElement>elements.nameMatchInput).value = name;
};

export const getUrlMatchInputValue = (): string => {
    return (<HTMLInputElement>elements.urlMatchInput).value;
};

export const renderGamesInMatchList = (games: Array<Game>): void => {
    elements.matchList.innerHTML = "";

    games.forEach(game => {
        addGameToMatchList(game);
    });
};

export const displayNotificationAboutIncorrectPassword = (): void => {
    toastr["warning"]('Incorrect password');
};



