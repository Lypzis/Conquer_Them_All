//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
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
        // Creates the table
        this.map = game.add.tilemap('tilemap');
        this.map.addTilesetImage('tableGround-tile');
        
        this.layer = this.map.createLayer(0);
        this.layer.fixedToCamera = false;

        this.layer.x = this.world.centerX - 325; // needs position improvement;
        this.layer.y = this.world.centerY + 80;
        ///////////////////////////////////////////////////////////////////////////////

    }

    create() {

        this.init();

        console.log(this.map);
        console.log(this.layer);

        console.log(this.layer.x);
        console.log(this.layer.y);

    }

}