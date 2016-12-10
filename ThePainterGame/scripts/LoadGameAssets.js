function loadGameAssets() {
    let folder = 'scripts/';
        $LAB.script(`${folder}Vector2.js`).wait()
            .script(`${folder}Keyboard.js`).wait()
            .script(`${folder}Mouse.js`).wait()
            .script(`${folder}Canvas2D.js`).wait()
            .script(`${folder}Sound.js`).wait()
            .script(`${folder}ColorsAndKeys.js`).wait()
            .script(`${folder}Game.js`).wait()
            .script(`${folder}ThreeColorGameObject.js`).wait()
            .script(`${folder}Cannon.js`).wait()
            .script(`${folder}Ball.js`).wait()
            .script(`${folder}PaintCan.js`).wait()
            .script(`${folder}PainterGameWorld.js`).wait()
            .script(`${folder}Painter.js`).wait(function() {
                Game.start('mycanvas', 800, 480);
            }); 
}

loadGameAssets();