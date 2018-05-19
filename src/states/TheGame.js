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
        utils.centerGameObjects([this.titleText]);

        utils.navItemSetter('<- Back', 1, 90, target => {
            this.mouseX = null;
            this.mouseY = null;
            this.warriors = null;
            this.hero = null;
            this.enemyHero = null;
            this.enemyWarriors = null;
            this.layer = null;

            game.state.start('GameMenu');
        }, null, true);

        ////////////////////////////////////////////////////////////////////////////////
        // Creates the table, each level should receive a different map(consideration of levels classes)
        // and then charge the level in this class
        maps.loadMap('tilemap');

        this.warriors = utils.generateTableUnities('warrior-icon', 1, 0, true);
        this.hero = utils.generateTableUnities('hero-icon', 1, 1, true);

        this.enemyHero = utils.generateTableUnities('enemy-hero-icon', 1, 3, false);
        this.enemyWarriors = utils.generateTableUnities('enemy-warrior-icon', 1, 4, false);

        this.layer = maps.getLayer();
    }

    onClick() {

        // On click
        game.input.onDown.add(() => {
            this.mouseX = maps.gridCoordinateConvert(game.input.x);
            this.mouseY = maps.gridCoordinateConvert(game.input.y);

            /*
            this.warriors.forEach(e => {

                e.setMouseAxis(this.mouseX, this.mouseY);

            });
            

            console.log('mouse X:' + this.mouseX);
            console.log('mouse Y:' + this.mouseY);
            */

            this.warriors[0].setMouseAxis(this.mouseX, this.mouseY);
            this.hero[0].setMouseAxis(this.mouseX, this.mouseY);

            this.enemyWarriors[0].setMouseAxis(this.mouseX, this.mouseY);
            this.enemyHero[0].setMouseAxis(this.mouseX, this.mouseY);


        });
    }

    create() {

        this.init();
        this.onClick();

    }


}



