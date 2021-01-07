import { elements, elementStrings } from './base.js';
import * as CharacterStatus from '../models/CharacterStatus.js';
import * as GameStatus from '../models/GameStatus.js';
export const showOrHideChatCommunicator = () => {
    elements.chatCommunicator.classList.toggle('d-none');
    elements.showChatCommunicatorButton.classList.toggle('d-none');
};
export const getGameIdInputValue = () => {
    return elements.game__gameIdInput.value;
};
export const setGameStatus = (status) => {
    let markup;
    if (status === GameStatus.characterSelect) {
        markup = status;
    }
    else {
        markup = `${status}<span> . . .</span>`;
    }
    elements.gamePanel__gameStatus.innerHTML = markup;
};
export const showOrHideStartGameButton = () => {
    elements.gamePanel__startGameButton.classList.toggle('d-none');
};
export const showOrHideGameStatus = () => {
    elements.gamePanel__gameStatus.classList.toggle('d-none');
};
export const activateGameBoard = () => {
    elements.gameBoard.classList.remove('disabled');
};
export const activateGamePanel = () => {
    elements.gamePanel.classList.remove('disabled');
};
export const disableGamePanel = () => {
    elements.gamePanel.classList.add('disabled');
};
export const disableGameBoard = () => {
    elements.gameBoard.classList.add('disabled');
};
export const getGameStatus = () => {
    return elements.gamePanel__gameStatus.textContent;
};
export const setYourCharacterName = (characterName) => {
    elements.gamePanel__yourCharacterName.textContent = characterName;
};
export const HideGamePanel__startGameButton = () => {
    elements.gamePanel__startGameButton.classList.add('d-none');
};
export const setYourCharacterImg = (characterName) => {
    elements.gamePanel__yourCharacterImg.src = `/images/characters/${characterName}.jpg`;
};
export const updateGamePanel__roundTime = (time) => {
    elements.gamePanel__roundTime.textContent = `00:${time}`;
};
export const changeCharacterStatusToRejected = (characterButtonElement) => {
    const markup = `<img class="character-status" id="${CharacterStatus.rejected}" src="/images/character-statuses/rejected.png"/>`;
    characterButtonElement.insertAdjacentHTML('beforeend', markup);
};
export const changeCharacterStatusToSuspect = (characterButtonElement) => {
    const markup = `<img class="character-status" id="${CharacterStatus.suspect}" src="/images/character-statuses/suspect.png"/>`;
    characterButtonElement.insertAdjacentHTML('beforeend', markup);
};
export const removeCharacterStatus = (characterButtonElement) => {
    const characterStatus = characterButtonElement.querySelector(`.${elementStrings.characterStatus}`);
    characterButtonElement.removeChild(characterStatus);
};
export const getCharacterTypeValue = () => {
    const e = elements.gamePanel__characterType;
    return e.options[e.selectedIndex].text;
};
export const renderEndGameNotification = (gameSatus) => {
    const markup = `
    <div class="endgame-notification">
        <p class="endgame-notification__status">${gameSatus}</p>
        <a class="btn endgame-notification__exit-button" href="/">Exit</a>
    </div>
    `;
    elements.game.insertAdjacentHTML('beforeend', markup);
};
export const changeCharacterStatus = (characterButtonElement) => {
    const characterStatusElement = characterButtonElement.querySelector(`.${elementStrings.characterStatus}`);
    if (!characterStatusElement) { //if character has no status
        changeCharacterStatusToRejected(characterButtonElement);
        return;
    }
    const isRejected = (characterStatusElement.id === CharacterStatus.rejected);
    const isSuspect = (characterStatusElement.id === CharacterStatus.suspect);
    if (isRejected) {
        //remove old character status
        removeCharacterStatus(characterButtonElement);
        changeCharacterStatusToSuspect(characterButtonElement);
    }
    else if (isSuspect) {
        removeCharacterStatus(characterButtonElement);
    }
};
export const displayNotificationAboutNotChoosedCharacter = () => {
    toastr["info"]("Choose character to guess");
};
export const stickyRoundTime = () => {
    const scrollY = window.scrollY - 20;
    const finishTurnButtonTop = elements.gamePanel__finishTurnButton.offsetTop;
    if (scrollY > finishTurnButtonTop) {
        elements.gamePanel__roundTime.classList.add('game-panel__round-time_sticky');
    }
    else {
        elements.gamePanel__roundTime.classList.remove('game-panel__round-time_sticky');
    }
};
//# sourceMappingURL=gameView.js.map