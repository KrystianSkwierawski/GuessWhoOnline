export class GameSounds {
    //static characterHover: HTMLAudioElement = null;
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
    //static playCharacterHover(): void {
    //    if (!this.soundsAreMuted) {
    //        this.characterHover = new Audio('/sounds/character-hover.mp3');
    //        this.characterHover.play();
    //    }
    //}
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
    static muteSounds() {
        this.soundsAreMuted = true;
        this.mainTheme.pause();
    }
    static unmuteSounds() {
        this.soundsAreMuted = false;
        this.mainTheme.play();
    }
}
GameSounds.soundsAreMuted = false;
GameSounds.mainTheme = new Audio('/sounds/main-theme.mp3');
GameSounds.tikTokTimer = new Audio('/sounds/timer-sound-15s.mp3');
GameSounds.endRound = new Audio('/sounds/end-round.mp3');
GameSounds.keyboardClick = null;
GameSounds.characterSelect = null;
//# sourceMappingURL=GameSounds.js.map