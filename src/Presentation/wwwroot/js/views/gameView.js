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
    if (status === GameStatus.waitForEnemy || status === GameStatus.waitForStart || status === GameStatus.enemyIsSelectingCharacter) {
        markup = `${status}<span> . . .</span>`;
    }
    else {
        markup = status;
    }
    elements.gamePanel__gameStatus.innerHTML = markup;
};
export const showGameStatus = () => {
    elements.gamePanel__gameStatus.classList.remove('d-none');
};
export const hideGameStatus = () => {
    elements.gamePanel__gameStatus.classList.add('d-none');
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
export const ShowGamePanel__startGameButton = () => {
    elements.gamePanel__startGameButton.classList.remove('d-none');
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
export const renderTheNotificationAboutEndTheGame = (gameSatus, characterName) => {
    const markup = `
        <div class="endgame-notification">     
            <p class="endgame-notification__status">${gameSatus}</p>
            <img class="endgame-notification__character-img d-block mx-auto" src="/images/characters/${characterName}.jpg" />
            <a class="btn endgame-notification__exit-button my-2" href="/">Exit</a>   
        </div>
    `;
    elements.game.insertAdjacentHTML('beforeend', markup);
};
export const renderTheNotificationAboutPausingTheGame = () => {
    const markup = `  
        <div class="game-pause-notification">
            <p>The game is paused, because enemy player left the game</p>
            <p id="game-pause-notification__status">wait for enemy<span> . . .</span></p>
        </div>
    `;
    elements.game.insertAdjacentHTML('beforeend', markup);
};
export const remvoeTheNotificationAboutPausingTheGame = () => {
    const notificationElement = elements.game.querySelector(`.${elementStrings.gamePauseNotification}`);
    if (notificationElement) {
        elements.game.removeChild(notificationElement);
    }
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
export const getSendMessages__sendMessageInputValue = () => {
    return elements.sendMessages__sendMessageInput.value;
};
export const clearSendMessages__sendMessagesInputValue = () => {
    elements.sendMessages__sendMessageInput.value = "";
};
export const renderMessage = (message, sender) => {
    const markup = `<p class="message text-break">${sender}: ${message}</p>`;
    elements.chatCommunicator__messages.insertAdjacentHTML('beforeend', markup);
};
export const activateChatCommunicator = () => {
    elements.chatCommunicator.classList.remove('disabled');
};
export const scrollMessagesContainerToBottom = () => {
    const scrollHeight = elements.chatCommunicator__messages.scrollHeight;
    const clientHeight = elements.chatCommunicator__messages.clientHeight;
    elements.chatCommunicator__messages.scrollTop = scrollHeight - clientHeight;
};
export const changeMuteOrUnmuteSoundsIconToVoloumeMute = () => {
    elements.muteOrUnmuteSoundsIcon.classList.remove('fa-volume-up');
    elements.muteOrUnmuteSoundsIcon.classList.add('fa-volume-mute');
};
export const changeMuteOrUnmuteSoundsButtonToVoloumeUp = () => {
    elements.muteOrUnmuteSoundsIcon.classList.remove('fa-volume-mute');
    elements.muteOrUnmuteSoundsIcon.classList.add('fa-volume-up');
};
//# sourceMappingURL=gameView.js.map