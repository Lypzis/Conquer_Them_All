///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Generic Unity class.
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Obs: bugs queue when moving vertically(URGENT);
// Obs: bugs queue when this dies in last position(URGENT);

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
        this.gridSize = maps.getSquareSize(); //???
        this.walkableTile = 1; // ???
        this.threshold = 2;

        this.index = maps.getLayerIndex();
        this.positionX = maps.gridCoordinateConvert(this.x);
        this.positionY = maps.gridCoordinateConvert(this.y);

        this.availableCoordinates = maps.availableCoordinates(this.positionX, this.positionY, this.movement);
        this.coordinateMarker = null;

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
            } else {
                // inactivate if active else active to receive order
                if (this.active) {
                    this.active = !this.active;
                } else {
                    this.highlightCoordinates = utils.drawCoordinates(this.availableCoordinates); //
                    this.active = true;
                }
            }

            target.execute = false; // it should wait for the 'Execute Actions' signal to do its action.
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
        this.mouseX = mouseX;
        this.mouseY = mouseY;

        const invalidDistance = this.checkDistanceLimit();

        if (invalidDistance) {
            this.active = false;
            this.mouseX = null;
            this.mouseY = null;
        } else {
            if (this.active) {
                this.active = false;
                this.setCoordinateMarker();
                queue.add(this);
            }
        }

        this.highlightCoordinates.forEach(e => e.destroy());
        this.highlightCoordinates = null;
    }

    /**
    * - Sets a marker to a valid clicked position from one of the highlighted coordinates.
   */
    setCoordinateMarker() {
        this.coordinateMarker = this.highlightCoordinates.find(e =>
            e.x / this.gridSize == this.mouseX &&
            e.y / this.gridSize == this.mouseY
        );

        const x = maps.gridCoordinateConvert(this.coordinateMarker.x);
        const y = maps.gridCoordinateConvert(this.coordinateMarker.y);

        if (this.coordinateMarker != undefined && !(this.positionX == x && this.positionY == y)) {
            this.highlightCoordinates.splice(this.highlightCoordinates.indexOf(this.coordinateMarker), 1);
        }
    }

    /**
     * - Ensures that this won't move to a place outside its limitation movement range or above other unity.
     * @returns : True, if coordinate is out of range.
    */
    checkDistanceLimit() {
        const coordinate = this.availableCoordinates.find(e => e.x == this.mouseX && e.y == this.mouseY);
        let notTaken;

        if (coordinate != undefined)
            notTaken = this.otherUnities.find(e => e.positionX == coordinate.x && e.positionY == coordinate.y);

        if (coordinate != undefined && notTaken == undefined) {
            notTaken = null;
            return false;
        }

        notTaken = null;

        return true;
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
        if (game.math.fuzzyEqual(this.turnPoint.x, this.x, this.threshold)) {
            this.body.velocity.x = 0;
        }

        if (game.math.fuzzyEqual(this.turnPoint.y, this.y, this.threshold)) {
            this.body.velocity.y = 0;
        }
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

    /**
     * - Give positive speed to move to the X right direction.
     */
    moveRight() {
        this.body.velocity.x = this.speed;
        this.rightMovement = true;
    }

    /**
     * - Give negative speed to move to the X left direction.
     */
    moveLeft() {
        this.body.velocity.x = -this.speed;
        this.leftMovement = true;
    }

    /**
     * - Give negative speed to move to the Y top direction.
     */
    moveUp() {
        this.body.velocity.y = -this.speed;
        this.topMovement = true;
    }

    /**
     * - Give positive speed to move to the Y bottom direction.
     */
    moveDown() {
        this.body.velocity.y = this.speed;
        this.bottomMovement = true;
    }

    movementIdentifier() {
        if (this.positionX != this.mouseX && this.positionY != this.mouseY) {
            this.lMovement = true;
            return 'l';
        }

        if (this.positionY != this.mouseY && this.positionX == this.mouseX && !this.lMovement) {
            return 'vertical';
        }

        if (this.positionX != this.mouseX && this.positionY == this.mouseY) {
            return 'horizontal';
        }

        return null;
    }

    directionIdentifier() {
        const movement = this.movementIdentifier();

        if (movement != null) {
            //console.log(movement);
            switch (movement) {
                case 'l':
                    if (this.mouseX > this.positionX) {
                        this.direction = this.rightSide;
                    } else if (this.mouseX < this.positionX) {
                        this.direction = this.leftSide;
                    }
                    break;
                case 'vertical':
                    if (this.mouseY < this.positionY) {
                        this.direction = this.topSide;
                    } else if (this.mouseY > this.positionY) {
                        this.direction = this.bottomSide;
                    }
                    break;
                case 'horizontal':
                    if (this.mouseX > this.positionX) {
                        this.direction = this.rightSide;
                    } else if (this.mouseX < this.positionX) {
                        this.direction = this.leftSide;
                    }
            }
        }
    }

    checkObstacle(side) {
        switch (side) {
            case this.leftSide:
                if (side.index !== this.walkableTile || this.checkUnity(this.direction)) {
                    this.mouseX = this.positionX;
                    return false;
                }
                break;
            case this.rightSide:
                if (side.index !== this.walkableTile || this.checkUnity(this.direction)) {
                    this.mouseX = this.positionX;
                    return false;
                }
                break;
            case this.topSide:
                if (side.index !== this.walkableTile || this.checkUnity(this.direction)) {
                    this.mouseY = this.positionY;
                    return false;
                }
                break;
            case this.bottomSide:
                if (side.index !== this.walkableTile || this.checkUnity(this.direction)) {
                    this.mouseY = this.positionY;
                    return false;
                }
        }

        return side.index === this.walkableTile;
    }

    checkUnity(side) {
        let temp;

        if (side != undefined) {
            temp = this.otherUnities.find(e => e.positionX == side.x && e.positionY == side.y);
        }

        if (temp != undefined) {
            return true;
        }

        return false;
    }

    pathSetter() {
        this.directionIdentifier();

        if (this.checkObstacle(this.direction)) {
            switch (this.direction) {
                case (this.topSide):
                    this.moveUp();
                    break;
                case (this.bottomSide):
                    this.moveDown();
                    break;
                case (this.rightSide):
                    this.moveRight();
                    break;
                case (this.leftSide):
                    this.moveLeft();
                    break;
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
        if (this.health <= 0) {
            queue.removeExists(this);
            this.destroy();
        }
    }

    executeOrder() {
        if (this.execute && queue.checkPreviousExecuted(this)) {
            this.pathSetter();
        }

        if (this.execute && queue.checkFinished(this)) { //Bugsy Bugs here if the last one dies
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

        this.checkUnitiesStatus();
        this.setStopPoint();

        this.stopMovementTrigger();
        this.movementCheck();

        this.executeOrder();

        this.attackOpposition();
        this.amIalive();
    }
}