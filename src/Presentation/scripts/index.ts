import * as indexView from './views/indexView.js';
import { elements, elementStrings } from './views/base.js';
import * as Guid from './models/Guid.js';

elements.findMatchButton.addEventListener('click', (): void => {
    indexView.showFindMatchContainer();
    indexView.hideCreateMatchContainer();
});

elements.findMatch__backButton.addEventListener('click', (): void => {
    indexView.hideFindMatchContainer();
});

elements.createMatchButton.addEventListener('click', (): void => {
    const guid: string = Guid.newGuid();
    (<HTMLInputElement>elements.nameMatchInput).value = guid;

    indexView.showCreateMatchContainer();
    indexView.hideFindMatchContainer();
});

elements.createMatch_backButton.addEventListener('click', (): void => { 
    indexView.hideCreateMatchContainer();
});
