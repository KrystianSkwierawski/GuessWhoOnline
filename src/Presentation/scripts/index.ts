import * as indexView from './views/indexView.js';
import { elements, elementStrings } from './views/base.js';
import * as Guid from './models/Guid.js';
import * as gameHub from './gameHub.js';
import * as Game from './models/Game.js';

elements.showFindMatch__button.addEventListener('click', (): void => {
    indexView.showFindMatch__container();
    indexView.hideCreateMatch__container();
});

elements.showCreateMatch__button.addEventListener('click', (): void => {
    const id: string = Guid.newGuid();
    indexView.setIdMatch__inputValue(id);
    indexView.setNameMatch__inputValue(id);

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
    const id: string = indexView.getIdMatch__inputValue();
    const name: string = indexView.getNameMatch__inputValue();
    const password: string = indexView.getPasswordMatch__inputValue();
    
    await gameHub.createGame(id, name, password);

    const gameUrl: string = Game.getGameUrl(id);
    window.location.href = gameUrl;
});


