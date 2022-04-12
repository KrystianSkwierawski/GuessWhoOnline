export class GameSounds {
    static startUp() {
        this.gameBackgroundMusic.volume = 0.5;
        this.soundsAreMuted = localStorage["soundsAreMuted"] === 'true';
        localStorage["soundsAreMuted"] = this.soundsAreMuted;
    }
    static playTiktokTimerSound() {
        if (!this.soundsAreMuted) {
            this.tikTokTimerSound.play();
        }
    }
    static autoPlayHomeBackgroundMusic() {
        if (!this.soundsAreMuted) {
            this.homeBackgroundMusic.autoplay = true;
            this.homeBackgroundMusic.loop = true;
        }
    }
    static playHomeBackgroundMusic() {
        if (!this.soundsAreMuted) {
            this.homeBackgroundMusic.play();
        }
    }
    static pauseHomeBackgroundMusic() {
        this.homeBackgroundMusic.pause();
    }
    static autoPlayGameBackgroundMusic() {
        if (!this.soundsAreMuted) {
            this.gameBackgroundMusic.autoplay = true;
            this.gameBackgroundMusic.loop = true;
        }
    }
    static playGameBackgroundMusic() {
        if (!this.soundsAreMuted) {
            this.gameBackgroundMusic.play();
        }
    }
    static pauseGameBackgroundMusic() {
        this.gameBackgroundMusic.pause();
    }
    static pauseTiktokTimerSound() {
        if (!this.soundsAreMuted) {
            this.tikTokTimerSound.pause();
        }
    }
    ;
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
        localStorage["soundsAreMuted"] = true;
        this.soundsAreMuted = true;
    }
    static unmuteSounds() {
        localStorage["soundsAreMuted"] = false;
        this.soundsAreMuted = false;
    }
}
GameSounds.gameBackgroundMusic = new Audio('/assets/sounds/game-background-music.mp3');
GameSounds.homeBackgroundMusic = new Audio('/assets/sounds/home-background-music.mp3');
GameSounds.tikTokTimerSound = new Audio('/assets/sounds/timer-sound-15s.mp3');
GameSounds.endRoundSound = new Audio('/assets/sounds/end-round.mp3');
GameSounds.loseSound = new Audio('/assets/sounds/lose.mp3');
GameSounds.winSound = new Audio('/assets/sounds/win.mp3');
GameSounds.keyboardClickPath = '/assets/sounds/keyboard-click.mp3';
GameSounds.characterSelectPath = '/assets/sounds/character-select.mp3';
GameSounds.characterHoverPath = '/assets/sounds/character-hover.mp3';
