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
//# sourceMappingURL=gameView.js.map