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
        this.path = null;
        this.currentTarget = null;

        // Enable arcade physics for moving with velocity
        game.physics.arcade.enable(this);
    }

    goTo() {

            this.body.velocity.x += 32;

    }

    update(){

    }
}
    /*

    update() {
        // Stop any previous movement
        this.body.velocity.set(0);

        // If we currently have a valid target location
        if (this.currentTarget) {
            // Move towards the target
            this._moveTowards(this.currentTarget);

            // Check if we have reached the current target (within a fudge factor)
            const d = this.position.distance(this.currentTarget);
            if (d < 5) {
                // If there is path left, grab the next point. Otherwise, null the target.
                if (this.path.length > 0) this.currentTarget = this.path.shift();
                else this.currentTarget = null;
            }
        }
    }

    _moveTowards(position, maxSpeed = 200) {
        const angle = this.position.angle(position);

        // Move towards target
        const distance = this.position.distance(position);
        const targetSpeed = distance / this.game.time.physicsElapsed;
        const magnitude = Math.min(maxSpeed, targetSpeed);
        this.body.velocity.x = magnitude * Math.cos(angle);
        this.body.velocity.y = magnitude * Math.sin(angle);

        // Rotate towards target
        //this.rotation = angle + Math.PI / 2;
    }
}


  //export default FollowerSprite;
*/