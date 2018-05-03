import PhaserNavMesh from 'phaser-navmesh';

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
        // Creates the table
        this.map = game.add.tilemap('tilemap');
        this.map.addTilesetImage('tableGround-tile');

        this.layer = this.map.createLayer(0);
        this.layer.fixedToCamera = false;

        this.layer.x = this.world.centerX - 325; // needs position improvement;
        this.layer.y = this.world.centerY + 80;
        ///////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////
        // NavMesh debug test
        this.navigation = navMeshPlugin.buildMeshFromTiled(this.map, 'navmesh', 5);

        this.unity = new Unity(game, this.layer.x, this.layer.y + 32, 'warrior-icon');
        this.unity2 = new Unity(game, this.layer.x, this.layer.y, 'warrior-icon');

    }

    onClick(){
        // On click
        game.input.onDown.add(() => {
            // Get the location of the mouse
            const target = game.input.activePointer.position.clone();

            console.log(this.navigation);
            console.log(this.unity.position);
            console.log(target);

            this.path = this.navigation.findPath(this.unity.position, target);
            console.log(this.path);
            
            // Tell the follower sprite to find its path to the target
            this.unity.goTo(this.path);
        
        });
    }

    create() {

        this.init();
        this.onClick();

    }

}

const navMeshPlugin = game.plugins.add(PhaserNavMesh);

const p1 = new Phaser.Point(100, 400);
const p2 = new Phaser.Point(700, 200);

console.log(p1);
console.log(p2);