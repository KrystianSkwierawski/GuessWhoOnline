export class GameSounds {
    static soundsAreMuted = false;
    static mainTheme: HTMLAudioElement = new Audio('/sounds/main-theme-music.mp3');
    static timer15s: HTMLAudioElement = new Audio('/sounds/timer-sound-15s.mp3');
    static endRound: HTMLAudioElement = new Audio('/sounds/end-round-sound.mp3');
    static selectCharacter: HTMLAudioElement = null;

    static startUp(): void {
        this.mainTheme.autoplay = true;
        this.mainTheme.loop = true;
    }

    static playTimerSound(): void {
        if (!this.soundsAreMuted) {
            this.timer15s.play();
        }
    }

    static playEndRoundSound(): void {
        if (!this.soundsAreMuted) {
            this.endRound.play();
        }
    }

    static playSelectCharacterSound(): void {
        if (!this.soundsAreMuted) {
            //create new audio as user may click it multiple times
            this.selectCharacter = new Audio('/sounds/select-character-sound.mp3');
            this.selectCharacter.play();
        }
    }

    static muteSounds(): void {
        this.soundsAreMuted = true;
        this.mainTheme.pause();
    }

    static unmuteSounds(): void {
        this.soundsAreMuted = false;
        this.mainTheme.play();
    }
}