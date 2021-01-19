export class GameSounds {
    static soundsAreMuted: boolean;
    private static gameBackgroundMusic: HTMLAudioElement = new Audio('/sounds/game-background-music.mp3');
    private static homeBackgroundMusic: HTMLAudioElement = new Audio('/sounds/home-background-music.mp3');
    private static tikTokTimerSound: HTMLAudioElement = new Audio('/sounds/timer-sound-15s.mp3');
    private static endRoundSound: HTMLAudioElement = new Audio('/sounds/end-round.mp3');
    private static loseSound: HTMLAudioElement = new Audio('/sounds/lose.mp3');
    private static winSound: HTMLAudioElement = new Audio('/sounds/win.mp3');

    static keyboardClickPath: string = '/sounds/keyboard-click.mp3';
    static characterSelectPath: string = '/sounds/character-select.mp3';
    static characterHoverPath: string = '/sounds/character-hover.mp3';

    static startUp(): void {
        this.gameBackgroundMusic.volume = 0.5;
        this.soundsAreMuted = (localStorage.soundsAreMuted === 'false') ? false : true;
        localStorage.soundsAreMuted = this.soundsAreMuted;
    }

    static playTiktokTimerSound(): void {
        if (!this.soundsAreMuted) {
            this.tikTokTimerSound.play();
        }
    }

    static autoPlayHomeBackgroundMusic(): void {
        if (!this.soundsAreMuted) {
            this.homeBackgroundMusic.autoplay = true;
            this.homeBackgroundMusic.loop = true;
        }
    }


    static playHomeBackgroundMusic(): void {
        if (!this.soundsAreMuted) {
            this.homeBackgroundMusic.play();
        }
    }

    static pauseHomeBackgroundMusic(): void {

        this.homeBackgroundMusic.pause();

    }

    static autoPlayGameBackgroundMusic(): void {
        if (!this.soundsAreMuted) {
            this.gameBackgroundMusic.autoplay = true;
            this.gameBackgroundMusic.loop = true;
        }
    }

    static playGameBackgroundMusic(): void {
        if (!this.soundsAreMuted) {
            this.gameBackgroundMusic.play();
        }
    }

    static pauseGameBackgroundMusic(): void {
        this.gameBackgroundMusic.pause();
    }

    static pauseTiktokTimerSound(): void {
        if (!this.soundsAreMuted) {
            this.tikTokTimerSound.pause();
        }
    };

    static playEndRoundSound(): void {
        if (!this.soundsAreMuted) {
            this.endRoundSound.play();
        }
    }

    static playCharacterHoverSound(): void {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            const characterHover: HTMLAudioElement = new Audio(this.characterHoverPath);
            characterHover.play();
        }
    }

    static playCharacterSelectSound(): void {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            const characterSelect: HTMLAudioElement = new Audio(this.characterSelectPath);
            characterSelect.play();
        }
    }

    static playKeyboardClickSound(): void {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            const keyboardClick: HTMLAudioElement = new Audio(this.keyboardClickPath);
            keyboardClick.play();
        }
    }

    static playWinSound(): void {
        if (!this.soundsAreMuted) {
            this.winSound.play();
        }
    }

    static playLoseSound(): void {
        if (!this.soundsAreMuted) {
            this.loseSound.play();
        }
    }

    static muteSounds(): void {
        localStorage.soundsAreMuted = true;
        this.soundsAreMuted = true;
    }

    static unmuteSounds(): void {
        localStorage.soundsAreMuted = false;
        this.soundsAreMuted = false;
    }
}