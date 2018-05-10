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

        utils.navItemSetter('<- Back', 1, 90, target => game.state.start('GameMenu'), null, true);

        ////////////////////////////////////////////////////////////////////////////////
        // Creates the table, each level should receive a different map(consideration of levels classes)
        // and then charge the level in this class
        maps.loadMap('tilemap');

        this.warriors = utils.generateTableUnities('warrior-icon', 4, 0);
        //this.warriors2 = utils.generateTableUnities('warrior-icon', 3, 1);

        this.layer = maps.getLayer();
    }

    onClick() {

        // On click
        game.input.onDown.add(() => {
            this.mouseX = maps.gridCoordinateConvert(game.input.x);
            this.mouseY = maps.gridCoordinateConvert(game.input.y);

            console.log('mouse x: ' + this.mouseX);
            console.log('mouse y: ' + this.mouseY);

            this.warriors.forEach(e => {

                e.goTo(this.mouseX, this.mouseY);

            });

        });
    }

    create() {

        this.init();
        this.onClick();

    }

    update() {

        // check for collisions with tablemap obstacles
        utils.checkObjectsMapCollision(this.warriors);

    }

}



