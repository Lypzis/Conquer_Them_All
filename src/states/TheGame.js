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

        
        //////////////////////////////////////////////////////////////////////////////////////////
        // tests

        this.playerStartPoint = maps.getPlayerStartPoint();

        //this.warriors = utils.generateTableUnities('warrior-icon', 2);

        console.log(this.playerStartPoint);

        this.iterator = () => {
            let squares = [];
            let square = this.playerStartPoint.width/5;

            for (let i = 0; i < 5 ; ++i){
                let item = i*square;
                squares.push(item);
            }

            return squares;
        };
        console.log(this.playerStartPoint.x + ', ' + this.playerStartPoint.y);



        // unities
        this.unity = new Unity(game, this.playerStartPoint.x , this.playerStartPoint.y , 'warrior-icon');
        this.unity2 = new Unity(game, this.playerStartPoint.x , this.playerStartPoint.y+32 , 'warrior-icon');

        this.unities = [this.unity, this.unity2]; //create generator in unity class

        // end of tests
        ///////////////////////////////////////////////////////////////////////////////////////////
    }

    onClick(){
        // On click
        game.input.onDown.add(() => {
            // Get the location of the mouse
            //const target = game.input.activePointer.position.clone();

            
            
            // Tell the follower sprite to find its path to the target
            // for movement test
            this.unity.goTo();
            this.unity2.goTo();

        });
    }

    create() {

        this.init();
        this.onClick();

    }

    update(){

        // check for collisions with tablemap obstacles
        utils.setUnityMapCollision(this.unities);

    }

}



