﻿declare var toastr: any
import { elements, elementStrings } from './base.js';
import { getMatchFullUrl, MatchListItem } from '../models/MatchListItem.js';
import { tryJoinMatch } from '../gameCreatorHub.js';


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

const addEventListenerToMatchButton =  (matchId: string): void => {
    document.getElementById(matchId).addEventListener('click', async (): Promise<void> => {
        const password = prompt('Password:');

        if (password) {
            await tryJoinMatch(matchId, password);
        }     
    });
};

export const addMatchToMatchList = (match: MatchListItem): void => {
    const gameFullUrl: string = getMatchFullUrl(match.url);

    const gameHasPassword: boolean = (match.password === "") ? false : true;

    let markup: string;
    if (gameHasPassword) {
        markup = `<li><button id="${match.id}">${match.name}  <i class="fas fa-lock"></i></button></li>`;
        elements.matchList.insertAdjacentHTML('afterbegin', markup);

        addEventListenerToMatchButton(match.id);      
    }
    else {
        markup = `<li><a href="${gameFullUrl}">${match.name}</a></li>`;
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

export const renderMatchesInMatchList = (matches: Array<MatchListItem>): void => {
    elements.matchList.innerHTML = "";

    matches.forEach(match => {
        addMatchToMatchList(match);
    });
};

export const displayNotificationAboutIncorrectPassword = (): void => {
    toastr["warning"]('Incorrect password');
};


