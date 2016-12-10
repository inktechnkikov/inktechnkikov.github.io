'use strict';

class Sound {
    constructor(sound, looping = false) {
        this.looping = looping;
        this.snd = new Audio();
        this.snd.volume = 0.1;

        if (this.snd.canPlayType('audio/ogg')) {
            this.snd.src = `${sound}.ogg`;
        }
        else {
            this.snd.src = `${sound}.mp3`;
        }
    }

    get volume() {
        return this.snd.volume;
    };
    set volume(value) {
        this.snd.volume = value;
    };

    play() {
        if (this.snd === null) { return; }
        this.snd.load();
        this.snd.autoplay = true;
        if (!this.looping) { return; }
        this.snd.addEventListener('ended', function() {
            this.load();
            this.autoplay = true;
        }, false);
    };
}