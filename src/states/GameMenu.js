import { ipcRenderer } from "electron";

//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Main Menu Screen of the Game
*/
//////////////////////////////////////////////////////////////////////////////

class GameMenu {

    create() {
        game.add.sprite(0, 0, 'menu-sky-bg');
        this.clouds = game.add.tileSprite(0, 0, 832, 608, 'menu-clouds-bg');
        game.add.sprite(0, 0, 'menu-bg');

        this.titleText = game.add.text(game.world.centerX, 100, "Conquer Them All", styles.lightHeader());
        
        this.version = game.add.text(game.world.width - 64, game.world.height - 48, "0.9.0", styles.customText('10pt'));

        utils.navItemSetter('Start', 2, 60, target => game.state.start('TheGame') );
        utils.navItemSetter('Instructions', 3, 60, target => console.log('You clicked instructions!') );
        utils.navItemSetter('Options', 4, 60, target => game.state.start('Options') );
        utils.navItemSetter('Credits', 5, 60, target => console.log('Credits') );
        utils.navItemSetter('Quit', 6, 60, () => ipcRenderer.send('quit') ); //needs "Are you sure?" question

        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        utils.centerGameObjects([this.titleText]);

        // game continue even when not focused
        game.stage.disableVisibilityChange = true;
    }

    update(){
        this.clouds.tilePosition.x += 0.2;
    }

}