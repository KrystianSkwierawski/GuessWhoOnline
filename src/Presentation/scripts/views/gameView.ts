import { elements, elementStrings } from './base.js';
import * as CharacterStatus from '../models/CharacterStatus.js';
import * as GameStatus from '../models/GameStatus.js';
declare var toastr: any

export const showOrHideChatCommunicator = (): void => {
    elements.chatCommunicator.classList.toggle('d-none');
    elements.showChatCommunicatorButton.classList.toggle('d-none');
};

export const getGameIdInputValue = (): string => {
    return (<HTMLInputElement>elements.game__gameIdInput).value;
};

export const setGameStatus = (status: string): void => {
    let markup: string;

    if (status === GameStatus.waitForEnemy || status === GameStatus.waitForStart || status === GameStatus.enemyIsSelectingCharacter) {
        markup = `${status}<span> . . .</span>`;
    }
    else {
        markup = status;
    }

    (<HTMLEmbedElement>elements.gamePanel__gameStatus).innerHTML = markup;
};

export const showOrHideStartGameButton = (): void => {
    (<HTMLEmbedElement>elements.gamePanel__startGameButton).classList.toggle('d-none');
};

export const showOrHideGameStatus = (): void => {
    (<HTMLEmbedElement>elements.gamePanel__gameStatus).classList.toggle('d-none');
};

export const activateGameBoard = (): void => {
    (<HTMLEmbedElement>elements.gameBoard).classList.remove('disabled');
};

export const activateGamePanel = (): void => {
    (<HTMLEmbedElement>elements.gamePanel).classList.remove('disabled');
};

export const disableGamePanel = (): void => {
    (<HTMLEmbedElement>elements.gamePanel).classList.add('disabled');
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

export const setYourCharacterImg = (characterName: string): void => {
    (<HTMLEmbedElement>elements.gamePanel__yourCharacterImg).src = `/images/characters/${characterName}.jpg`;
};

export const updateGamePanel__roundTime = (time: number): void => {
    (<HTMLElement>elements.gamePanel__roundTime).textContent = `00:${time}`;
};

export const changeCharacterStatusToRejected = (characterButtonElement: HTMLEmbedElement): void => {
    const markup: string = `<img class="character-status" id="${CharacterStatus.rejected}" src="/images/character-statuses/rejected.png"/>`;
    characterButtonElement.insertAdjacentHTML('beforeend', markup);
};

export const changeCharacterStatusToSuspect = (characterButtonElement: HTMLEmbedElement): void => {
    const markup: string = `<img class="character-status" id="${CharacterStatus.suspect}" src="/images/character-statuses/suspect.png"/>`;
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

export const renderEndGameNotification = (gameSatus: string, characterName: string) => {
    const markup: string = `
    <div class="endgame-notification">     
        <p class="endgame-notification__status">${gameSatus}</p>
        <img class="endgame-notification__character-img d-block mx-auto" src="/images/characters/${characterName}.jpg" />
        <a class="btn endgame-notification__exit-button my-2" href="/">Exit</a>   
    </div>
    `;

    elements.game.insertAdjacentHTML('beforeend', markup);
};

export const changeCharacterStatus = (characterButtonElement: HTMLEmbedElement): void => {
    const characterStatusElement: HTMLEmbedElement = characterButtonElement.querySelector(`.${elementStrings.characterStatus}`);

    if (!characterStatusElement) { //if character has no status
        changeCharacterStatusToRejected(characterButtonElement);
        return;
    }

    const isRejected: boolean = (characterStatusElement.id === CharacterStatus.rejected);
    const isSuspect: boolean = (characterStatusElement.id === CharacterStatus.suspect);

    if (isRejected) {
        //remove old character status
        removeCharacterStatus(characterButtonElement);

        changeCharacterStatusToSuspect(characterButtonElement);
    }
    else if (isSuspect) {
        removeCharacterStatus(characterButtonElement);
    }
};


export const displayNotificationAboutNotChoosedCharacter = (): void => {
    toastr["info"]("Choose character to guess");
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

export const activateChatCommunicator = (): void => {
    (<HTMLEmbedElement>elements.chatCommunicator).classList.remove('disabled');
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











