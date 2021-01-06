var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { elements, elementStrings } from './views/base.js';
import * as gameView from './views/gameView.js';
import * as gameHub from './gameHub.js';
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
elements.gamePanel__checkCharacterTypeButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const status = gameView.getGameStatus();
    if (status === GameStatus.yourTurn) {
        const selectedCharacterType = gameView.getCharacterTypeValue();
        yield gameHub.checkCharacterTypeAndEndTheGame(selectedCharacterType);
    }
}));
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
            gameView.changeCharacterStatus(characterButtonElement);
        }
    });
});
//# sourceMappingURL=game.js.map