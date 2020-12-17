import * as indexView from './views/indexView.js';
import { elements, elementStrings } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameHub from './gameHub.js';
import { getGameUrl, Game } from './models/Game.js';

elements.showFindMatch__button.addEventListener('click', async (): Promise<void> => {
    await gameHub.getListOfGames()

    indexView.showFindMatch__container();
    indexView.hideCreateMatch__container();
});

elements.showCreateMatch__button.addEventListener('click', (): void => {
    const id: string = Guid.newGuid();
    indexView.setIdMatch__inputValue(id);
    indexView.setNameMatch__inputValue(id); //the name of the game is id by default

    indexView.hideFindMatch__container();
    indexView.showCreateMatch__container();
});

elements.findMatch__backButton.addEventListener('click', (): void => {
    indexView.hideFindMatch__container();
});

elements.createMatch_backButton.addEventListener('click', (): void => { 
    indexView.hideCreateMatch__container();
});

elements.createMatch__button.addEventListener('click', async (): Promise<void> => {
    const gameId: string = indexView.getIdMatch__inputValue();
    const gameName: string = indexView.getNameMatch__inputValue();
    const gamePassword: string = indexView.getPasswordMatch__inputValue();

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


