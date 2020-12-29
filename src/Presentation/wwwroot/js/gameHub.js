var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as gameView from './views/gameView.js';
var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();
hub.on("GivePermisionToStartTheGame", () => {
    gameView.showOrHideStartGameButton();
    gameView.showOrHideGameStatus();
});
hub.on("ChangeGameStatusToWaitForStart", () => {
    gameView.setGameStatusToWaitForStart();
});
hub.start().then(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = gameView.getGameIdInputValue();
        yield tryJoinGame(gameId);
    });
}).catch(function (err) {
    return console.error(err.toString());
});
const tryJoinGame = (gameId) => __awaiter(void 0, void 0, void 0, function* () {
    yield hub.invoke('TryJoinGame', gameId);
});
//# sourceMappingURL=gameHub.js.map