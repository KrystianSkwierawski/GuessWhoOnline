import * as indexView from './views/indexView.js';
import { elements } from './views/base.js';
import * as Guid from './models/Guid.js';
elements.showFindMatch__button.addEventListener('click', () => {
    indexView.showFindMatch__container();
    indexView.hideCreateMatch__container();
});
elements.showCreateMatch__button.addEventListener('click', () => {
    const id = Guid.newGuid();
    indexView.setIdMatch__inputValue(id);
    indexView.setNameMatch__inputValue(id);
    indexView.hideFindMatch__container();
    indexView.showCreateMatch__container();
});
elements.findMatch__backButton.addEventListener('click', () => {
    indexView.hideFindMatch__container();
});
elements.createMatch_backButton.addEventListener('click', () => {
    indexView.hideCreateMatch__container();
});
elements.createMatch__button.addEventListener('click', () => {
    const name = indexView.getNameMatch__inputValue();
    const password = indexView.getPasswordMatch__inputValue();
    const id = indexView.getIdMatch__inputValue();
    console.log(name, password, id);
    //gameHub dodaj
    //idz do linku
});
//# sourceMappingURL=index.js.map