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
export const showFindMatchContainer = () => {
    elements.findMatch.classList.add('find-match_active');
};
export const addBlurToHome = () => {
    elements.home.classList.add('home_blured');
};
export const removeBlurFromHome = () => {
    elements.home.classList.remove('home_blured');
};
export const hideFindMatchContainer = () => {
    elements.findMatch.classList.remove('find-match_active');
};
export const showCreateMatchContainer = () => {
    elements.createMatch.classList.add('create-match_active');
};
export const hideCreateMatchContainer = () => {
    elements.home.classList.remove('home_blured');
    elements.createMatch.classList.remove('create-match_active');
};
export const showInformationsAboutGame = () => {
    elements.informationsAboutGame.classList.add('informations-about-game_active');
};
export const hideInformationsAboutGame = () => {
    elements.informationsAboutGame.classList.remove('informations-about-game_active');
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
    const gameUrl = getMatchFullUrl(match.url);
    let markup = `<li><a href="${gameUrl}">${match.name} ${match.numberOfConnections}/2 </a></li>`;
    const gameIsFull = match.numberOfConnections === 2;
    const gameHasPassword = !!match.password;
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
export const changeMuteOrUnmuteSoundsIconToVoloumeMute = () => {
    elements.homeBottom__muteOrUnmuteSoundsIcon.classList.remove('fa-volume-up');
    elements.homeBottom__muteOrUnmuteSoundsIcon.classList.add('fa-volume-mute');
};
export const changeMuteOrUnmuteSoundsButtonToVoloumeUp = () => {
    elements.homeBottom__muteOrUnmuteSoundsIcon.classList.remove('fa-volume-mute');
    elements.homeBottom__muteOrUnmuteSoundsIcon.classList.add('fa-volume-up');
};
//# sourceMappingURL=homeView.js.map