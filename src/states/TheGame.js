//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Load a level into the game Window ( No levels yet )
*/
//////////////////////////////////////////////////////////////////////////////

class TheGame {

    init() {
        this.titleText = game.add.text(game.world.centerX, 100, "Game", styles.lightHeader());

        this.executeActionsBtn = this.add.button(
            this.world.centerX,
            this.world.height - 48,
            'execute-btn',
            this.executeActions,
            this, 1, 0, 2, 0);

        utils.centerGameObjects([this.titleText, this.executeActionsBtn]);

        utils.navItemSetter('<- Back', 1, 90, target => {
            this.unities = null;
            this.mouseX = null;
            this.mouseY = null;
            this.warriors = null;
            this.hero = null;
            this.enemyHero = null;
            this.enemyWarriors = null;
            this.layer = null;
            //this.limits = null;
            this.executeActionsBtn = null;

            game.state.start('GameMenu');
        }, null, true);

        ////////////////////////////////////////////////////////////////////////////////
        // Creates the table, each level should receive a different map(consideration of levels classes)
        // and then charge the level in this class
        maps.loadMap('tilemap');

        this.warriors = utils.generateTableUnities('warrior-icon', 1, 0, true);
        this.hero = utils.generateTableUnities('hero-icon', 1, 1, true);

        this.enemyHero = utils.generateTableUnities('enemy-hero-icon', 1, 3, false);
        this.enemyWarriors = utils.generateTableUnities('enemy-warrior-icon', 2, 4, false);

        this.unities = Array.prototype.concat(
            this.enemyHero,
            this.hero,
            this.enemyWarriors,
            this.warriors
        );

        this.executeActionsOrder = [];

        this.layer = maps.getLayer();

        /////////////////////////////////////////////////////////////////////
        //Queue tests
        /*
        //adding
        queue.add(this.unities[0]);
        queue.add(this.unities[0]);
        //console.log(queue.activated);

        //removing
        console.log('removed: ' + this.unities[2].id);
        queue.add(this.unities[1]);
        queue.add(this.unities[2]);
        console.log(queue.activated);
        queue.removeExists(this.unities[2]);
        console.log('removed: ' + this.unities[0].id);
        queue.removeExists(this.unities[0]);
        queue.removeExists(this.unities[0]);
        console.log(queue.activated);
        */
        ////////////////////////////////////////////////////////////////////
    }

    onClick() {
        // On click
        game.input.onDown.add(() => {
            // capture click axis
            this.mouseX = maps.gridCoordinateConvert(game.input.x);
            this.mouseY = maps.gridCoordinateConvert(game.input.y);

            //this.limits = maps.checkAcceptableAreaLimit(this.mouseX, this.mouseY);

            // gets the id of the activated object
            this.unities.forEach(e => {
                if (e.active) {
                    e.setMouseAxis(this.mouseX, this.mouseY);
                    //this.executeActionsOrder.push(e);
                }
            });


        });
    }

    // unities that have been given a proper place to go will now be ordered to move to it
    executeActions() {

        queue.activated.forEach(e => {
            if (e.mouseX != null && e.mouseY != null) {
                e.execute = true;
            }
        });

        queue.activated = [];
        
    }

    create() {
        this.init();
        this.onClick();
    }

    update() {
        //this.doneExecuting = this.unities.map(e => e.done);

        //need avoid this loop, ...somehow
        //possible performance hit
        this.unities.forEach(e => {
            e.getUnitiesPosition(this.unities);
        });

    }
}


