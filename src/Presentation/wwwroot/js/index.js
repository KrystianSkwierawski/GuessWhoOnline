import * as indexView from './views/indexView.js';
import { elements } from './views/base.js';
elements.findMatchButton.addEventListener('click', () => {
    indexView.showFindMatchContainer();
    indexView.hideCreateMatchContainer();
});
elements.findMatch__backButton.addEventListener('click', () => {
    indexView.hideFindMatchContainer();
});
elements.createMatchButton.addEventListener('click', () => {
    //const guid: string = Guid.newGuid();
    //(<HTMLInputElement>elements.nameMatchInput).value = guid;
    indexView.showCreateMatchContainer();
    indexView.hideFindMatchContainer();
});
elements.createMatch_backButton.addEventListener('click', () => {
    indexView.hideCreateMatchContainer();
});
//# sourceMappingURL=index.js.map