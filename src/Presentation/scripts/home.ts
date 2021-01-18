import * as homeView from './views/homeView.js';
import { elements, elementStrings } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameCreatorHub from './gameCreatorHub.js';
import { getMatchFullUrl, MatchListItem } from './models/MatchListItem.js';
import { GameSounds } from './models/GameSounds.js';

const setMuteOrUbmuteSoundsButton = (): void => {
    if (localStorage.soundsAreMuted === 'true') {
        homeView.changeMuteOrUnmuteSoundsIconToVoloumeMute();
    }
    else {
        homeView.changeMuteOrUnmuteSoundsButtonToVoloumeUp();
    }
};

document.addEventListener('DOMContentLoaded', (): void => {
    GameSounds.startUp();
    GameSounds.autoPlayHomeBackgroundMusic();
    setMuteOrUbmuteSoundsButton();
});

elements.homeMain__showFindMatchButton.addEventListener('click', async (): Promise<void> => {
    await gameCreatorHub.refreshListOfGames()

    homeView.showFindMatchContainer();
    homeView.hideCreateMatchContainer();
});

elements.homeMain__showCreateMatchButton.addEventListener('click', (): void => {
    const id: string = Guid.newGuid();
    const url: string = Guid.newGuid();

    homeView.setIdMatchInputValue(id);
    homeView.setUrlMatchInputValue(url);
    homeView.setNameMatchInputValue(id); //the name of the game is id by default

    homeView.hideFindMatchContainer();
    homeView.showCreateMatchContainer();
});

elements.findMatch__backButton.addEventListener('click', (): void => {
    homeView.hideFindMatchContainer();
});

elements.createMatch_backButton.addEventListener('click', (): void => { 
    homeView.hideCreateMatchContainer();
});

elements.createMatchButton.addEventListener('click', async (): Promise<void> => {
    const game: MatchListItem = await createGameObject();

    await gameCreatorHub.createMatch(game);
    navigateToMatchUrl(game.url); 
});

elements.findMatch__refreshList.addEventListener('click', async (): Promise<void> => {
    await gameCreatorHub.refreshListOfGames();
});

export const navigateToMatchUrl = (url: string): void => {
    const fullGameUrl: string = getMatchFullUrl(url);
    window.location.href = fullGameUrl;
};

const createGameObject = async (): Promise<MatchListItem> => {
    const gameId: string = homeView.getIdMatchInputValue();
    const gameUrl: string = homeView.getUrlMatchInputValue();
    const gameName: string = homeView.getNameMatchInputValue();
    const gamePassword: string = homeView.getPasswordMatchInputValue();

    const game: MatchListItem =  {
        id: gameId,
        url: gameUrl,
        name: gameName,
        password: gamePassword,
        numberOfConnections: 0
    };

    return game;
};

elements.homeBottom__showInformationsAboutGameButton.addEventListener('click', homeView.showOrHideInformationsAboutGame);
elements.hideInformationsAboutGameButton.addEventListener('click', homeView.showOrHideInformationsAboutGame);

elements.homeBottom__muteOrUnmuteSoundsButton.addEventListener('click', (): void => {
    if (GameSounds.soundsAreMuted) {
        homeView.changeMuteOrUnmuteSoundsButtonToVoloumeUp();
        GameSounds.unmuteSounds();
        GameSounds.playHomeBackgroundMusic();
    }
    else {
        homeView.changeMuteOrUnmuteSoundsIconToVoloumeMute();
        GameSounds.muteSounds();
        GameSounds.pauseHomeBackgroundMusic();
    }
});

