///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Generic Unity class. (Need Code polishment and minor "L" movement bug solving[check 'update()' method]).
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Unity extends Phaser.Sprite {
    constructor(game, x, y, unityKey, unity, friendly) {
        super(game, x, y, unityKey);

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

            //console.log('pos X:' + this.positionX);
            //console.log('pos Y:' + this.positionY);


            //console.log(this.rigthSide);
            //console.log(this.leftSide);

            //console.log(this.friendly);

            console.log(this.otherUnities);
        });
        this.events.onInputOut.add(target => target.animations.play('default'));
        this.events.onInputOver.add(target => target.animations.play('hovered'));

    }

    setMouseAxis(mouseX, mouseY) {
        if (!this.moving && this.active) {

            this.mouseX = mouseX;
            this.mouseY = mouseY;

            this.setMaximumDistance();
        }
    }

    setMaximumDistance() {
        this.distanceX = Math.abs(this.mouseX - this.positionX);
        this.distanceY = Math.abs(this.mouseY - this.positionY);
        this.distanceL = this.distanceX + this.distanceY;
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
        if (this.body.velocity.y != 0 || this.body.velocity.x != 0) {
            this.inputEnabled = false;
            this.moving = true;
        } else {
            this.inputEnabled = true;
            this.moving = false;


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

    pathSetter() {
        if (this.mouseX != undefined && this.mouseY != undefined) {

            if (this.positionX != this.mouseX && this.positionY != this.mouseY && !this.leftCorrect && this.distanceL <= this.movement) {

                //console.log('L movement.');
                this.moveRight();
                this.moveLeft();
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

    attackOpposition() {
        if(!this.attacking){
          
        // check sprites positions X and Y
        this.otherUnities.forEach(e => {
            // if current leftSide.X and Y OR rightSide.X and Y == a oposite sprite positionX and Y AND sprite friendly != this.friendly
            if ((e.positionX == this.leftSide.x && e.positionY == this.leftSide.y) && e.friendly != this.friendly) {
                this.attacking = true;
                // deal damage  
                console.log('I\'ll kill ya in my left!!!');
                
                let damage = e.attack * this.defense;
                this.health -= damage;

                console.log(damage);
                console.log(this);
            }

            if ((e.positionX == this.rightSide.x && e.positionY == this.rightSide.y) && e.friendly != this.friendly) {
                this.attacking = true;

                console.log('I\'ll kill ya in my right!!!');

                let damage = e.attack * this.defense;
                this.health -= damage;

                console.log(damage);
                console.log(this);
            }
        });
    }
        
    }

    //obs: AI class?
    // may cause a performance bug in future because
    // its generating a loop of objects inside objects
    // maybe setting it outside of this class could solve the issue
    getUnitiesPosition(unities) {
        this.otherUnities = unities;
    }

    setPosition() {
        this.index = maps.getLayerIndex();
        this.positionX = maps.gridCoordinateConvert(this.x);
        this.positionY = maps.gridCoordinateConvert(this.y);

        this.leftSide = maps.getSurroudingSquare(this.index, this.positionX, this.positionY, 'left');
        this.rightSide = maps.getSurroudingSquare(this.index, this.positionX, this.positionY, 'right');
    }

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

    update() {

        this.setPosition();

        //////////////////////////////////////////////////////////////////////////////////////////////////////
        //Reminder: Check which side the collision is coming when
        //the strange diagonal movement when going 'L' backwards bug gets corrected.
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
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        utils.checkObjectsMapCollision(this);
        this.checkCollision();
        this.pathSetter();
        this.autoCorrect();

        //////////////////////////////////////////////////////////////////////////////////////////////////////
       
            this.attackOpposition();
        

        //this.render();

    }

    /*
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



