import { elements, elementStrings } from './views/base.js';
import * as gameView from './views/gameView.js';

elements.showChatCommunicatorButton.addEventListener('click', (): void => {
    gameView.showOrHideChatCommunicator();
});

elements.chatCommunicator__hideCommunicatorButton.addEventListener('click', (): void => {
    gameView.showOrHideChatCommunicator();
});

elements.gamePanel__startGameButton.addEventListener('click', (): void => {
    //zmien game status na started
    //zacznij gre, odliczanie czasu
});
