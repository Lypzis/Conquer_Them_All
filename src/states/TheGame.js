//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
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

        this.layer.x = this.world.centerX - 325; // needs position improvement;
        this.layer.y = this.world.centerY + 80;
        ///////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////
        // NavMesh debug test
        this.navigation = navMeshPlugin.buildMeshFromTiled(this.map, 'navMesh', 5);
        console.log(this.navigation);


        this.path = this.navigation.findPath(p1, p2);
        console.log(p1 + ' e ' + p2);
        console.log(this.path);


        this.navigation.enableDebug(true); // Creates a Phaser.Graphics overlay on top of the screen
        this.navigation.debugClear(); // Clears the overlay
        // Visualize the underlying navmesh
        this.navigation.debugDrawMesh({
            drawCentroid: true, drawBounds: false, drawNeighbors: true, drawPortals: true
        });
        /*
        this.navigation.enableDebug();
        this.navigation.debugClear();

        this.navigation.debugDrawMesh({
            drawCentroid: true,
            drawBounds: false,
            drawNeighbors: true,
            drawPortals: true
        });

        this.path = this.navigation.findPath(p1, p2, {
            drawPolyPath: true,
            drawFinalPath: true
        }); 

        console.log(this.path); */
        /////////////////////////////////////////////////////////////////////////////

    }

    create() {

        this.init();

        //console.log(this.map);
        //console.log(this.layer);

        //console.log(this.layer.x);
        //console.log(this.layer.y);

    }

}