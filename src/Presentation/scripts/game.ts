import { elements, elementStrings } from './views/base.js';
import * as gameView from './views/gameView.js';
import * as gameHub from './gameHub.js';
import * as GameStatus from './models/GameStatus.js';
import { GameSounds } from './models/GameSounds.js';


document.addEventListener('DOMContentLoaded', (): void => {
    gameView.stickyRoundTime();
    GameSounds.startUp();
});

elements.showChatCommunicatorButton.addEventListener('click', (): void => {
    gameView.showOrHideChatCommunicator();
    gameView.scrollMessagesContainerToBottom();
});

elements.chatCommunicator__hideCommunicatorButton.addEventListener('click', (): void => {
    gameView.showOrHideChatCommunicator();
});

elements.gamePanel__startGameButton.addEventListener('click', (): void => {
    gameHub.startGame();
});

elements.gamePanel__finishTurnButton.addEventListener('click', async (): Promise<void> => {
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

elements.muteOrUnmuteSoundsButton.addEventListener('click', (): void => {
    if (GameSounds.soundsAreMuted) {
        gameView.changeMuteOrUnmuteSoundsButtonToVoloumeUp();   
        GameSounds.unmuteSounds();
    }
    else {
        gameView.changeMuteOrUnmuteSoundsIconToVoloumeMute();
        GameSounds.muteSounds();
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
        GameSounds.playCharacterSelectSound();
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

    characterButton.addEventListener('mouseover', (): void => {
        GameSounds.playCharacterHoverSound();
    });
});

document.addEventListener('scroll', (): void => {
    gameView.stickyRoundTime();
});

elements.sendMessages__sendMessageButton.addEventListener('click', async (): Promise<void> => {
    await trySendMessage();
    gameView.clearSendMessages__sendMessagesInputValue();
});

elements.sendMessages__sendMessageInput.addEventListener('keypress', async (): Promise<void> => {
    GameSounds.playKeyboardClickSound();
    const enterKey = 13;
    const clickedEnterKey = ((<KeyboardEvent>event).keyCode === enterKey && !(<KeyboardEvent>event).shiftKey) ? true : false;

    if (clickedEnterKey) {
        await trySendMessage();
        gameView.clearSendMessages__sendMessagesInputValue();
    }
});

const trySendMessage = async (): Promise<void> => {
    const message: string = gameView.getSendMessages__sendMessageInputValue();
    const inputIsNotEmpty = message.trim() ? true : false;
    const gameStatus: string = gameView.getGameStatus();

    if (inputIsNotEmpty && gameStatus !== GameStatus.waitForEnemy) {
        const sender = "You";
        gameView.renderMessage(message, sender);
        gameView.scrollMessagesContainerToBottom();
        await gameHub.sendMessageToEnemy(message);
    }
};

window.addEventListener('resize', gameView.scrollMessagesContainerToBottom);