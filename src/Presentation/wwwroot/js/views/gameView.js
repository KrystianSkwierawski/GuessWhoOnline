import { elements } from './base.js';
export const showOrHideChatCommunicator = () => {
    elements.chatCommunicator.classList.toggle('d-none');
    elements.showChatCommunicatorButton.classList.toggle('d-none');
};
export const getGameIdInputValue = () => {
    return elements.game__gameIdInput.value;
};
export const setGameStatusToWaitForStart = () => {
    const status = 'Wait for start';
    elements.gamePanel__gameStatus.textContent = status;
};
export const showOrHideStartGameButton = () => {
    elements.gamePanel__startGameButton.classList.toggle('d-none');
};
export const showOrHideGameStatus = () => {
    elements.gamePanel__gameStatus.classList.toggle('d-none');
};
//# sourceMappingURL=gameView.js.map