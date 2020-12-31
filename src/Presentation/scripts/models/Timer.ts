import { updateGamePanel__roundTime } from '../views/gameView.js';

export class Timer {
    roundTimeInSeconds: number;

    constructor(roundTimeInSeconds: number = 60) {
        this.roundTimeInSeconds = roundTimeInSeconds;
    }

    startTimer() {
        let remainingTime = this.roundTimeInSeconds;

        const intervalId = setInterval(function (): void {
            const endOfTheTime: boolean = (remainingTime === 0) ? true : false;

            if (endOfTheTime) {
                //stop the timer
                clearInterval(intervalId);
                return;               
            }

            remainingTime -= 1;
            updateGamePanel__roundTime(remainingTime);
        }, 1000);
    }
} 