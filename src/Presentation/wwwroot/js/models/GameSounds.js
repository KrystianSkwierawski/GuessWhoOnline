export class GameSounds {
    static startUp() {
        this.mainThemeMusic.autoplay = true;
        this.mainThemeMusic.loop = true;
    }
    static playTiktokTimerSound() {
        if (!this.soundsAreMuted) {
            this.tikTokTimerSound.play();
        }
    }
    static playEndRoundSound() {
        if (!this.soundsAreMuted) {
            this.endRoundSound.play();
        }
    }
    static playCharacterHoverSound() {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            const characterHover = new Audio(this.characterHoverPath);
            characterHover.play();
        }
    }
    static playCharacterSelectSound() {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            const characterSelect = new Audio(this.characterSelectPath);
            characterSelect.play();
        }
    }
    static playKeyboardClickSound() {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            const keyboardClick = new Audio(this.keyboardClickPath);
            keyboardClick.play();
        }
    }
    static playWinSound() {
        if (!this.soundsAreMuted) {
            this.winSound.play();
        }
    }
    static playLoseSound() {
        if (!this.soundsAreMuted) {
            this.loseSound.play();
        }
    }
    static muteSounds() {
        this.mainThemeMusic.pause();
        this.soundsAreMuted = true;
    }
    static unmuteSounds() {
        this.mainThemeMusic.play();
        this.soundsAreMuted = false;
    }
}
GameSounds.soundsAreMuted = false;
GameSounds.mainThemeMusic = new Audio('/sounds/main-theme.mp3');
GameSounds.tikTokTimerSound = new Audio('/sounds/timer-sound-15s.mp3');
GameSounds.endRoundSound = new Audio('/sounds/end-round.mp3');
GameSounds.loseSound = new Audio('/sounds/lose.mp3');
GameSounds.winSound = new Audio('/sounds/win.mp3');
GameSounds.keyboardClickPath = '/sounds/keyboard-click.mp3';
GameSounds.characterSelectPath = '/sounds/character-select.mp3';
GameSounds.characterHoverPath = '/sounds/character-hover.mp3';
//# sourceMappingURL=GameSounds.js.map