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
var _roundTimeInSeconds, _remainingTime;
import { updateGamePanel__roundTime } from '../views/gameView.js';
import { finishTheTurn } from '../gameHub.js';
export class Timer {
    constructor(roundTimeInSeconds = 60, remainingTime = roundTimeInSeconds) {
        _roundTimeInSeconds.set(this, void 0);
        _remainingTime.set(this, void 0);
        __classPrivateFieldSet(this, _roundTimeInSeconds, roundTimeInSeconds);
        __classPrivateFieldSet(this, _remainingTime, remainingTime);
    }
    resetTimer() {
        __classPrivateFieldSet(this, _remainingTime, 60);
    }
    startTimer() {
        setInterval(() => {
            const endOfTheTime = (__classPrivateFieldGet(this, _remainingTime) === 0) ? true : false;
            if (endOfTheTime) {
                finishTheTurn();
                return;
            }
            __classPrivateFieldSet(this, _remainingTime, __classPrivateFieldGet(this, _remainingTime) - 1);
            updateGamePanel__roundTime(__classPrivateFieldGet(this, _remainingTime));
        }, 1000);
    }
}
_roundTimeInSeconds = new WeakMap(), _remainingTime = new WeakMap();
//# sourceMappingURL=Timer.js.map