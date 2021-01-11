export class GameSounds {
    static startUp() {
        this.mainTheme.autoplay = true;
        this.mainTheme.loop = true;
    }
    static playTimerSound() {
        if (!this.soundsAreMuted) {
            this.timer15s.play();
        }
    }
    static playEndRoundSound() {
        if (!this.soundsAreMuted) {
            this.endRound.play();
        }
    }
    static playSelectCharacterSound() {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            this.selectCharacter = new Audio('/sounds/select-character-sound.mp3');
            this.selectCharacter.play();
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
GameSounds.mainTheme = new Audio('/sounds/main-theme-music.mp3');
GameSounds.timer15s = new Audio('/sounds/timer-sound-15s.mp3');
GameSounds.endRound = new Audio('/sounds/end-round-sound.mp3');
GameSounds.selectCharacter = null;
//# sourceMappingURL=GameSounds.js.map