import { elements } from './views/base.js';
import * as gameView from './views/gameView.js';
elements.showChatCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
});
elements.chatCommunicator__hideCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
});
elements.gamePanel__startGameButton.addEventListener('click', () => {
    //zmien game status na started
    //zacznij gre, odliczanie czasu
});
//# sourceMappingURL=game.js.map