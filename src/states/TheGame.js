import PhaserNavMesh from 'phaser-navmesh';

//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Load a level into the game Window ( No levels yet )
*/
//////////////////////////////////////////////////////////////////////////////

const navMeshPlugin = game.plugins.add(PhaserNavMesh);
const p1 = new Phaser.Point(30, 30);
const p2 = new Phaser.Point(60, 60);

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

            this.warriors.forEach(e => {
                e.goTo();

                //console.clear();
                console.log('x: ' + e.positionX);
                console.log('y: ' + e.positionY);
                console.log('index: ' + e.index);
                console.log('---------------------');

            });

        });



    }

    create() {

        this.init();
        this.onClick();


    }

    update() {



        // check for collisions with tablemap obstacles
        utils.setUnityMapCollision(this.warriors);

    }

}



