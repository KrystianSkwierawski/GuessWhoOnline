var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { elements } from './base.js';
import { getMatchFullUrl } from '../models/MatchListItem.js';
import { tryJoinMatch } from '../gameCreatorHub.js';
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
const addEventListenerToMatchButton = (matchId) => {
    document.getElementById(matchId).addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const password = prompt('Password:');
        if (password) {
            yield tryJoinMatch(matchId, password);
        }
    }));
};
export const addMatchToMatchList = (match) => {
    const gameIsFull = (match.numberOfConnections === 2) ? true : false;
    const gameHasPassword = (match.password === "") ? false : true;
    let markup;
    if (gameHasPassword) {
        markup = `<li><button id="${match.id}">${match.name} ${match.numberOfConnections}/2  <i class="fas fa-lock"></i></button></li>`;
        elements.matchList.insertAdjacentHTML('afterbegin', markup);
        if (!gameIsFull) {
            addEventListenerToMatchButton(match.id);
        }
    }
    else {
        let gameUrl = "";
        if (gameIsFull) {
            gameUrl = "#";
        }
        else {
            gameUrl = getMatchFullUrl(match.url);
        }
        markup = `<li><a href="${gameUrl}">${match.name} ${match.numberOfConnections}/2 </a></li>`;
        elements.matchList.insertAdjacentHTML('afterbegin', markup);
    }
};
export const setIdMatchInputValue = (id) => {
    elements.idMatchInput.value = id;
};
export const getIdMatchInputValue = () => {
    return elements.idMatchInput.value;
};
export const setUrlMatchInputValue = (url) => {
    elements.urlMatchInput.value = url;
};
export const setNameMatchInputValue = (name) => {
    elements.nameMatchInput.value = name;
};
export const getUrlMatchInputValue = () => {
    return elements.urlMatchInput.value;
};
export const renderMatchesInMatchList = (matches) => {
    elements.matchList.innerHTML = "";
    matches.forEach(match => {
        addMatchToMatchList(match);
    });
};
//# sourceMappingURL=homeView.js.map