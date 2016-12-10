'use strict';

class Ball extends ThreeColorGameObject {
    constructor() {
        super(sprites.ball_red, sprites.ball_green, sprites.ball_blue);
        this.shooting = false;
        this.reset();
    }

    handleInput(delta) {
        if (Mouse.leftPressed && !this.shooting) {
            this.shooting = true;
            this.velocity = Mouse.position.subtract(this.position).multiplyWith(1.2);
            sounds.shoot_paint.play();
        }
    };

    update(delta) {
        if (this.shooting) {
            this.velocity.x *= 0.99;
            this.velocity.y += 6;
            super.update(delta);
        }
        else {
            this.color = Game.gameWorld.cannon.color;
            this.position = Game.gameWorld.cannon.ballPosition.subtractFrom(this.center);
        }

        if (Game.gameWorld.isOutsideWorld(this.position)) {
            this.reset();
        }
    };

    reset() {
        this.position = new Vector2(65, 390);
        this.shooting = false;
    };
}