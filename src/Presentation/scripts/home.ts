import * as indexView from './views/homeView.js';
import { elements, elementStrings } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameCreatorHub from './gameCreatorHub.js';
import { getMatchFullUrl, MatchListItem } from './models/MatchListItem.js';

elements.showFindMatchButton.addEventListener('click', async (): Promise<void> => {
    await gameCreatorHub.refreshListOfGames()

    indexView.showFindMatchContainer();
    indexView.hideCreateMatchContainer();
});

elements.showCreateMatchButton.addEventListener('click', (): void => {
    const id: string = Guid.newGuid();
    const url: string = Guid.newGuid();

    indexView.setIdMatchInputValue(id);
    indexView.setUrlMatchInputValue(url);
    indexView.setNameMatchInputValue(id); //the name of the game is id by default

    indexView.hideFindMatchContainer();
    indexView.showCreateMatchContainer();
});

elements.findMatch__backButton.addEventListener('click', (): void => {
    indexView.hideFindMatchContainer();
});

elements.createMatch_backButton.addEventListener('click', (): void => { 
    indexView.hideCreateMatchContainer();
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
    const gameId: string = indexView.getIdMatchInputValue();
    const gameUrl: string = indexView.getUrlMatchInputValue();
    const gameName: string = indexView.getNameMatchInputValue();
    const gamePassword: string = indexView.getPasswordMatchInputValue();

    const game: MatchListItem =  {
        id: gameId,
        url: gameUrl,
        name: gameName,
        password: gamePassword,
        numberOfConnections: 0
    };

    return game;
};

