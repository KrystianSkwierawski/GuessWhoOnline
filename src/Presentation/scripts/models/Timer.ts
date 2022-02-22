import { updateGamePanel__roundTime } from '../views/gameView.js';
import { finishTheTurn } from '../gameHub.js';
import { GameSounds } from './GameSounds.js';

export class Timer {
    _roundTimeInSeconds: number;
    _remainingTime: number;
    _timerId: number;

    constructor(roundTimeInSeconds: number = 120, remainingTime = roundTimeInSeconds) {
        this._roundTimeInSeconds = roundTimeInSeconds;
        this._remainingTime = remainingTime;
    }

    resetTimer(): void {
        this._remainingTime = this._roundTimeInSeconds;
        updateGamePanel__roundTime(this._remainingTime);  
    }

    startTimer(): void {
        this._timerId = setInterval(async (): Promise<void> => { 
            const endOfTheTime: boolean = this._remainingTime === 0;

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

    stopTimer(): void {
        clearInterval(this._timerId);
    }
} 