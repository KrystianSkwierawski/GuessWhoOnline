import { elements, elementStrings } from './base.js';

export const showOrHideChatCommunicator = (): void => {
    elements.chatCommunicator.classList.toggle('d-none');
    elements.showChatCommunicatorButton.classList.toggle('d-none');
};