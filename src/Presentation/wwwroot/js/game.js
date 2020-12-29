import { elements, elementStrings } from './views/base.js';
import * as gameView from './views/gameView.js';
import * as GameStatus from './models/GameStatus.js';
import * as gameHub from './gameHub.js';
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
Array.from(elements.characterButtons).forEach(characterButton => {
    characterButton.addEventListener('click', (e) => {
        const gameStatus = gameView.getGameStatus();
        switch (gameStatus) {
            case GameStatus.CharacterSelect:
                const character = e.target.closest(`.${elementStrings.character}`);
                const characterName = character.querySelector(`.${elementStrings.characterName}`).textContent;
                const gameId = gameView.getGameIdInputValue();
                gameHub.selectCharacter(gameId, characterName);
                break;
            default:
                console.log('asd');
        }
    });
});
//# sourceMappingURL=game.js.map