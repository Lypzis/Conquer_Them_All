///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Generic Unity class.
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Unity extends Phaser.Sprite {
    constructor(game, x, y, unityKey, unity, id, friendly) {
        super(game, x, y, unityKey);

        this.id = id;
        this.key = unityKey;
        this.friendly = friendly;
        this.defense = unity.defense;
        this.attack = unity.attack;
        this.health = unity.health;
        this.movement = unity.movement;
        this.speed = unity.speed;
        this.chargeSpeed = unity.chargeSpeed;
        this.chargeMaxDamage = unity.chargeMaxDamage;
        this.minChargeDist = unity.minChargeDist;
        //this.morale = null; 

        this.active = false;
        this.inputEnabled = true;
        this.executePressed = false;
        this.collided = false;
        this.attacking = false;
        this.otherUnities = [];
        this.gridSize = maps.getSquareSize();
        this.walkableTile = 1;
        this.threshold = 2;

        this.index = null;
        this.positionX = null;
        this.positionY = null;
        this.leftSide = null;
        this.rightSide = null;
        this.topSide = null;
        this.bottomSide = null;
        this.distanceX = null;
        this.distanceY = null;
        this.distanceL = null;
        this.execute = null;

        this.turnPoint = new Phaser.Point();

        this.game.add.existing(this);
        // Enable arcade physics for moving with velocity
        this.game.physics.arcade.enable(this);

        this.animations.add('default', [0], 1, true);
        this.animations.add('hovered', [1], 1, true);

        this.events.onInputUp.add(target => {

            //removes from the queue list if clicked when already received an order
            if (queue.checkExists(this)) {
                queue.removeExists(this);
                this.active = false;
            } else {
                // inactivate if active else active to receive order
                this.active = this.active ? !this.active : true;
            }

            target.execute = false; // it should wait for the 'Execute Actions' signal to do its action.


            console.log('bottom ' + this.bottomMovement);
            console.log('top: ' + this.topMovement);
            console.log('right: ' + this.rightMovement);
            console.log('left: ' + this.leftMovement);
        });

        this.events.onInputOut.add(target => {
            this.check = false;
            target.animations.play('default');
        });

        this.events.onInputOver.add(target => {
            this.check = true;
            target.animations.play('hovered');
        });
    }

    /**
     * - Get and set X and Y of the place clicked by the mouse if sprite is active and not moving.
     * @param {*} mouseX : current mouse X position.
     * @param {*} mouseY : current mouse Y position.
     */
    setMouseAxis(mouseX, mouseY) {
        const limit = maps.checkAcceptableAreaLimit(mouseX, mouseY);

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        const invalidDistance = this.setMaximumDistance();

        if (!limit || invalidDistance) {
            this.active = false;
            this.mouseX = null;
            this.mouseY = null;
        } else {
            if (this.active) {
                this.active = false;
                queue.add(this);
            }
        }
    }

    /**
     * - Ensures that this won't move to a place outside its limitation movement range.
     * @returns : True, if distance is invalid.
    */
    setMaximumDistance() {
        this.distanceX = Math.abs(this.mouseX - this.positionX);
        this.distanceY = Math.abs(this.mouseY - this.positionY);
        this.distanceL = this.distanceX + this.distanceY;

        return this.distanceL > this.movement || this.distanceX > this.movement || this.distanceY > this.movement;
    }

    /**
     * - Give positive speed to move to the X right direction.
     */
    moveRight() {
        if (this.mouseX > this.positionX) {
            this.body.velocity.x = this.speed;
            this.rightMovement = true;

            console.log('right: ' + this.rightMovement);
        }
    }

    /**
     * - Give negative speed to move to the X left direction.
     */
    moveLeft() {
        if (this.mouseX < this.positionX) {
            this.body.velocity.x = -this.speed;
            this.leftMovement = true;

            console.log('left: ' + this.leftMovement);
        }
    }

    /**
     * - Give negative speed to move to the Y top direction.
     */
    moveUp() {
        if (this.mouseY < this.positionY) {
            this.body.velocity.y = -this.speed;
            this.topMovement = true;

            console.log('top: ' + this.topMovement);
        }
    }

    /**
     * - Give positive speed to move to the Y bottom direction.
     */
    moveDown() {
        if (this.mouseY > this.positionY) {
            this.body.velocity.y = this.speed;
            this.bottomMovement = true;

            console.log('bottom ' + this.bottomMovement);
        }
    }

    /**
    * - Set the its rightSide and leftSide and position X and Y in tiles squares rather than by window size axis.
    */
    setPosition() {
        this.index = maps.getLayerIndex();

        this.positionX = maps.gridCoordinateConvert(this.x);
        this.positionY = maps.gridCoordinateConvert(this.y);
    }

    /**
     * - Set in window size pixels the point clicked.
     */
    setStopPoint() {
        this.turnPoint.y = this.mouseY * this.gridSize;
        this.turnPoint.x = this.mouseX * this.gridSize;
    }

    /**
    * - Set its right, left, top and bottom adjacent square axis in tiles squares.
    */
    setSideCoordinates() {
        this.leftSide = maps.getSurroudingSquare(this.index, this.positionX, this.positionY, 'left');
        this.rightSide = maps.getSurroudingSquare(this.index, this.positionX, this.positionY, 'right');
        this.topSide = maps.getSurroudingSquare(this.index, this.positionX, this.positionY, 'top');
        this.bottomSide = maps.getSurroudingSquare(this.index, this.positionX, this.positionY, 'bottom');
    }

    /**
     * - Reset speed to 0(stops) when threshold is reached.
     */
    stopMovementTrigger() {
        if (this.lMovement && this.mouseX < this.positionX) {
            this.leftMovement = true;
            this.topMovement = true;
        }

        if (game.math.fuzzyEqual(this.turnPoint.x, this.x, this.threshold)) {
            this.body.velocity.x = 0;
        }

        if (game.math.fuzzyEqual(this.turnPoint.y, this.y, this.threshold)) {
            this.body.velocity.y = 0;
        }
    }

    /**
    * - Stops and reset mouse axis values if a wall is hitted.
    */
    checkCollision() {

        // need to check if next tile to where its heading is walkable
        // if not reset the mouseX to be the current posX 

        if (this.leftSide.index !== this.walkableTile && this.leftMovement)
            return true;
        if (this.rightSide.index !== this.walkableTile && this.rightMovement)
            return true;
        if (this.bottomSide.index !== this.walkableTile && this.bottomMovement)
            return true;
        if (this.topSide.index !== this.walkableTile && this.topMovement)
            return true;

        return false;
    }

    /**
     * - Resets the directions of where the sprite was heading when it stops moving.      
     */
    movementCheck() {
        if (this.body.velocity.y == 0 && this.body.velocity.x == 0) {
            this.lMovement = false;
            this.leftMovement = false;
            this.topMovement = false;
            this.bottomMovement = false;
            this.rightMovement = false;
        }
    }

    //obs: being called multiple times when moving to right, bottom or L in the respective directions
    /**
    * - If distance, mouseX and mouseY have valid values, verify which type of movement it needs to execute.
    */
    pathSetter() {
        if (this.mouseX != undefined && this.mouseY != undefined) {

            if (this.positionX != this.mouseX && this.positionY != this.mouseY && !this.leftMovement) {

                //console.log('L movement.');
                this.moveRight();
                this.moveLeft();
                this.lMovement = true;

            } else if (this.positionX == this.mouseX && this.positionY != this.mouseY && !this.topMovement) {

                //console.log('Vertical movement.');
                this.moveUp();
                this.moveDown();

            } else if (this.positionX != this.mouseX && this.positionY == this.mouseY && !this.leftMovement) {

                //console.log('Horizontal movement.');
                this.moveRight();
                this.moveLeft();
            }
        }

    }

    /**
    * - Cause attack damage to enemy health standing in the right or left position(1 square distance).
    */
    attackOpposition() {
        // damage only once, per turn
        if (!this.attacking) {

            // verifies other unities status in the field
            this.otherUnities.forEach(e => {
                // if there is an unity in the left side of this and is considered enemy
                if ((e.positionX == this.leftSide.x && e.positionY == this.leftSide.y) && e.friendly != this.friendly) {
                    this.attacking = true;

                    let damage = e.attack * this.defense;
                    this.health -= damage;
                }

                // if there is an unity in the right side of this and is considered enemy
                if ((e.positionX == this.rightSide.x && e.positionY == this.rightSide.y) && e.friendly != this.friendly) {
                    this.attacking = true;

                    let damage = e.attack * this.defense;
                    this.health -= damage;
                }

                if (this.health < 0)
                    this.health = 0;
            });
        }

    }

    /**
     * - Acknowledge all other unities in the field.
     */
    checkUnitiesStatus() {
        //no need to acknowledge ourselves or something dead..., that's what filter is for :D
        this.otherUnities = unities.unitiesCreated.filter(e => e.id != this.id && e.alive);
    }

    amIalive() {
        if (this.health <= 0)
            this.destroy();
    }

    executeOrder() {
        if (this.execute && queue.checkPreviousExecuted(this)) { //this.checkPreviousExecuted()
            this.pathSetter();
        }

        if (this.execute && queue.checkFinished(this)) {
            queue.safeClear();
        }

        if (this.executePressed) {
            this.attacking = false;
            this.executePressed = false;
        }
    }

    update() {
        utils.checkObjectsMapCollision(this);

        this.setPosition();
        this.setSideCoordinates();
        this.checkCollision();
        
        this.checkUnitiesStatus();
        this.setStopPoint();

        this.stopMovementTrigger();
        this.movementCheck();

        this.executeOrder();

        this.attackOpposition();
        this.amIalive();

        this.render();
    }

    //future implementation
    render() {
        let colorLeft = 'rgba(0,255,0,0.3)';
        let colorRight = 'rgba(0,255,0,0.3)';
        let colorTop = 'rgba(0,255,0,0.3)';
        let colorBottom = 'rgba(0,255,0,0.3)';

        if (this.leftSide.index !== this.walkableTile) {
            colorLeft = 'rgba(255,0,0,0.3)';
        }

        if (this.rightSide.index !== this.walkableTile) {
            colorRight = 'rgba(255,0,0,0.3)';
        }

        if (this.topSide.index !== this.walkableTile) {
            colorTop = 'rgba(255,0,0,0.3)';
        }

        if (this.bottomSide.index !== this.walkableTile) {
            colorBottom = 'rgba(255,0,0,0.3)';
        }

        //if (this.active && this.mouseX == null && this.mouseY == null) {
        game.debug.geom(new Phaser.Rectangle(this.leftSide.worldX, this.leftSide.worldY, 32, 32), colorLeft, true);
        game.debug.geom(new Phaser.Rectangle(this.rightSide.worldX, this.rightSide.worldY, 32, 32), colorRight, true);
        game.debug.geom(new Phaser.Rectangle(this.topSide.worldX, this.topSide.worldY, 32, 32), colorTop, true);
        game.debug.geom(new Phaser.Rectangle(this.bottomSide.worldX, this.bottomSide.worldY, 32, 32), colorBottom, true);
        //}

    }

}



