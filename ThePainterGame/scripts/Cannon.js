'use strict';

class Cannon extends ThreeColorGameObject {
    constructor() {
        super(sprites.cannon_red, sprites.cannon_green, sprites.cannon_blue);
        this.position = new Vector2(72, 405);
        this.origin = new Vector2(34, 34);
    }

    get ballPosition() {
        let opposite = Math.sin(this.rotation) * sprites.cannon_barrel.width * 0.6;
        let adjacent = Math.cos(this.rotation) * sprites.cannon_barrel.width * 0.6;
        return new Vector2(this.position.x + adjacent, this.position.y + opposite);
    };

    reset() {
        this.position = new Vector2(72, 405);
    };

    handleInput(delta) {
        if (Keyboard.keyDown === Keys.R) {
            this.color = Color.red;
        }
        else if (Keyboard.keyDown === Keys.G) {
            this.color = Color.green;
        }
        else if (Keyboard.keyDown === Keys.B) {
            this.color = Color.blue;
        }

        let opposite = Mouse.position.y - this.position.y;
        let adjacent = Mouse.position.x - this.position.x;
        this.rotation = Math.atan2(opposite, adjacent);
    };

    draw() {
        if (!this.visible) { return; }
        let colorPosition = this.position.subtract(this.size.divideBy(2));
        Canvas2D.drawImage(sprites.cannon_barrel, this.position, this.rotation, 1, this.origin);
        Canvas2D.drawImage(this.currentColor, colorPosition);
    };
}