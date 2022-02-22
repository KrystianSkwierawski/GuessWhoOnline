import { elements, elementStrings } from './views/base.js';
import * as gameView from './views/gameView.js';
import * as gameHub from './gameHub.js';
import * as GameStatus from './models/GameStatus.js';
import { GameSounds } from './models/GameSounds.js';
import * as notificationSender from './views/notificationSender.js';
const setMuteOrUbmuteSoundsButton = () => {
    if (localStorage["soundsAreMuted"] === 'true') {
        gameView.changeMuteOrUnmuteSoundsIconToVoloumeMute();
        return;
    }
    gameView.changeMuteOrUnmuteSoundsButtonToVoloumeUp();
};
document.addEventListener('DOMContentLoaded', () => {
    GameSounds.startUp();
    GameSounds.autoPlayGameBackgroundMusic();
    gameView.stickyGameStatus();
    gameView.stickyRoundTime();
    setMuteOrUbmuteSoundsButton();
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
elements.gamePanel__finishTurnButton.addEventListener('click', async () => {
    const status = gameView.getGameStatus();
    if (status === GameStatus.yourTurn) {
        gameHub.finishTheTurn();
    }
});
elements.gamePanel__checkCharacterTypeButton.addEventListener('click', async () => {
    const status = gameView.getGameStatus();
    if (status === GameStatus.yourTurn) {
        await checkCharacterType();
    }
});
elements.muteOrUnmuteSoundsButton.addEventListener('click', () => {
    if (GameSounds.soundsAreMuted) {
        gameView.changeMuteOrUnmuteSoundsButtonToVoloumeUp();
        GameSounds.unmuteSounds();
        GameSounds.playGameBackgroundMusic();
        return;
    }
    gameView.changeMuteOrUnmuteSoundsIconToVoloumeMute();
    GameSounds.muteSounds();
    GameSounds.pauseGameBackgroundMusic();
});
const checkCharacterType = async () => {
    const selectedCharacterType = gameView.getCharacterTypeValue();
    const userSelectedAnyCharacter = selectedCharacterType !== 'Guess a opponent character';
    if (userSelectedAnyCharacter) {
        await gameHub.checkCharacterTypeAndEndTheGame(selectedCharacterType);
        return;
    }
    notificationSender.sendNotificationAboutNotChoosedCharacter();
};
Array.from(elements.characterButtons).forEach(characterButton => {
    characterButton.addEventListener('click', (e) => {
        GameSounds.playCharacterSelectSound();
        const gameStatus = gameView.getGameStatus();
        const characterElement = e.target.closest(`.${elementStrings.character}`);
        const characterName = characterElement.querySelector(`.${elementStrings.characterName}`).textContent;
        if (gameStatus === GameStatus.characterSelect) {
            const gameId = gameView.getGameIdInputValue();
            gameHub.selectCharacter(gameId, characterName);
        }
        else {
            const characterButtonElement = characterElement.querySelector(`.${elementStrings.characterButton}`);
            gameView.changeCharacterStatus(characterButtonElement, characterName);
        }
    });
    characterButton.addEventListener('mouseover', () => {
        GameSounds.playCharacterHoverSound();
    });
});
document.addEventListener('scroll', () => {
    gameView.stickyGameStatus();
    gameView.stickyRoundTime();
});
elements.sendMessages__sendMessageButton.addEventListener('click', async () => {
    await trySendMessage();
    gameView.clearSendMessages__sendMessagesInputValue();
});
elements.sendMessages__sendMessageInput.addEventListener('keypress', async () => {
    GameSounds.playKeyboardClickSound();
    const enterKey = 13;
    const clickedEnterKey = (event.keyCode === enterKey && !event.shiftKey);
    if (clickedEnterKey) {
        await trySendMessage();
        gameView.clearSendMessages__sendMessagesInputValue();
    }
});
const trySendMessage = async () => {
    const message = gameView.getSendMessages__sendMessageInputValue();
    const inputIsNotEmpty = !!message.trim();
    const gameStatus = gameView.getGameStatus();
    if (inputIsNotEmpty && gameStatus !== GameStatus.waitForOpponent) {
        const sender = "You";
        gameView.renderMessage(message, sender);
        gameView.scrollMessagesContainerToBottom();
        await gameHub.sendMessageToOpponent(message);
    }
};
window.addEventListener('resize', gameView.scrollMessagesContainerToBottom);
export const addEventListenerToVoteToRestartGameButton = () => {
    document.querySelector(`.${elementStrings.endgameNotification__voteToRestartGameButton}`).addEventListener('click', async () => {
        notificationSender.sendVotingNotificationsToRestartTheGame();
        gameHub.voteToRestartGame();
        gameView.disableVoteToRestartGameButton();
    });
};
window.pepesPls = () => {
    //This is just a joke and will only work if you type pepePls() in the console
    const characters = document.querySelectorAll('.character .character-img');
    const pepes = ["https://cdn.betterttv.net/emote/5b457bbd0485f43277cecac0/3x", "https://cdn.betterttv.net/emote/5d63e543375afb1da9a68a5a/3x", "https://cdn.betterttv.net/emote/5a5e0e8d80f53146a54a516b/3x", "https://cdn.betterttv.net/emote/57850b9df1bf2c1003a88644/3x", "https://cdn.betterttv.net/emote/5ec059009af1ea16863b2dec/3x", "https://cdn.betterttv.net/emote/5a16ee718c22a247ead62d4a/3x", "https://cdn.betterttv.net/emote/5ec39a9db289582eef76f733/3x", "https://cdn.betterttv.net/emote/5eaa12a074046462f768344b/3x", "https://cdn.betterttv.net/emote/5a16ee718c22a247ead62d4a/3x", "https://cdn.betterttv.net/emote/5d922afbc0652668c9e52ead/3x", "https://cdn.betterttv.net/emote/5980af4e3a1ac5330e89dc76/3x", "https://cdn.betterttv.net/emote/5a6edb51f730010d194bdd46/3x", "https://cdn.betterttv.net/emote/59b73909b27c823d5b1f6052/3x", "https://cdn.betterttv.net/emote/5d324913ff6ed36801311fd2/3x", "https://cdn.betterttv.net/emote/5d0d7140ca4f4b50240ff6b4/3x", "https://cdn.betterttv.net/emote/5d38aaa592fc550c2d5996b8/3x", "https://cdn.betterttv.net/emote/5c548025009a2e73916b3a37/3x", "https://cdn.betterttv.net/emote/5e0fa9d40550d42106b8a489/3x", "https://cdn.betterttv.net/emote/5aca62163e290877a25481ad/3x", "https://cdn.betterttv.net/emote/5b77ac3af7bddc567b1d5fb2/3x", "https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/3x", "https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/3x", "https://cdn.betterttv.net/emote/58ae8407ff7b7276f8e594f2/3x", "https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/3x"];
    characters.forEach((character, index) => {
        character.src = pepes[index];
    });
    window.pepesMode = true;
    console.log("Enjoy your pepes :)");
};
//# sourceMappingURL=game.js.map