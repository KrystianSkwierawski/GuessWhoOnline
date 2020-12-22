import * as indexView from './views/homeView.js';
import { elements, elementStrings } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameCreatorHub from './gameCreatorHub.js';
import { getGameFullUrl, Game } from './models/Game.js';

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
    const gameId: string = indexView.getIdMatchInputValue();
    const gameUrl: string = indexView.getUrlMatchInputValue();
    const gameName: string = indexView.getNameMatchInputValue();
    const gamePassword: string = indexView.getPasswordMatchInputValue();

    const game: Game = {
        id: gameId,
        url: gameUrl,
        name: gameName,
        password: gamePassword,
        hostPlayerConnectionId: null,
        guestPlayerhostConnectionId: null
    };

    await gameCreatorHub.createGame(game);
    navigateToGameUrl(gameUrl); 
});

elements.findMatch__refreshList.addEventListener('click', async (): Promise<void> => {
    await gameCreatorHub.refreshListOfGames();
});

export const navigateToGameUrl = (url: string): void => {
    const fullGameUrl: string = getGameFullUrl(url);
    window.location.href = fullGameUrl;
};


