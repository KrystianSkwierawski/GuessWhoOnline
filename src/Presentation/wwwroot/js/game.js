import { elements, elementStrings } from './views/base.js';
import * as gameView from './views/gameView.js';
import * as gameHub from './gameHub.js';
import * as CharacterStatus from './models/CharacterStatus.js';
import * as GameStatus from './models/GameStatus.js';
elements.showChatCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
});
elements.chatCommunicator__hideCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
});
elements.gamePanel__startGameButton.addEventListener('click', () => {
    gameHub.startGame();
});
elements.gamePanel__finishTurnButton.addEventListener('click', () => {
    const status = gameView.getGameStatus();
    if (status === GameStatus.yourTurn) {
        gameHub.finishTheTurn();
    }
});
//elements.gamePanel__checkCharacterTypeButton.addEventListener('click', (): void => {
//    const status = gameView.getGameStatus();
//    if (status === GameStatus.yourTurn) {
//        //sprawdz czy dobrze wybral i zakoncz gre
//    }
//});
Array.from(elements.characterButtons).forEach(characterButton => {
    characterButton.addEventListener('click', (e) => {
        const gameStatus = gameView.getGameStatus();
        const characterElement = e.target.closest(`.${elementStrings.character}`);
        if (gameStatus === GameStatus.characterSelect) {
            const characterName = characterElement.querySelector(`.${elementStrings.characterName}`).textContent;
            const gameId = gameView.getGameIdInputValue();
            gameHub.selectCharacter(gameId, characterName);
        }
        else {
            const characterButtonElement = characterElement.querySelector(`.${elementStrings.characterButton}`);
            changeCharacterStatus(characterButtonElement);
        }
    });
});
export const changeCharacterStatus = (characterButtonElement) => {
    const characterStatusElement = characterButtonElement.querySelector(`.${elementStrings.characterStatus}`);
    if (!characterStatusElement) { //if character has no status
        gameView.changeCharacterStatusToRejected(characterButtonElement);
        return;
    }
    const isRejected = (characterStatusElement.id === CharacterStatus.rejected);
    const isSuspect = (characterStatusElement.id === CharacterStatus.suspect);
    if (isRejected) {
        //remove old character status
        gameView.removeCharacterStatus(characterButtonElement);
        gameView.changeCharacterStatusToSuspect(characterButtonElement);
    }
    else if (isSuspect) {
        gameView.removeCharacterStatus(characterButtonElement);
    }
};
//# sourceMappingURL=game.js.map