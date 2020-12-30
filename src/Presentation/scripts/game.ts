import { elements, elementStrings } from './views/base.js';
import * as gameView from './views/gameView.js';
import * as GameStatus from './models/GameStatus.js';
import * as gameHub from './gameHub.js';

elements.showChatCommunicatorButton.addEventListener('click', (): void => {
    gameView.showOrHideChatCommunicator();
});

elements.chatCommunicator__hideCommunicatorButton.addEventListener('click', (): void => {
    gameView.showOrHideChatCommunicator();
});

elements.gamePanel__startGameButton.addEventListener('click', (): void => {
    gameHub.startGame();
});

Array.from(elements.characterButtons).forEach(characterButton => {
    characterButton.addEventListener('click', (e: any): void => {
        const gameStatus: string = gameView.getGameStatus();

        if (gameStatus === GameStatus.CharacterSelect) {
            const character: HTMLEmbedElement = e.target.closest(`.${elementStrings.character}`);
            const characterName: string = character.querySelector(`.${elementStrings.characterName}`).textContent;

            const gameId = gameView.getGameIdInputValue();

            gameHub.selectCharacter(gameId, characterName);
        }
        else {
            //suspect
            //rejected
        }
    });
});
