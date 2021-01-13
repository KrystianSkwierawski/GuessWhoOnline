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
import { GameSounds } from './models/GameSounds.js';
import * as NotificationSender from './models/NotificationSender.js';
document.addEventListener('DOMContentLoaded', () => {
    gameView.stickyRoundTime();
    GameSounds.startUp();
});
elements.showChatCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
    gameView.scrollMessagesContainerToBottom();
});
elements.chatCommunicator__hideCommunicatorButton.addEventListener('click', () => {
    gameView.showOrHideChatCommunicator();
});
elements.gamePanel__startGameButton.addEventListener('click', () => {
    gameHub.startGame();
});
elements.gamePanel__finishTurnButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const status = gameView.getGameStatus();
    if (status === GameStatus.yourTurn) {
        gameHub.finishTheTurn();
    }
}));
elements.gamePanel__checkCharacterTypeButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const status = gameView.getGameStatus();
    if (status === GameStatus.yourTurn) {
        yield checkCharacterType();
    }
}));
elements.muteOrUnmuteSoundsButton.addEventListener('click', () => {
    if (GameSounds.soundsAreMuted) {
        gameView.changeMuteOrUnmuteSoundsButtonToVoloumeUp();
        GameSounds.unmuteSounds();
    }
    else {
        gameView.changeMuteOrUnmuteSoundsIconToVoloumeMute();
        GameSounds.muteSounds();
    }
});
const checkCharacterType = () => __awaiter(void 0, void 0, void 0, function* () {
    const selectedCharacterType = gameView.getCharacterTypeValue();
    const userSelectedAnyCharacter = (selectedCharacterType === 'Guess opponent character') ? false : true;
    if (userSelectedAnyCharacter) {
        yield gameHub.checkCharacterTypeAndEndTheGame(selectedCharacterType);
    }
    else {
        NotificationSender.sendNotificationAboutNotChoosedCharacter();
    }
});
Array.from(elements.characterButtons).forEach(characterButton => {
    characterButton.addEventListener('click', (e) => {
        GameSounds.playCharacterSelectSound();
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
    characterButton.addEventListener('mouseover', () => {
        GameSounds.playCharacterHoverSound();
    });
});
document.addEventListener('scroll', () => {
    gameView.stickyRoundTime();
});
elements.sendMessages__sendMessageButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield trySendMessage();
    gameView.clearSendMessages__sendMessagesInputValue();
}));
elements.sendMessages__sendMessageInput.addEventListener('keypress', () => __awaiter(void 0, void 0, void 0, function* () {
    GameSounds.playKeyboardClickSound();
    const enterKey = 13;
    const clickedEnterKey = (event.keyCode === enterKey && !event.shiftKey) ? true : false;
    if (clickedEnterKey) {
        yield trySendMessage();
        gameView.clearSendMessages__sendMessagesInputValue();
    }
}));
const trySendMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    const message = gameView.getSendMessages__sendMessageInputValue();
    const inputIsNotEmpty = message.trim() ? true : false;
    const gameStatus = gameView.getGameStatus();
    if (inputIsNotEmpty && gameStatus !== GameStatus.waitForOpponent) {
        const sender = "You";
        gameView.renderMessage(message, sender);
        gameView.scrollMessagesContainerToBottom();
        yield gameHub.sendMessageToOpponent(message);
    }
});
window.addEventListener('resize', gameView.scrollMessagesContainerToBottom);
export const addEventListenerToVoteToRestartGameButton = () => {
    document.querySelector(`.${elementStrings.endgameNotification__voteToRestartGameButton}`).addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        NotificationSender.sendVotingNotificationsToRestartTheGame();
        gameHub.voteToRestartGame();
        gameView.disableVoteToRestartGameButton();
    }));
};
//# sourceMappingURL=game.js.map