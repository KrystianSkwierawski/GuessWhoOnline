import { elements, elementStrings } from './views/base.js';
import * as gameView from './views/gameView.js';
import * as gameHub from './gameHub.js';
import * as CharacterStatus from './models/CharacterStatus.js';
import * as GameStatus from './models/GameStatus.js';

document.addEventListener('DOMContentLoaded', (): void => {
    gameView.stickyRoundTime();
});

elements.showChatCommunicatorButton.addEventListener('click', (): void => {
    gameView.showOrHideChatCommunicator();
});

elements.chatCommunicator__hideCommunicatorButton.addEventListener('click', (): void => {
    gameView.showOrHideChatCommunicator();
});

elements.gamePanel__startGameButton.addEventListener('click', (): void => {
    gameHub.startGame();
});

elements.gamePanel__finishTurnButton.addEventListener('click', (): void => {
    const status = gameView.getGameStatus();

    if (status === GameStatus.yourTurn) {
        gameHub.finishTheTurn();
    }
});

elements.gamePanel__checkCharacterTypeButton.addEventListener('click', async (): Promise<void> => {
    const status = gameView.getGameStatus();

    if (status === GameStatus.yourTurn) {
       await checkCharacterType();
    }
});

const checkCharacterType = async (): Promise<void> => {
    const selectedCharacterType: string = gameView.getCharacterTypeValue();

    const userSelectedAnyCharacter: boolean = (selectedCharacterType === 'Guess enemy character') ? false : true;
    if (userSelectedAnyCharacter) {
        await gameHub.checkCharacterTypeAndEndTheGame(selectedCharacterType);
    }
    else {
        gameView.displayNotificationAboutNotChoosedCharacter();
    }
};

Array.from(elements.characterButtons).forEach(characterButton => {
    characterButton.addEventListener('click', (e: any): void => {
        const gameStatus: string = gameView.getGameStatus();
        const characterElement: HTMLEmbedElement = e.target.closest(`.${elementStrings.character}`);

        if (gameStatus === GameStatus.characterSelect) {
            const characterName: string = characterElement.querySelector(`.${elementStrings.characterName}`).textContent;

            const gameId = gameView.getGameIdInputValue();

            gameHub.selectCharacter(gameId, characterName);
        }
        else {
            const characterButtonElement: HTMLEmbedElement = characterElement.querySelector(`.${elementStrings.characterButton}`);
            gameView.changeCharacterStatus(characterButtonElement);
        }
    });
});

document.addEventListener('scroll', (): void => {
    gameView.stickyRoundTime();
});

