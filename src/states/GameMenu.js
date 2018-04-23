//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @author: Victor V. Piccoli
 * @doc: Main Menu Screen of the Game
*/
//////////////////////////////////////////////////////////////////////////////

import { ipcRenderer } from "electron";

class GameMenu {

    init(){

        this.titleText = game.add.text(game.world.centerX, 100, "Conquer Them All", styles.lightHeader());

        utils.navItemSetter('Start', 1, 65, (target) => console.log('Start') );
        utils.navItemSetter('Options', 2, 65, (target) => game.state.start('Options') );
        utils.navItemSetter('Instructions', 65, 3, (target) => console.log('You clicked instructions!') );
        utils.navItemSetter('Credits', 4, 65, (target) => console.log('Credits') );
        utils.navItemSetter('Quit', 5, 65, () => ipcRenderer.send('quit') ); //needs "Are you sure?" question

        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        utils.centerGameObjects([this.titleText]);
        
    }

    create() {
        game.add.sprite(0, 0, 'menu-bg');

        this.init();

        // game continue even when not focused
        game.stage.disableVisibilityChange = true;
    }

}