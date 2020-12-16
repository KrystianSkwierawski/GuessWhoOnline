import * as indexView from './views/indexView.js';
import { elements } from './views/base.js';
import * as Guid from './models/Guid.js';
elements.findMatchButton.addEventListener('click', () => {
    indexView.showFindMatchContainer();
    indexView.hideCreateMatchContainer();
});
elements.findMatch__backButton.addEventListener('click', () => {
    indexView.hideFindMatchContainer();
});
elements.createMatchButton.addEventListener('click', () => {
    const guid = Guid.newGuid();
    elements.nameMatchInput.value = guid;
    indexView.showCreateMatchContainer();
    indexView.hideFindMatchContainer();
});
elements.createMatch_backButton.addEventListener('click', () => {
    indexView.hideCreateMatchContainer();
});
//# sourceMappingURL=index.js.map