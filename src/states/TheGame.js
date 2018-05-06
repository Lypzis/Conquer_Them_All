import PhaserNavMesh from 'phaser-navmesh';

//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Load a level into the game Window ( No levels yet )
*/
//////////////////////////////////////////////////////////////////////////////

import PhaserNavMesh from 'phaser-navmesh';

const navMeshPlugin = game.plugins.add(PhaserNavMesh);
const p1 = new Phaser.Point(30, 30);
const p2 = new Phaser.Point(60, 60);

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

        this.layer.x = this.world.centerX - 357; // needs position improvement;
        this.layer.y = this.world.centerY + 16;

        this.map.setCollisionBetween(1,3);
        ///////////////////////////////////////////////////////////////////////////////////

        console.log(this.layer.x);
        console.log(this.layer.y);
        ///////////////////////////////////////////////////////////////////////////////

        this.unity = new Unity(game, this.layer.x + 32, this.layer.y + 32, 'warrior-icon');
        this.unity2 = new Unity(game, this.layer.x + 32, this.layer.y + 96, 'warrior-icon');
    }

    onClick(){
        // On click
        game.input.onDown.add(() => {
            // Get the location of the mouse
            //const target = game.input.activePointer.position.clone();

            
            
            // Tell the follower sprite to find its path to the target
            this.unity.goTo();
        
        });
    }

    create() {

        this.init();
        this.onClick();

    }

}



