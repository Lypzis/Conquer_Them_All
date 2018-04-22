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
        this.optionCount = 1;

        this.titleText = game.add.text(game.world.centerX, 100, "Conquer Them All", style.header());

        // can be improved 
        utils.navItemOrganizer('Start', this.optionCount, (target) => console.log(this.optionCount) );
        this.optionCount++
        utils.navItemOrganizer('Options', this.optionCount++, (target) => game.state.start('Options') );
        utils.navItemOrganizer('Instructions', this.optionCount++, (target) => console.log('You clicked instructions!') );
        utils.navItemOrganizer('Credits', this.optionCount++, (target) => console.log(this.optionCount) );

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