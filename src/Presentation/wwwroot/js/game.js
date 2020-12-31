import { elements, elementStrings } from './views/base.js';
import * as gameView from './views/gameView.js';
import * as gameHub from './gameHub.js';
import * as CharacterStatus from './models/CharacterStatus.js';
elements.showChatCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
});
elements.chatCommunicator__hideCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
});
elements.gamePanel__startGameButton.addEventListener('click', () => {
    gameHub.startGame();
});
Array.from(elements.characterButtons).forEach(characterButton => {
    characterButton.addEventListener('click', (e) => {
        const gameStatus = gameView.getGameStatus();
        const characterElement = e.target.closest(`.${elementStrings.character}`);
        const characterSelectStatus = 'Select your character';
        if (gameStatus === characterSelectStatus) {
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