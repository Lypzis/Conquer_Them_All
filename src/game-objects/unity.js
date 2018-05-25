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

        this.inputEnabled = true;
        this.collided = false;
        this.attacking = false;
        this.otherUnities = [];
        this.gridSize = maps.getSquareSize();
        this.walkableTile = 1;

        this.game.add.existing(this);
        // Enable arcade physics for moving with velocity
        this.game.physics.arcade.enable(this);

        this.animations.add('default', [0], 1, true);
        this.animations.add('hovered', [1], 1, true);

        this.events.onInputUp.add(target => {
            this.active = true;

            console.log(this);
        });
        this.events.onInputOut.add(target => target.animations.play('default'));
        this.events.onInputOver.add(target => target.animations.play('hovered'));

    }

    /**
     * - Get and set X and Y of the place clicked by the mouse if sprite is active and not moving.
     * @param {*} mouseX : current mouse X position.
     * @param {*} mouseY : current mouse Y position.
     */ 
    setMouseAxis(mouseX, mouseY) {
        if (!this.moving && this.active) {
            this.mouseX = mouseX;
            this.mouseY = mouseY;
            this.setMaximumDistance();
        }
    }

    /**
     * - Ensures that this won't move to a place outside its limitation movement range.
     */ 
    setMaximumDistance() {
        this.distanceX = Math.abs(this.mouseX - this.positionX);
        this.distanceY = Math.abs(this.mouseY - this.positionY);
        this.distanceL = this.distanceX + this.distanceY;
    }

    /**
     * - Give positive speed to move to the X right direction.
     */ 
    moveRight() {
        if (this.mouseX > this.positionX) {
            this.body.velocity.x = this.speed;
            this.rightCorrect = true;
        }
    }

    /**
     * - Give negative speed to move to the X left direction.
     */ 
    moveLeft() {
        if (this.mouseX < this.positionX) {
            this.body.velocity.x = -this.speed;
            this.leftCorrect = true;
        }
    }

    /**
     * - Give negative speed to move to the Y top direction.
     */ 
    moveUp() {
        if (this.mouseY < this.positionY) {
            this.body.velocity.y = -this.speed;
            this.topCorrect = true;
        }
    }

    /**
     * - Give positive speed to move to the Y bottom direction.
     */ 
    moveDown() {
        if (this.mouseY > this.positionY) {
            this.body.velocity.y = this.speed;
            this.bottomCorrect = true;
        }
    }

    /**
     * - The sprite deslocate itself from the center of the square after it moves, this adjust him back when it stops moving.
     */ 
    autoCorrect() {
        if (this.body.velocity.y != 0 || this.body.velocity.x != 0) {
            this.inputEnabled = false;
            this.moving = true;
        } else {
            this.inputEnabled = true;
            this.moving = false;
            this.lCorrect = false;

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
    }

    //obs: being called multiple times when moving to right, bottom or L in the respective directions
     /**
     * - If distance, mouseX and mouseY have valid values, verify which type of movement it needs to execute.
     */ 
    pathSetter() {
        if (this.mouseX != undefined && this.mouseY != undefined) {

            if (this.positionX != this.mouseX && this.positionY != this.mouseY && !this.leftCorrect && this.distanceL <= this.movement) {

                //console.log('L movement.');
                this.moveRight();
                this.moveLeft();
                this.lCorrect = true;
                this.active = false;

            } else if (this.positionX == this.mouseX && this.positionY != this.mouseY && !this.topCorrect && this.distanceY <= this.movement) {

                //console.log('Vertical movement.');
                this.moveUp();
                this.moveDown();
                this.active = false;

            } else if (this.positionX != this.mouseX && this.positionY == this.mouseY && !this.leftCorrect && this.distanceX <= this.movement) {

                //console.log('Horizontal movement.');
                this.moveRight();
                this.moveLeft();
                this.active = false;

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

                // if thre is an unity in the right side of this and is considered enemy
                if ((e.positionX == this.rightSide.x && e.positionY == this.rightSide.y) && e.friendly != this.friendly) {
                    this.attacking = true;

                    let damage = e.attack * this.defense;
                    this.health -= damage;
                }
            });
        }

    }

    /**
     * - Acknowledge all other unities in the field.
     * @param {*} unities : array of all current unities created.
     */ 
    getUnitiesPosition(unities) {
        //no need to acknowledge ourselves, that's what filter is for :D
        this.otherUnities = unities.filter(e => e.id != this.id);
    }

     /**
     * - Set the its rightSide and leftSide and position X and Y in tiles squares rather than by window size axis, this makes easier for positioning.
     */ 
    setPosition() {
        this.index = maps.getLayerIndex();
        this.positionX = maps.gridCoordinateConvert(this.x);
        this.positionY = maps.gridCoordinateConvert(this.y);

        // the right and left square coordinates of this.
        this.leftSide = maps.getSurroudingSquare(this.index, this.positionX, this.positionY, 'left');
        this.rightSide = maps.getSurroudingSquare(this.index, this.positionX, this.positionY, 'right');
    }

    /**
     * - Stops and reset mouse axis values if a wall is hitted.
     */
    checkCollision() {
        // stop trying to move
        if (this.collided) {
            this.mouseX = null;
            this.mouseY = null;
            this.body.velocity.y = 0;
            this.body.velocity.x = 0;

            this.collided = false;
        }
    }

    /**
     * - Reset speed to 0(stops) when this position axis is equals to the mouse axis given.
     */
    stopMovementTrigger() {
        if (this.lCorrect && this.mouseX < this.positionX) {
            this.leftCorrect = true;
            this.topCorrect = true;
        }

        if (this.positionX == this.mouseX && !this.leftCorrect) {
            this.body.velocity.x = 0;
        } else if (this.positionX == this.mouseX - 1) {
            this.body.velocity.x = 0;
        }

        if (this.positionY == this.mouseY && !this.topCorrect) { 
            this.body.velocity.y = 0;
        } else if (this.positionY == this.mouseY - 1) {
            this.body.velocity.y = 0;
        }
    }

    update() {

        utils.checkObjectsMapCollision(this);

        this.setPosition();
        this.checkCollision();
        this.stopMovementTrigger();
        this.pathSetter(); // now here;
        this.autoCorrect();
        this.attackOpposition();

        //this.render();
    }

    /*
    //future implementation
    render() {
        let colorLeft = 'rgba(0,255,0,0.3)';
        let colorRight = 'rgba(0,255,0,0.3)';

        if (this.leftSide.index !== this.walkableTile) {
            colorLeft = 'rgba(255,0,0,0.3)';
        }

        if (this.rigthSide.index !== this.walkableTile) {
            colorRight = 'rgba(255,0,0,0.3)';
        }

        game.debug.geom(new Phaser.Rectangle(this.leftSide.worldX, this.leftSide.worldY, 32, 32), colorLeft, true);
        game.debug.geom(new Phaser.Rectangle(this.rigthSide.worldX, this.rigthSide.worldY, 32, 32), colorRight, true);
            
    }
    */
}



