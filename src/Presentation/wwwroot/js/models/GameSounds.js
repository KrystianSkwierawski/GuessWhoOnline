export class GameSounds {
    static startUp() {
        this.mainTheme.autoplay = true;
        this.mainTheme.loop = true;
    }
    static playTiktokTimer() {
        if (!this.soundsAreMuted) {
            this.tikTokTimer.play();
        }
    }
    static playEndRound() {
        if (!this.soundsAreMuted) {
            this.endRound.play();
        }
    }
    static playCharacterHover() {
        if (!this.soundsAreMuted) {
            this.characterHover = new Audio('/sounds/character-hover.mp3');
            this.characterHover.play();
        }
    }
    static playCharacterSelect() {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            this.characterSelect = new Audio('/sounds/character-select.mp3');
            this.characterSelect.play();
        }
    }
    static playKeyboardClick() {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            this.keyboardClick = new Audio('/sounds/keyboard-click.mp3');
            this.keyboardClick.play();
        }
    }
    static playWin() {
        if (!this.soundsAreMuted) {
            this.win.play();
        }
    }
    static playLose() {
        if (!this.soundsAreMuted) {
            this.lose.play();
        }
    }
    static muteSounds() {
        this.mainTheme.pause();
        this.soundsAreMuted = true;
    }
    static unmuteSounds() {
        this.mainTheme.play();
        this.soundsAreMuted = false;
    }
}
GameSounds.soundsAreMuted = false;
GameSounds.mainTheme = new Audio('/sounds/main-theme.mp3');
GameSounds.tikTokTimer = new Audio('/sounds/timer-sound-15s.mp3');
GameSounds.endRound = new Audio('/sounds/end-round.mp3');
GameSounds.lose = new Audio('/sounds/lose.mp3');
GameSounds.win = new Audio('/sounds/win.mp3');
GameSounds.keyboardClick = null;
GameSounds.characterSelect = null;
GameSounds.characterHover = null;
//# sourceMappingURL=GameSounds.js.map