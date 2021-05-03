import { elements, elementStrings } from './base.js';
import * as CharacterStatus from '../models/CharacterStatus.js';
import * as GameStatus from '../models/GameStatus.js';
import { addEventListenerToVoteToRestartGameButton } from '../game.js';

export const showOrHideChatCommunicator = (): void => {
    elements.chatCommunicator.classList.toggle('d-none');
    elements.showChatCommunicatorButton.classList.toggle('d-none');
    elements.gamePanel.classList.toggle('game-panel_chat-communicator-is-hidden');
};

export const getGameIdInputValue = (): string => {
    return (<HTMLInputElement>elements.game__gameIdInput).value;
};

export const setGameStatus = (status: string): void => {
    let markup: string;

    if (status === GameStatus.waitForOpponent || status === GameStatus.waitForStart || status === GameStatus.opponentIsSelectingCharacter) {
        markup = `${status}<span> . . .</span>`;
    }
    else {
        markup = status;
    }

    (<HTMLEmbedElement>elements.gamePanel__gameStatus).innerHTML = markup;
};

export const showGameStatus = (): void => {
    (<HTMLEmbedElement>elements.gamePanel__gameStatus).classList.remove('d-none');
};

export const hideGameStatus = (): void => {
    (<HTMLEmbedElement>elements.gamePanel__gameStatus).classList.add('d-none');
};

export const activateGameBoard = (): void => {
    (<HTMLEmbedElement>elements.gameBoard).classList.remove('disabled');
};

export const activateGamePanel = (): void => {
    (<HTMLEmbedElement>elements.gamePanel__menu).classList.remove('disabled');
};

export const disableGamePanel = (): void => {
    (<HTMLEmbedElement>elements.gamePanel__menu).classList.add('disabled');
};

export const disableGameBoard = (): void => {
    (<HTMLEmbedElement>elements.gameBoard).classList.add('disabled');
};

export const getGameStatus = (): string => {
    return (<HTMLEmbedElement>elements.gamePanel__gameStatus).textContent;
};

export const setYourCharacterName = (characterName: string): void => {
    (<HTMLEmbedElement>elements.gamePanel__yourCharacterName).textContent = characterName;
};

export const HideGamePanel__startGameButton = (): void => {
    (<HTMLEmbedElement>elements.gamePanel__startGameButton).classList.add('d-none');
};

export const ShowGamePanel__startGameButton = (): void => {
    (<HTMLEmbedElement>elements.gamePanel__startGameButton).classList.remove('d-none');
};

export const setYourCharacterImg = (characterName: string): void => {
    (<HTMLEmbedElement>elements.gamePanel__yourCharacterImg).src = `/images/characters/${characterName}.webp`;
};

export const updateGamePanel__roundTime = (time: number): void => {
    const o_timeString: string = secondsToMMSS(time);

    (<HTMLElement>elements.gamePanel__roundTime).textContent = o_timeString;
};

const secondsToMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(":");
}

export const changeCharacterStatusToRejected = (characterButtonElement: HTMLEmbedElement): void => {
    const markup: string = `<img class="character-status" id="${CharacterStatus.rejected}" src="/images/character-statuses/rejected.webp" alt="${CharacterStatus.rejected}"/>`;
    characterButtonElement.insertAdjacentHTML('beforeend', markup);
};

export const changeCharacterStatusToSuspect = (characterButtonElement: HTMLEmbedElement): void => {
    const markup: string = `<img class="character-status" id="${CharacterStatus.suspect}" src="/images/character-statuses/suspect.webp" alt="${CharacterStatus.suspect}"/>`;
    characterButtonElement.insertAdjacentHTML('beforeend', markup);
};

export const removeCharacterStatus = (characterButtonElement: HTMLEmbedElement): void => {
    const characterStatus: HTMLEmbedElement = characterButtonElement.querySelector(`.${elementStrings.characterStatus}`);
    characterButtonElement.removeChild(characterStatus);
};

export const getCharacterTypeValue = (): string => {
    const e = <HTMLSelectElement>elements.gamePanel__characterType;

    return e.options[e.selectedIndex].text;
};

export const renderTheNotificationAboutEndTheGame = (gameSatus: string, characterName: string): void => {
    const markup: string = `
        <div class="endgame-notification">     
            <p class="endgame-notification__status">${gameSatus}</p>
            <img class="endgame-notification__character-img d-block mx-auto" src="/images/characters/${characterName}.webp" alt="${characterName}"/>
            <button class="btn btn-primary endgame-notification__vote-to-restart-game-button">Vote to reastart the game</button>
            <a class="btn endgame-notification__exit-button my-2" href="/">Exit</a>   
        </div>
    `;

    elements.game.insertAdjacentHTML('beforeend', markup);

    addEventListenerToVoteToRestartGameButton();
};

export const disableVoteToRestartGameButton = (): void => {
    const restartGameButton: HTMLButtonElement = document.querySelector(`.${elementStrings.endgameNotification__voteToRestartGameButton}`);
    restartGameButton.disabled = true;
};

export const removeTheNotificationAboutEndTheGame = (): void => {
    const endgameNotification: HTMLEmbedElement = document.querySelector(`.${elementStrings.endgameNotification}`);
    endgameNotification.parentNode.removeChild(endgameNotification);
};

export const renderTheNotificationAboutPausingTheGame = (): void => {
    const markup: string = `  
        <div class="game-pause-notification">
            <p>The game is paused, because opponent player left the game</p>
            <p id="game-pause-notification__status">wait for opponent<span> . . .</span></p>
        </div>
    `;

    elements.game.insertAdjacentHTML('beforeend', markup);
};

export const remvoeTheNotificationAboutPausingTheGame = (): void => {
    const notificationElement: HTMLEmbedElement = elements.game.querySelector(`.${elementStrings.gamePauseNotification}`);
    if (notificationElement) {
        elements.game.removeChild(notificationElement);
    }
}

export const changeCharacterStatus = (characterButtonElement: HTMLEmbedElement, characterName: string): void => {
    const characterStatusElement: HTMLEmbedElement = characterButtonElement.querySelector(`.${elementStrings.characterStatus}`);

    if (!characterStatusElement) { //if character has no status
        removeCharacterOptionFromGamePanel__characterType(characterName);
        changeCharacterStatusToRejected(characterButtonElement);
        return;
    }

    const isRejected: boolean = (characterStatusElement.id === CharacterStatus.rejected);
    const isSuspect: boolean = (characterStatusElement.id === CharacterStatus.suspect);

    if (isRejected) {
        //remove old character status
        removeCharacterStatus(characterButtonElement);
        changeCharacterStatusToSuspect(characterButtonElement);

        addCharacterOptionFromGamePanel__characterType(characterName);
    }
    else if (isSuspect) {
        removeCharacterStatus(characterButtonElement);
    }
};

const removeCharacterOptionFromGamePanel__characterType = (characterName: string): void => {
    const optionElement: any = elements.gamePanel__characterType.querySelector(`#character-type_${characterName}`);
    elements.gamePanel__characterType.removeChild(optionElement);
};

const addCharacterOptionFromGamePanel__characterType = (characterName: string): void => {
    const markup: string = `<option value="${characterName}" id="character-type_${characterName}">${characterName}</option>`;
    elements.gamePanel__characterType.insertAdjacentHTML('beforeend', markup);
};

export const stickyRoundTime = (): void => {
    const scrollY: number = (<any>window).scrollY - 20;
    const finishTurnButtonTop: number = (<HTMLEmbedElement>elements.gamePanel__finishTurnButton).offsetTop;

    if (scrollY > finishTurnButtonTop) {
        elements.gamePanel__roundTime.classList.add('game-panel__round-time_sticky');
    }
    else {
        elements.gamePanel__roundTime.classList.remove('game-panel__round-time_sticky');
    }
}

export const getSendMessages__sendMessageInputValue = (): string => {
    return (<HTMLInputElement>elements.sendMessages__sendMessageInput).value;
};

export const clearSendMessages__sendMessagesInputValue = (): void => {
    (<HTMLInputElement>elements.sendMessages__sendMessageInput).value = "";
};

export const renderMessage = (message: string, sender: string): void => {
    const markup: string = `<p class="message text-break">${sender}: ${message}</p>`;

    (<HTMLEmbedElement>elements.chatCommunicator__messages).insertAdjacentHTML('beforeend', markup);
};

export const scrollMessagesContainerToBottom = (): void => {
    const scrollHeight = (<HTMLEmbedElement>elements.chatCommunicator__messages).scrollHeight
    const clientHeight = (<HTMLEmbedElement>elements.chatCommunicator__messages).clientHeight;

    (<HTMLEmbedElement>elements.chatCommunicator__messages).scrollTop = scrollHeight - clientHeight;
};

export const changeMuteOrUnmuteSoundsIconToVoloumeMute = (): void => {
    elements.muteOrUnmuteSoundsIcon.classList.remove('fa-volume-up');
    elements.muteOrUnmuteSoundsIcon.classList.add('fa-volume-mute');
};

export const changeMuteOrUnmuteSoundsButtonToVoloumeUp = (): void => {
    elements.muteOrUnmuteSoundsIcon.classList.remove('fa-volume-mute');
    elements.muteOrUnmuteSoundsIcon.classList.add('fa-volume-up');
};

export const restartGameBoard = (): void => {
    const characterStatuses = document.querySelectorAll(`.${elementStrings.characterStatus}`);

    Array.from(characterStatuses).forEach(characterStatus => {
        const parentNodeElement: Node = characterStatus.parentNode;
        parentNodeElement.removeChild(characterStatus);
    });
};

export const restartGamePanel = (): void => {
    (<HTMLImageElement>elements.gamePanel__yourCharacterImg).src = "/images/square.webp";
    (<HTMLEmbedElement>elements.gamePanel__yourCharacterName).textContent = "";
    const defaultCharacterTypeIndex: number = 0;
    (<HTMLSelectElement>elements.gamePanel__characterType).selectedIndex = defaultCharacterTypeIndex;
    updateGamePanel__roundTime(60);
};









