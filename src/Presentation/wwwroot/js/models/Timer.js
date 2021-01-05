var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _roundTimeInSeconds, _remainingTime, _timerId;
import { updateGamePanel__roundTime } from '../views/gameView.js';
import { finishTheTurn } from '../gameHub.js';
export class Timer {
    constructor(roundTimeInSeconds = 60, remainingTime = roundTimeInSeconds) {
        _roundTimeInSeconds.set(this, void 0);
        _remainingTime.set(this, void 0);
        _timerId.set(this, void 0);
        __classPrivateFieldSet(this, _roundTimeInSeconds, roundTimeInSeconds);
        __classPrivateFieldSet(this, _remainingTime, remainingTime);
    }
    resetTimer() {
        __classPrivateFieldSet(this, _remainingTime, __classPrivateFieldGet(this, _roundTimeInSeconds));
    }
    startTimer() {
        __classPrivateFieldSet(this, _timerId, setInterval(() => __awaiter(this, void 0, void 0, function* () {
            const endOfTheTime = (__classPrivateFieldGet(this, _remainingTime) === 0) ? true : false;
            if (endOfTheTime) {
                yield finishTheTurn();
                return;
            }
            __classPrivateFieldSet(this, _remainingTime, __classPrivateFieldGet(this, _remainingTime) - 1);
            updateGamePanel__roundTime(__classPrivateFieldGet(this, _remainingTime));
        }), 1000));
    }
    stopTimer() {
        clearInterval(__classPrivateFieldGet(this, _timerId));
    }
}
_roundTimeInSeconds = new WeakMap(), _remainingTime = new WeakMap(), _timerId = new WeakMap();
//# sourceMappingURL=Timer.js.map