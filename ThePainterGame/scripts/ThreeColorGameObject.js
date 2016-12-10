'use strict';

class ThreeColorGameObject {
    constructor(sprRed, sprGreen, sprBlue) {
        this.colorRed = sprRed;
        this.colorGreen = sprGreen;
        this.colorBlue = sprBlue;
        this.currentColor = this.colorRed;
        this.velocity = Vector2.zero;
        this.position = Vector2.zero;
        this.origin = Vector2.zero;
        this.rotation = 0;
        this.visible = true;
    }

    get color() {
        if (this.currentColor === this.colorRed) {
            return Color.red;
        }
        else if (this.currentColor === this.colorGreen) {
            return Color.green;
        }
        else {
            return Color.blue;
        }
    };
    set color(value) {
        if (value === Color.red) {
            this.currentColor = this.colorRed;
        }
        else if (value === Color.green) {
            this.currentColor = this.colorGreen;
        }
        else if (value === Color.blue) {
            this.currentColor = this.colorBlue;
        }
    };

    get width() {
        return this.currentColor.width();
    };

    get height() {
        return this.currentColor.height();
    };

    get size() {
        return new Vector2(this.currentColor.width, this.currentColor.height);
    };

    get center() {
        return new Vector2(this.currentColor.width/2, this.currentColor.height/2);
    };

    update(delta) {
        this.position.addTo(this.velocity.multiply(delta));
    };

    draw() {
        if (!this.visible) { return; }
        Canvas2D.drawImage(this.currentColor, this.position, this.rotation, 1, this.origin);
    };
}