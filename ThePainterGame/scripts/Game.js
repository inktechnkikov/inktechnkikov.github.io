let requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000/60);
        };
})();

class GameObject {
    constructor() {
        this._totalTime = 0;
        this.size = null;
        this.spritesStillLoading = 0;
        this.gameWorld = null;
    }

    get totalTime() {
        return this._totalTime;
    };

    start(canvasName, x, y) {
        this.size = new Vector2(x, y);

        Canvas2D.initialize(canvasName);
        this.loadAssets();
        this.assetLoadingLoop();
    };

    initialize() {

    };

    loadAssets() {

    };

    loadSprite(imageName) {
        let image = new Image();
        image.src = imageName;
        this.spritesStillLoading += 1;
        image.onload = function() {
            Game.spritesStillLoading -= 1;
        };
        return image;
    };

    assetLoadingLoop() {
        if (!this.spritesStillLoading > 0) {
            requestAnimationFrame(Game.assetLoadingLoop);
        }
        else {
            Game.initialize();
            requestAnimationFrame(Game.mainLoop);
        }
    };

    mainLoop() {
        let delta = 1 / 60;
        Game.gameWorld.handleInput(delta);
        Game.gameWorld.update(delta);
        Canvas2D.clear();
        Game.gameWorld.draw();

        Mouse.reset();
        requestAnimationFrame(Game.mainLoop);
    };
}

let Game = new GameObject();