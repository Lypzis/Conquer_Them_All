//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @author: Victor V. Piccoli
 * @doc: Main Menu Screen of the Game
*/
//////////////////////////////////////////////////////////////////////////////

const style = new styles();

class GameMenu {

    init(){

        this.titleText = game.add.text(game.world.centerX, 100, "Conquer Them All", style.lightHeader());

        utils.navItemSetter('Start', 1, (target) => console.log('Start') );
        utils.navItemSetter('Options', 2, (target) => game.state.start('Options') );
        utils.navItemSetter('Instructions', 3, (target) => console.log('You clicked instructions!') );
        utils.navItemSetter('Credits', 4, (target) => console.log('Credits') );
        utils.navItemSetter('Quit', 5, (target) => console.log('Quit') );

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