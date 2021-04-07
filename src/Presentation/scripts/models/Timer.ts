import { updateGamePanel__roundTime } from '../views/gameView.js';
import { finishTheTurn } from '../gameHub.js';
import { GameSounds } from './GameSounds.js';

export class Timer {
    #roundTimeInSeconds: number;
    #remainingTime: number;
    #timerId: number;

    constructor(roundTimeInSeconds: number = 120, remainingTime = roundTimeInSeconds) {
        this.#roundTimeInSeconds = roundTimeInSeconds;
        this.#remainingTime = remainingTime;
    }

    resetTimer(): void {
        this.#remainingTime = this.#roundTimeInSeconds;
        updateGamePanel__roundTime(this.#remainingTime);  
    }

    startTimer(): void {
        this.#timerId = setInterval(async (): Promise<void> => { 
            const endOfTheTime: boolean = (this.#remainingTime === 0) ? true : false;

            if (this.#remainingTime === 15) {
                GameSounds.playTiktokTimerSound();
            }

            if (endOfTheTime) {
                await finishTheTurn();
                return;
            }

            this.#remainingTime -= 1;
            updateGamePanel__roundTime(this.#remainingTime);        
        }, 1000);
    }

    stopTimer(): void {
        clearInterval(this.#timerId);
    }
} 