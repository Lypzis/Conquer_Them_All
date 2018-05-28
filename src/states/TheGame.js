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

        this.executeActions = this.add.button(
            this.world.centerX,
            this.world.height - 48,
            'execute-btn',
            () => {
                console.log('button pressed!');
            }
            , this, 1, 0, 2, 0);

        utils.centerGameObjects([this.titleText, this.executeActions]);

        utils.navItemSetter('<- Back', 1, 90, target => {
            this.unities = null;
            this.mouseX = null;
            this.mouseY = null;
            this.warriors = null;
            this.hero = null;
            this.enemyHero = null;
            this.enemyWarriors = null;
            this.layer = null;
            this.executeActions = null;

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

        this.layer = maps.getLayer();
    }

    onClick() {

        //console.log(maps.getWalkableArea());

        // On click
        game.input.onDown.add(() => {
            this.mouseX = maps.gridCoordinateConvert(game.input.x);
            this.mouseY = maps.gridCoordinateConvert(game.input.y);

            this.unities.forEach(e => {
                e.getUnitiesPosition(this.unities);
                e.setMouseAxis(this.mouseX, this.mouseY);
            });
        });

    }

    create() {

        this.init();
        this.onClick();

    }

    update() {

        //need avoid this loop, ...somehow
        //possible performance hit
        this.unities.forEach(e => {
            e.getUnitiesPosition(this.unities);
        });

    }
}


