export class GameSounds {
    static soundsAreMuted = false;
    static mainTheme: HTMLAudioElement = new Audio('/sounds/main-theme.mp3');
    static tikTokTimer: HTMLAudioElement = new Audio('/sounds/timer-sound-15s.mp3');
    static endRound: HTMLAudioElement = new Audio('/sounds/end-round.mp3');
    static lose: HTMLAudioElement = new Audio('/sounds/lose.mp3');
    static win: HTMLAudioElement = new Audio('/sounds/win.mp3');
    static keyboardClick: HTMLAudioElement = null;
    static characterSelect: HTMLAudioElement = null;   
    static characterHover: HTMLAudioElement = null;

    static startUp(): void {
        this.mainTheme.autoplay = true;
        this.mainTheme.loop = true;
    }

    static playTiktokTimer(): void {
        if (!this.soundsAreMuted) {
            this.tikTokTimer.play();
        }
    }

    static playEndRound(): void {
        if (!this.soundsAreMuted) {
            this.endRound.play();
        }
    }

    static playCharacterHover(): void {
        if (!this.soundsAreMuted) {
            this.characterHover = new Audio('/sounds/character-hover.mp3');
            this.characterHover.play();
        }
    }

    static playCharacterSelect(): void {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            this.characterSelect = new Audio('/sounds/character-select.mp3');
            this.characterSelect.play();
        }
    }

    static playKeyboardClick(): void {
        if (!this.soundsAreMuted) {
             //create new audio as user may click it multiple times
            this.keyboardClick = new Audio('/sounds/keyboard-click.mp3');
            this.keyboardClick.play();
        }
    }

    static playWin(): void {
        if (!this.soundsAreMuted) {
            this.win.play();
        }
    }

    static playLose(): void {
        if (!this.soundsAreMuted) {
            this.lose.play();
        }
    }

    static muteSounds(): void {   
        this.mainTheme.pause();
        this.soundsAreMuted = true;
    }

    static unmuteSounds(): void {      
        this.mainTheme.play();
        this.soundsAreMuted = false;
    }
}