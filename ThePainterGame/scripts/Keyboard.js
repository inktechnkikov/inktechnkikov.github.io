'use strict';

function handleKeyDown(evt) {
    Keyboard.keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
}

class Keyboard_Input {
    constructor() {
        this.keyDown = -1;
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
    }

    down(key) {
        return this.keyDown === key;
    };
}

let Keyboard = new Keyboard_Input();