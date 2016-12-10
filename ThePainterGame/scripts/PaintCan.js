'use strict';

class PaintCan extends ThreeColorGameObject {
    constructor(positionOffset, targetColor) {
        super(sprites.can_red, sprites.can_green, sprites.can_blue);
        this.positionOffset = positionOffset;
        this.targetColor = targetColor;
        this.reset();
    }

    reset() {
        this.moveToTop();
        this.minVelocity = 30;
    };

    moveToTop() {
        this.position = new Vector2(this.positionOffset, -200);
        this.velocity = Vector2.zero;
    };

    update(delta) {
        super.update(delta);
        if (this.velocity.y === 0 && Math.random() < 0.01) {
            this.velocity = this.calculateRandomVelocity();
            this.color = this.calculateRandomColor();
        }

        let ball_center = Game.gameWorld.ball.center;
        let ball_position = Game.gameWorld.ball.position;
        let distance = ball_position.add(ball_center).subtractFrom(this.position).subtractFrom(this.center);

        if (Math.abs(distance.x) < this.center.x && Math.abs(distance.y) < this.center.y) {
            this.color = Game.gameWorld.ball.color;
            Game.gameWorld.ball.reset();
        }

        if (Game.gameWorld.isOutsideWorld(this.position)) {
            if (this.color === this.targetColor) {
                Game.gameWorld.score += 10;
                sounds.collect_points.play();
            }
            else {
                Game.gameWorld.lives -= 1;
            }
            this.moveToTop();
        }

        this.minVelocity += 0.01;
        this.rotation = Math.sin(this.position.y / 50) * 0.05;
    };

    calculateRandomVelocity() {
        return new Vector2(0, Math.random() * 30 + this.minVelocity);
    };

    calculateRandomColor() {
        let randomVal = Math.floor(Math.random() * 3);
        if (randomVal == 0) { return Color.red; }
        else if (randomVal == 1) { return Color.green; }
        else { return Color.blue; }
    }
}