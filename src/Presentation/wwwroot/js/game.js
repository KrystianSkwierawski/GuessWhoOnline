import { elements } from './views/base.js';
import * as gameView from './views/gameView.js';
elements.showChatCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
});
elements.chatCommunicator__hideCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
});
//# sourceMappingURL=game.js.map