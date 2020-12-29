﻿import { elements, elementStrings } from './base.js';

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

export const disableGameBoard = (): void => {
    elements.gameBoard.classList.add('disabled');
};

export const getGameStatus = (): string => {
    return (<HTMLEmbedElement>elements.gamePanel__gameStatus).textContent;
};

