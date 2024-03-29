﻿import { elements, elementStrings } from './base.js';
import { getMatchFullUrl, MatchListItem } from '../models/MatchListItem.js';
import { tryJoinMatch } from '../gameCreatorHub.js';


export const showFindMatchContainer = (): void => {
    elements.findMatch.classList.add('find-match_active');
};

export const addBlurToHome = (): void => {
    elements.home.classList.add('home_blured');
};

export const removeBlurFromHome = (): void => {
    elements.home.classList.remove('home_blured');
};

export const hideFindMatchContainer = (): void => {
    elements.findMatch.classList.remove('find-match_active');
};

export const showCreateMatchContainer = (): void => {
    elements.createMatch.classList.add('create-match_active');
};

export const hideCreateMatchContainer = (): void => {
    elements.home.classList.remove('home_blured');
    elements.createMatch.classList.remove('create-match_active');
};

export const showInformationsAboutGame = () => {
    elements.informationsAboutGame.classList.add('informations-about-game_active');
};

export const hideInformationsAboutGame = () => {
    elements.informationsAboutGame.classList.remove('informations-about-game_active');
};

export const getNameMatchInputValue = (): string => {
    return (<HTMLInputElement>elements.nameMatchInput).value;
};

export const getPasswordMatchInputValue = (): string => {
    return (<HTMLInputElement>elements.passwordMatchInput).value;
};

const addEventListenerToMatchButton = (matchId: string): void => {
    document.getElementById(matchId).addEventListener('click', async (): Promise<void> => {
        const password = prompt('Password:');

        if (password) {
            await tryJoinMatch(matchId, password);
        }
    });
};

export const addMatchToMatchList = (match: MatchListItem): void => {
    const gameUrl: string = getMatchFullUrl(match.url);
    let markup: string = `<li><a href="${gameUrl}">${match.name} ${match.numberOfConnections}/2 </a></li>`;

    const gameIsFull: boolean = match.numberOfConnections === 2;

    const gameHasPassword: boolean = !!match.password;

    if (gameHasPassword) {
        markup = `<li><button id="${match.id}">${match.name} ${match.numberOfConnections}/2  <i class="fas fa-lock"></i></button></li>`;
        elements.matchList.insertAdjacentHTML('afterbegin', markup);

        if (!gameIsFull) {
            addEventListenerToMatchButton(match.id);
        }

        return;
    }


    if (gameIsFull) {
        markup = `<li><button>${match.name} ${match.numberOfConnections}/2 </button></li>`;
    }

    elements.matchList.insertAdjacentHTML('afterbegin', markup);
    return;
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

export const changeMuteOrUnmuteSoundsIconToVoloumeMute = (): void => {
    elements.homeBottom__muteOrUnmuteSoundsIcon.classList.remove('fa-volume-up');
    elements.homeBottom__muteOrUnmuteSoundsIcon.classList.add('fa-volume-mute');
};

export const changeMuteOrUnmuteSoundsButtonToVoloumeUp = (): void => {
    elements.homeBottom__muteOrUnmuteSoundsIcon.classList.remove('fa-volume-mute');
    elements.homeBottom__muteOrUnmuteSoundsIcon.classList.add('fa-volume-up');
};




