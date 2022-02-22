import * as homeView from './views/homeView.js';
import { elements } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameCreatorHub from './gameCreatorHub.js';
import { getMatchFullUrl } from './models/MatchListItem.js';
import { GameSounds } from './models/GameSounds.js';
const setMuteOrUbmuteSoundsButton = () => {
    if (localStorage["soundsAreMuted"] === 'true') {
        homeView.changeMuteOrUnmuteSoundsIconToVoloumeMute();
        return;
    }
    homeView.changeMuteOrUnmuteSoundsButtonToVoloumeUp();
};
document.addEventListener('DOMContentLoaded', () => {
    GameSounds.startUp();
    GameSounds.autoPlayHomeBackgroundMusic();
    setMuteOrUbmuteSoundsButton();
});
elements.homeMain__showFindMatchButton.addEventListener('click', async () => {
    await gameCreatorHub.refreshListOfGames();
    homeView.showFindMatchContainer();
    homeView.hideCreateMatchContainer();
    homeView.addBlurToHome();
});
elements.homeMain__showCreateMatchButton.addEventListener('click', () => {
    const id = Guid.newGuid();
    const url = Guid.newGuid();
    const nameMatch = id; //the name of the game is id by default
    homeView.setIdMatchInputValue(id);
    homeView.setUrlMatchInputValue(url);
    homeView.setNameMatchInputValue(nameMatch);
    homeView.hideFindMatchContainer();
    homeView.showCreateMatchContainer();
    homeView.addBlurToHome();
});
elements.findMatch__backButton.addEventListener('click', () => {
    homeView.hideFindMatchContainer();
    homeView.removeBlurFromHome();
});
elements.createMatch_backButton.addEventListener('click', () => {
    homeView.hideCreateMatchContainer();
    homeView.removeBlurFromHome();
});
elements.createMatchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const game = await createGameObject();
    await gameCreatorHub.createMatch(game);
    navigateToMatchUrl(game.url);
});
elements.findMatch__refreshList.addEventListener('click', async () => {
    await gameCreatorHub.refreshListOfGames();
});
export const navigateToMatchUrl = (url) => {
    const fullGameUrl = getMatchFullUrl(url);
    window.location.assign(fullGameUrl);
};
const createGameObject = async () => {
    const gameId = homeView.getIdMatchInputValue();
    const gameUrl = homeView.getUrlMatchInputValue();
    const gameName = homeView.getNameMatchInputValue();
    const gamePassword = homeView.getPasswordMatchInputValue();
    const game = {
        id: gameId,
        url: gameUrl,
        name: gameName,
        password: gamePassword,
        numberOfConnections: 0
    };
    return game;
};
elements.homeBottom__showInformationsAboutGameButton.addEventListener('click', () => {
    homeView.showInformationsAboutGame();
    homeView.hideCreateMatchContainer();
    homeView.hideFindMatchContainer();
    homeView.addBlurToHome();
});
elements.hideInformationsAboutGameButton.addEventListener('click', () => {
    homeView.hideInformationsAboutGame();
    homeView.removeBlurFromHome();
});
elements.homeBottom__muteOrUnmuteSoundsButton.addEventListener('click', () => {
    if (GameSounds.soundsAreMuted) {
        homeView.changeMuteOrUnmuteSoundsButtonToVoloumeUp();
        GameSounds.unmuteSounds();
        GameSounds.playHomeBackgroundMusic();
        return;
    }
    homeView.changeMuteOrUnmuteSoundsIconToVoloumeMute();
    GameSounds.muteSounds();
    GameSounds.pauseHomeBackgroundMusic();
});
//# sourceMappingURL=home.js.map