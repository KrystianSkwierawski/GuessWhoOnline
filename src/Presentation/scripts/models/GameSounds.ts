export class GameSounds {
    static soundsAreMuted = false;
    static mainThemeMusic: HTMLAudioElement = new Audio('/sounds/main-theme.mp3');
    static tikTokTimerSound: HTMLAudioElement = new Audio('/sounds/timer-sound-15s.mp3');
    static endRoundSound: HTMLAudioElement = new Audio('/sounds/end-round.mp3');
    static loseSound: HTMLAudioElement = new Audio('/sounds/lose.mp3');
    static winSound: HTMLAudioElement = new Audio('/sounds/win.mp3');

    static keyboardClickPath: string = '/sounds/keyboard-click.mp3';
    static characterSelectPath: string = '/sounds/character-select.mp3';
    static characterHoverPath: string = '/sounds/character-hover.mp3';

    static startUp(): void {
        this.mainThemeMusic.autoplay = true;
        this.mainThemeMusic.loop = true;
    }

    static playTiktokTimerSound(): void {
        if (!this.soundsAreMuted) {
            this.tikTokTimerSound.play();
        }
    }

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
        this.mainThemeMusic.pause();
        this.soundsAreMuted = true;
    }

    static unmuteSounds(): void {
        this.mainThemeMusic.play();
        this.soundsAreMuted = false;
    }
}