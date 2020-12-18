﻿import * as indexView from './views/indexView.js';
import { elements, elementStrings } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameHub from './gameHub.js';
import { getGameUrl, Game } from './models/Game.js';

elements.showFindMatchButton.addEventListener('click', async (): Promise<void> => {
    await gameHub.refreshListOfGames()

    indexView.showFindMatchContainer();
    indexView.hideCreateMatchContainer();
});

elements.showCreateMatchButton.addEventListener('click', (): void => {
    const id: string = Guid.newGuid();
    indexView.setIdMatchInputValue(id);
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
    const gameName: string = indexView.getNameMatchInputValue();
    const gamePassword: string = indexView.getPasswordMatchInputValue();

    const game: Game = {
        id: gameId,
        name: gameName,
        password: gamePassword,
        hostPlayerConnectionId: null,
        guestPlayerhostConnectionId: null
    };

    await gameHub.createGame(game);

    const gameUrl: string = getGameUrl(gameId);
    window.location.href = gameUrl;
});

elements.findMatch__refreshList.addEventListener('click', async (): Promise<void> => {
    await gameHub.refreshListOfGames();
});


