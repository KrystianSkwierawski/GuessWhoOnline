import * as homeView from './views/homeView.js';
import { elements, elementStrings } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameCreatorHub from './gameCreatorHub.js';
import { getMatchFullUrl, MatchListItem } from './models/MatchListItem.js';
import { GameSounds } from './models/GameSounds.js';

const setMuteOrUbmuteSoundsButton = (): void => {
    if (localStorage.soundsAreMuted === 'true') {
        homeView.changeMuteOrUnmuteSoundsIconToVoloumeMute();

        return;
    }

    homeView.changeMuteOrUnmuteSoundsButtonToVoloumeUp();
};

document.addEventListener('DOMContentLoaded', (): void => {
    GameSounds.startUp();
    GameSounds.autoPlayHomeBackgroundMusic();
    setMuteOrUbmuteSoundsButton();
});

elements.homeMain__showFindMatchButton.addEventListener('click', async (): Promise<void> => {
    await gameCreatorHub.refreshListOfGames();

    homeView.showFindMatchContainer();
    homeView.hideCreateMatchContainer();
    homeView.addBlurToHome();
});

elements.homeMain__showCreateMatchButton.addEventListener('click', (): void => {
    const id: string = Guid.newGuid();
    const url: string = Guid.newGuid();
    const nameMatch: string = id;  //the name of the game is id by default

    homeView.setIdMatchInputValue(id);
    homeView.setUrlMatchInputValue(url);
    homeView.setNameMatchInputValue(nameMatch);

    homeView.hideFindMatchContainer();
    homeView.showCreateMatchContainer();
    homeView.addBlurToHome();
});

elements.findMatch__backButton.addEventListener('click', (): void => {
    homeView.hideFindMatchContainer();
    homeView.removeBlurFromHome();
});

elements.createMatch_backButton.addEventListener('click', (): void => {
    homeView.hideCreateMatchContainer();
    homeView.removeBlurFromHome();
});

elements.createMatchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const game: MatchListItem = await createGameObject();

    await gameCreatorHub.createMatch(game);
    navigateToMatchUrl(game.url);
});

elements.findMatch__refreshList.addEventListener('click', async (): Promise<void> => {
    await gameCreatorHub.refreshListOfGames();
});

export const navigateToMatchUrl = (url: string): void => {
    const fullGameUrl: string = getMatchFullUrl(url);
    window.location.assign(fullGameUrl);
};

const createGameObject = async (): Promise<MatchListItem> => {
    const gameId: string = homeView.getIdMatchInputValue();
    const gameUrl: string = homeView.getUrlMatchInputValue();
    const gameName: string = homeView.getNameMatchInputValue();
    const gamePassword: string = homeView.getPasswordMatchInputValue();

    const game: MatchListItem = {
        id: gameId,
        url: gameUrl,
        name: gameName,
        password: gamePassword,
        numberOfConnections: 0
    };

    return game;
};

elements.homeBottom__showInformationsAboutGameButton.addEventListener('click', (): void => {
    homeView.showInformationsAboutGame();
    homeView.hideCreateMatchContainer();
    homeView.hideFindMatchContainer();
    homeView.addBlurToHome();

});
elements.hideInformationsAboutGameButton.addEventListener('click', (): void => {
    homeView.hideInformationsAboutGame();
    homeView.removeBlurFromHome();
});

elements.homeBottom__muteOrUnmuteSoundsButton.addEventListener('click', (): void => {
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

