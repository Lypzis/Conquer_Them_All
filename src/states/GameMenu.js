import { ipcRenderer } from "electron";

//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Main Menu Screen of the Game
*/
//////////////////////////////////////////////////////////////////////////////

class GameMenu {

    init(){

        this.titleText = game.add.text(game.world.centerX, 100, "Conquer Them All", styles.lightHeader());

        utils.navItemSetter('Start', 2, 60, target => game.state.start('TheGame') );
        utils.navItemSetter('Options', 3, 60, target => game.state.start('Options') );
        utils.navItemSetter('Instructions', 4, 60, target => console.log('You clicked instructions!') );
        utils.navItemSetter('Credits', 5, 60, target => console.log('Credits') );
        utils.navItemSetter('Quit', 6, 60, () => ipcRenderer.send('quit') ); //needs "Are you sure?" question

        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        utils.centerGameObjects([this.titleText]);
        
    }

    create() {
        game.add.sprite(0, 0, 'menu-sky-bg');
        this.clouds = game.add.tileSprite(0, 0, 832, 608, 'menu-clouds-bg');
        game.add.sprite(0, 0, 'menu-bg');

        this.init();

        // game continue even when not focused
        game.stage.disableVisibilityChange = true;
    }

    update(){
        this.clouds.tilePosition.x += 0.2;
    }

}