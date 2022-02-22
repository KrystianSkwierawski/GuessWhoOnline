import { updateGamePanel__roundTime } from '../views/gameView.js';
import { finishTheTurn } from '../gameHub.js';
import { GameSounds } from './GameSounds.js';
export class Timer {
    constructor(roundTimeInSeconds = 120, remainingTime = roundTimeInSeconds) {
        this._roundTimeInSeconds = roundTimeInSeconds;
        this._remainingTime = remainingTime;
    }
    resetTimer() {
        this._remainingTime = this._roundTimeInSeconds;
        updateGamePanel__roundTime(this._remainingTime);
    }
    startTimer() {
        this._timerId = setInterval(async () => {
            const endOfTheTime = this._remainingTime === 0;
            if (this._remainingTime === 15) {
                GameSounds.playTiktokTimerSound();
            }
            if (endOfTheTime) {
                await finishTheTurn();
                return;
            }
            this._remainingTime -= 1;
            updateGamePanel__roundTime(this._remainingTime);
        }, 1000);
    }
    stopTimer() {
        clearInterval(this._timerId);
    }
}
//# sourceMappingURL=Timer.js.map