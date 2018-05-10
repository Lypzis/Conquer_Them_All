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

        this.active = false;

        this.inputEnabled = true;

        this.gridSize = maps.getSquareSize();

        // Enable arcade physics for moving with velocity
        game.physics.arcade.enable(this);

        this.events.onInputUp.add(target => {
            target.active = true;
        });


    }

    // bug when going backwards
    goTo(mouseX, mouseY) {

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        if (this.active) {

            this.moveX();

            this.moveY();
        }

    }

    moveX() {
        if (this.mouseX > this.positionX) {

            //tests


            this.body.velocity.x += 50;
            //this.active = false;
            this.inputEnabled = false;

        } else if (this.mouseX < this.positionX) {
            
            // tests
            //this.mouseX -= 1;
            //this.width = -this.width;


            this.body.velocity.x -= 50;
            //this.active = false;
            this.inputEnabled = false;
        } else {
            this.active = false;
        }

    }

    // find a way to only move y axis when done moving x
    moveY() {
        if (this.mouseY > this.positionY) {




            this.body.velocity.y += 50;
            this.active = false;
            this.inputEnabled = false;

            console.log(this.positionY);

        } else if (this.mouseY < this.positionY) {
            
            //tests
            //this.mouseY -= 1; 

            this.body.velocity.y -= 50;
            this.active = false;
            this.inputEnabled = false;

            console.log(this.positionY);

        } else {
            this.active = false;
        }

    }

    positionCorrectorX(){
        this.x -= 1;
    }

    positionCorrectorY(){
        this.y -= 1;
    }

    update() {

        this.index = maps.getLayerIndex();
        this.positionX = maps.gridCoordinateConvert(this.x);
        this.positionY = maps.gridCoordinateConvert(this.y);

        // try check by column number instead of mouse position


        

        if (utils.checkObjectsMapCollision(this) || this.positionX == this.mouseX) { 
            this.body.velocity.x = 0;
            this.inputEnabled = true;
            this.positionCorrectorX();
        }

        if (utils.checkObjectsMapCollision(this) || this.positionY == this.mouseY) {
            this.body.velocity.y = 0;
            this.inputEnabled = true;  // change later
            this.positionCorrectorY();
        }


    }


}
