//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @author: Victor V. Piccoli
 * @doc: Options window of the Game
*/
//////////////////////////////////////////////////////////////////////////////

class Options{

    init(){
        this.optionCount = 1; //used to calculate where to vertically place each nav item on addMenuOption

        this.titleText = game.add.text(game.world.centerX, 100, "Options", style.header());
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        utils.centerGameObjects([this.titleText]);

        utils.navItemOrganizer('<- Back', this.optionCount, (target) => game.state.start('GameMenu'), true );

    }

    create(){
        game.add.sprite(0, 0, 'options-bg'); // obs: create a scritp to store keys in the future

        this.init();
    }
    
}