class Canvas {
    constructor() {
        this.canvas = null;
        this.ctx = null;
    }

    initialize(canvasName) {
        this.canvas = document.getElementById(canvasName);
        this.ctx = this.canvas.getContext('2d');
    };

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawImage(sprite, position = Vector2.zero, rotation = 0, scale = 1, origin = Vector2.zero) {
        this.ctx.save();
        this.ctx.translate(position.x, position.y);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x * scale, -origin.y * scale, sprite.width * scale, sprite.height * scale);
        this.ctx.restore();
    };

    drawText(text, position=Vector2.zero, color=Color.white, textAlign ='top', fontName ='Courier New', fontSize ='20px') {
        this.ctx.save();
        this.ctx.translate(position.x, position.y);
        this.ctx.textBaseline = 'top';
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontSize} ${fontName}`;
        this.ctx.textAlign = textAlign;
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();
    };
}

let Canvas2D = new Canvas();