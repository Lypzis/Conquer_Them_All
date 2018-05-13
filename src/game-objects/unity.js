///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Generic Unity class. (Need Code polishment and minor "L" movement bug solving[check 'update()' method]).
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Unity extends Phaser.Sprite {
    constructor(game, x, y, unityKey) {
        super(game, x, y, unityKey);
        this.game.add.existing(this);

        this.inputEnabled = true;

        this.speed = 50;

        this.gridSize = maps.getSquareSize();

        // Enable arcade physics for moving with velocity
        game.physics.arcade.enable(this);

        this.events.onInputUp.add(target => {
            this.active = true;

            console.log('pos X:' + this.positionX);
            console.log('pos Y:' + this.positionY);
        });

    }

    setMouseAxis(mouseX, mouseY) {
        if (!this.moving && this.active) {
            this.mouseX = mouseX;
            this.mouseY = mouseY;
        }
    }

    moveRight() {
        if (this.mouseX > this.positionX) {

            this.body.velocity.x = this.speed;
            this.rightCorrect = true;

        }
    }

    moveLeft() {
        if (this.mouseX < this.positionX) {

            this.body.velocity.x = -this.speed;
            this.leftCorrect = true;
        }
    }

    moveUp() {
        if (this.mouseY < this.positionY) {

            this.body.velocity.y = -this.speed;
            this.topCorrect = true;
        }
    }

    moveDown() {
        if (this.mouseY > this.positionY) {

            this.body.velocity.y = this.speed;
            this.bottomCorrect = true;

        }
    }

    autoCorrect() {

        if (this.leftCorrect) {
            this.x += 2;

            this.leftCorrect = false;
        }

        if (this.topCorrect) {
            this.y += 2;

            this.topCorrect = false;
        }

        if (this.rightCorrect) {
            this.x -= 1;

            this.rightCorrect = false;
        }

        if (this.bottomCorrect) {
            this.y -= 1;

            this.bottomCorrect = false;
        }
    }

    pathSetter() {
        if (this.mouseX != undefined && this.mouseY != undefined) {

            if (this.positionX != this.mouseX && this.positionY != this.mouseY && !this.leftCorrect) {

                console.log('L movement.');
                this.moveRight();
                this.moveLeft();

                this.active = false;

            }else if (this.positionX == this.mouseX && this.positionY != this.mouseY && !this.topCorrect) { 

                console.log('Vertical movement.');
                this.moveUp();
                this.moveDown();
                this.active = false;

            } else if (this.positionX != this.mouseX && this.positionY == this.mouseY && !this.leftCorrect) {

                console.log('Horizontal movement.');
                this.moveRight();
                this.moveLeft();
                this.active = false;
            }
        }

    }

    update() {

        this.index = maps.getLayerIndex();
        this.positionX = maps.gridCoordinateConvert(this.x);
        this.positionY = maps.gridCoordinateConvert(this.y);


        //////////////////////////////////////////////////////////////////////////////////////////////////////
        //Reminder: Check which side the collision is coming when
        //the strange diagonal movement when going 'L' backwards bug gets corrected.
        if (utils.checkObjectsMapCollision(this) || this.positionX == this.mouseX && !this.leftCorrect) {
            this.body.velocity.x = 0;
        } else if (utils.checkObjectsMapCollision(this) || this.positionX == this.mouseX - 1) {
            this.body.velocity.x = 0;
        }

        if (utils.checkObjectsMapCollision(this) || this.positionY == this.mouseY && !this.topCorrect) {
            this.body.velocity.y = 0;
        } else if (utils.checkObjectsMapCollision(this) || this.positionY == this.mouseY - 1) {
            this.body.velocity.y = 0;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////


        this.pathSetter(); 

        if (this.body.velocity.y != 0 || this.body.velocity.x != 0) {
            this.inputEnabled = false;
            this.moving = true;
        } else {
            this.inputEnabled = true;
            this.moving = false;

            this.autoCorrect();
        }

    }

}
