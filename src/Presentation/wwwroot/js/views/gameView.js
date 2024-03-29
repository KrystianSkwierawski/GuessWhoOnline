import { elements, elementStrings } from './base.js';
import * as CharacterStatus from '../models/CharacterStatus.js';
import * as GameStatus from '../models/GameStatus.js';
import { addEventListenerToVoteToRestartGameButton } from '../game.js';
export const showOrHideChatCommunicator = () => {
    elements.chatCommunicator.classList.toggle('d-none');
    elements.showChatCommunicatorButton.classList.toggle('d-none');
    elements.gamePanel.classList.toggle('game-panel_chat-communicator-is-hidden');
};
export const getGameIdInputValue = () => {
    return elements.game__gameIdInput.value;
};
export const setGameStatus = (status) => {
    elements.gamePanel__gameStatus.innerHTML = status;
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
    elements.gamePanel__menu.classList.remove('disabled');
};
export const disableGamePanel = () => {
    elements.gamePanel__menu.classList.add('disabled');
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
    if (window.pepesMode) {
        const pepeSrc = document.querySelector(`.character-${characterName} .character-img`).src;
        elements.gamePanel__yourCharacterImg.src = pepeSrc;
        return;
    }
    elements.gamePanel__yourCharacterImg.src = `/assets/images/characters/${characterName}.webp`;
};
export const updateGamePanel__roundTime = (time) => {
    const o_timeString = secondsToMMSS(time);
    elements.gamePanel__roundTime.textContent = o_timeString;
};
const secondsToMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    return [minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(":");
};
export const changeCharacterStatusToRejected = (characterButtonElement) => {
    const markup = `<img class="character-status" id="${CharacterStatus.rejected}" src="/assets/images/character-statuses/rejected.webp" alt="${CharacterStatus.rejected}"/>`;
    characterButtonElement.insertAdjacentHTML('beforeend', markup);
};
export const changeCharacterStatusToSuspect = (characterButtonElement) => {
    const markup = `<img class="character-status" id="${CharacterStatus.suspect}" src="/assets/images/character-statuses/suspect.webp" alt="${CharacterStatus.suspect}"/>`;
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
    let imageSrc;
    if (window.pepesMode) {
        imageSrc = document.querySelector(`.character-${characterName} .character-img`).src;
    }
    else {
        imageSrc = `/assets/images/characters/${characterName}.webp`;
    }
    const markup = `
        <div class="endgame-notification">     
            <p class="endgame-notification__status">${gameSatus}</p>
            <img class="endgame-notification__character-img d-block mx-auto" src="${imageSrc}" alt="${characterName}"/>
            <button class="btn endgame-notification__vote-to-restart-game-button">Vote to reastart the game</button>
            <a class="btn btn-dark my-2" href="/">Exit</a>   
        </div>
    `;
    elements.game.insertAdjacentHTML('beforeend', markup);
    addEventListenerToVoteToRestartGameButton();
};
export const disableVoteToRestartGameButton = () => {
    const restartGameButton = document.querySelector(`.${elementStrings.endgameNotification__voteToRestartGameButton}`);
    restartGameButton.disabled = true;
};
export const removeTheNotificationAboutEndTheGame = () => {
    const endgameNotification = document.querySelector(`.${elementStrings.endgameNotification}`);
    endgameNotification.parentNode.removeChild(endgameNotification);
};
export const renderTheNotificationAboutPausingTheGame = () => {
    const markup = `  
        <div class="game-pause-notification">
            <p>The game was paused because the opponent player left the game, wait opponent to rejoin or leave the game.</p>
            <p id="game-pause-notification__status">Waiting for the opponent<span> . . .</span></p>
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
export const changeCharacterStatus = (characterButtonElement, characterName) => {
    const characterStatusElement = characterButtonElement.querySelector(`.${elementStrings.characterStatus}`);
    if (!characterStatusElement) { //if character has no status
        hideCharacterOptionFromGamePanel__characterType(characterName);
        changeCharacterStatusToRejected(characterButtonElement);
        return;
    }
    const isRejected = (characterStatusElement.id === CharacterStatus.rejected);
    const isSuspect = (characterStatusElement.id === CharacterStatus.suspect);
    if (isRejected) {
        //remove old character status
        removeCharacterStatus(characterButtonElement);
        changeCharacterStatusToSuspect(characterButtonElement);
        unhideCharacterOptionFromGamePanel__characterType(characterName);
        return;
    }
    if (isSuspect) {
        removeCharacterStatus(characterButtonElement);
        return;
    }
};
const hideCharacterOptionFromGamePanel__characterType = (characterName) => {
    const optionElement = elements.gamePanel__characterType.querySelector(`#character-type_${characterName}`);
    optionElement.hidden = true;
};
const unhideCharacterOptionFromGamePanel__characterType = (characterName) => {
    const optionElement = elements.gamePanel__characterType.querySelector(`#character-type_${characterName}`);
    optionElement.hidden = false;
};
export const stickyRoundTime = () => {
    const scrollY = window.scrollY - 20;
    const finishTurnButtonTop = elements.gamePanel__finishTurnButton.offsetTop;
    const stickyClass = "game-panel__round-time_sticky";
    if (scrollY < finishTurnButtonTop) {
        elements.gamePanel__roundTime.classList.remove(stickyClass);
        return;
    }
    const gameStatus = getGameStatus();
    if (gameStatus === GameStatus.oponnentTurn || gameStatus === GameStatus.yourTurn) {
        elements.gamePanel__roundTime.classList.add(stickyClass);
    }
};
export const stickyGameStatus = () => {
    const scrollY = window.scrollY - 20;
    const finishTurnButtonTop = elements.gamePanel__gameStatus.offsetTop;
    const stickyClass = "game-panel__game-status_sticky";
    if (scrollY > finishTurnButtonTop) {
        elements.gamePanel__gameStatus.classList.add(stickyClass);
    }
    else {
        elements.gamePanel__gameStatus.classList.remove(stickyClass);
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
export const restartGameBoard = () => {
    const characterStatuses = document.querySelectorAll(`.${elementStrings.characterStatus}`);
    Array.from(characterStatuses).forEach(characterStatus => {
        const parentNodeElement = characterStatus.parentNode;
        parentNodeElement.removeChild(characterStatus);
    });
};
const setDeafultCharacterType = () => {
    const defaultCharacterTypeIndex = 0;
    elements.gamePanel__characterType.selectedIndex = defaultCharacterTypeIndex;
};
const unhideCharacterTypeOptions = () => {
    elements.characterTypeOptions.forEach((option) => {
        option.hidden = false;
    });
};
const resetCharacterTypeElement = () => {
    setDeafultCharacterType();
    unhideCharacterTypeOptions();
};
const resetYourCharacter = () => {
    elements.gamePanel__yourCharacterImg.src = "/assets/images/square.webp";
    elements.gamePanel__yourCharacterName.textContent = "";
};
export const restartGamePanel = () => {
    resetYourCharacter();
    updateGamePanel__roundTime(60);
    resetCharacterTypeElement();
};
