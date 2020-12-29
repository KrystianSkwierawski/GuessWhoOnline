import { elements } from './base.js';
export const showOrHideChatCommunicator = () => {
    elements.chatCommunicator.classList.toggle('d-none');
    elements.showChatCommunicatorButton.classList.toggle('d-none');
};
export const getGameIdInputValue = () => {
    return elements.game__gameIdInput.value;
};
export const setGameStatus = (status) => {
    elements.gamePanel__gameStatus.textContent = status;
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
export const disableGameBoard = () => {
    elements.gameBoard.classList.add('disabled');
};
export const getGameStatus = () => {
    return elements.gamePanel__gameStatus.textContent;
};
//# sourceMappingURL=gameView.js.map