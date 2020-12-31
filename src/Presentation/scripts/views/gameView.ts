import { elements, elementStrings } from './base.js';
import * as GameStatus from '../models/CharacterStatus.js';

export const showOrHideChatCommunicator = (): void => {
    elements.chatCommunicator.classList.toggle('d-none');
    elements.showChatCommunicatorButton.classList.toggle('d-none');
};

export const getGameIdInputValue = (): string => {
    return (<HTMLInputElement>elements.game__gameIdInput).value;
};

export const setGameStatus = (status: string): void => {
    elements.gamePanel__gameStatus.textContent = status;
};

export const showOrHideStartGameButton = (): void => {
    elements.gamePanel__startGameButton.classList.toggle('d-none');
};

export const showOrHideGameStatus = (): void => {
    elements.gamePanel__gameStatus.classList.toggle('d-none');
};

export const activateGameBoard = (): void => {
    elements.gameBoard.classList.remove('disabled');
};

export const activateGamePanel = (): void => {
    elements.gamePanel.classList.remove('disabled');
};

export const disableGamePanel = (): void => {
    elements.gamePanel.classList.add('disabled');
};

export const disableGameBoard = (): void => {
    elements.gameBoard.classList.add('disabled');
};

export const getGameStatus = (): string => {
    return (<HTMLEmbedElement>elements.gamePanel__gameStatus).textContent;
};

export const setYourCharacterName = (characterName: string): void => {
    elements.gamePanel__yourCharacterName.textContent = characterName;
};

export const HideGamePanel__startGameButton = (): void => {
    elements.gamePanel__startGameButton.classList.add('d-none');
};

export const setYourCharacterImg = (characterName: string): void => {
    (<HTMLEmbedElement>elements.gamePanel__yourCharacterImg).src = `/images/characters/${characterName}.jpg`;
};

export const updateGamePanel__roundTime = (time: number): void => {
    (<HTMLElement>elements.gamePanel__roundTime).textContent = `00:${time}`;
};

export const changeCharacterStatusToRejected = (characterButtonElement: HTMLEmbedElement): void => {
    const markup: string = `<img class="character-status" id="${GameStatus.rejected}" src="/images/character-statuses/rejected.png"/>`;
    characterButtonElement.insertAdjacentHTML('beforeend', markup);
};

export const changeCharacterStatusToSuspect = (characterButtonElement: HTMLEmbedElement): void => {
    const markup: string = `<img class="character-status" id="${GameStatus.suspect}" src="/images/character-statuses/suspect.png"/>`;
    characterButtonElement.insertAdjacentHTML('beforeend', markup);
};

export const removeCharacterStatus = (characterButtonElement: HTMLEmbedElement): void => {
    const characterStatus: HTMLEmbedElement = characterButtonElement.querySelector(`.${elementStrings.characterStatus}`);
    characterButtonElement.removeChild(characterStatus);
};

