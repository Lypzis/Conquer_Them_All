//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Generic Unity class
*/
//////////////////////////////////////////////////////////////////////////////

class Unity extends Phaser.Sprite {
    constructor(game, x, y, unityKey) {
        super(game, x, y, unityKey);
        this.game.add.existing(this);
        this.active = false;
        this.inputEnabled = true;

        this.size = maps.getSquareSize();

        // Enable arcade physics for moving with velocity
        game.physics.arcade.enable(this);

        this.events.onInputUp.add(target => {
            target.active = true;
        });


    }

    goTo() {

        if (this.active) {
            this.body.velocity.x += 32;
            this.active = false;
            this.inputEnabled = false;
        }

    }

    update() {

        this.index = maps.getLayerIndex();
        this.positionX = game.math.snapToFloor(Math.floor(this.x), this.size) / this.size;
        this.positionY = game.math.snapToFloor(Math.floor(this.y), this.size) / this.size;


    }


}
