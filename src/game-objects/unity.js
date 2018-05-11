//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Generic Unity class (Failing)
*/
//////////////////////////////////////////////////////////////////////////////

class Unity extends Phaser.Sprite {
    constructor(game, x, y, unityKey) {
        super(game, x, y, unityKey);
        this.game.add.existing(this);

        this.inputEnabled = true;

        this.gridSize = maps.getSquareSize();

        // Enable arcade physics for moving with velocity
        game.physics.arcade.enable(this);

        this.events.onInputUp.add(target => {
            this.active = true;
        });

    }

    goTo(mouseX, mouseY) {

        if (!this.moving && this.active) {
            this.mouseX = mouseX;
            this.mouseY = mouseY;

            this.moveX();
            this.moveY();

            this.active = false;
        }

    }

    moveX() {
        if (this.mouseX > this.positionX) {

            this.body.velocity.x += 50;
            //this.inputEnabled = false;
            this.rightCorrect = true;

        } else if (this.mouseX < this.positionX) {

            this.mouseX -= 1;
            this.body.velocity.x -= 50;
            //this.inputEnabled = false;
            this.leftCorrect = true;
        }

    }

    moveY() {
        if (this.mouseY > this.positionY) {

            this.body.velocity.y += 50;
            //this.inputEnabled = false;
            this.bottomCorrect = true;

        } else if (this.mouseY < this.positionY) {

            this.mouseY -= 1;
            this.body.velocity.y -= 50;
            //this.inputEnabled = false;
            this.topCorrect = true;
        }
    }

    leftCorrection() {
        if (this.leftCorrect) {
            this.x += 2;

            this.leftCorrect = false;
        }
    }

    topCorrection() {
        if (this.topCorrect) {
            this.y += 2;

            this.topCorrect = false;
        }
    }

    rightCorrection() {
        if (this.rightCorrect) {
            this.x -= 1;

            this.rightCorrect = false;
        }
    }

    bottomCorrection() {
        if (this.bottomCorrect) {
            this.y -= 1;

            this.bottomCorrect = false;
        }
    }

    update() {

        this.index = maps.getLayerIndex();
        this.positionX = maps.gridCoordinateConvert(this.x);
        this.positionY = maps.gridCoordinateConvert(this.y);

        // try check by column number instead of mouse position
        if (utils.checkObjectsMapCollision(this) || this.positionX == this.mouseX) {
            this.body.velocity.x = 0;
        }

        if (utils.checkObjectsMapCollision(this) || this.positionY == this.mouseY) {
            this.body.velocity.y = 0;
        }

        if (this.body.velocity.y != 0 || this.body.velocity.x != 0) {
            this.inputEnabled = false;
            this.moving = true;
        } else {
            this.inputEnabled = true;
            this.moving = false;

            this.topCorrection();   
            this.leftCorrection();
            this.bottomCorrection();
            this.rightCorrection();
        }

    }

}
