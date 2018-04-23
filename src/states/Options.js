//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @author: Victor V. Piccoli
 * @doc: Options window of the Game
*/
//////////////////////////////////////////////////////////////////////////////

class Options{

    init(){
        this.titleText = game.add.text(game.world.centerX, 100, "Options", styles.darkHeader());
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        utils.centerGameObjects([this.titleText]);

        utils.navItemSetter(gameOptions.playMusic ? 'Mute Music':'Play Music', 1, 80, (target) => {
            gameOptions.playMusic = !gameOptions.playMusic;
            target.text = gameOptions.playMusic ? 'Mute Music':'Play Music';
            musicPlayer.volume = gameOptions.playMusic ? 1 : 0;
        }, true, true);

        utils.navItemSetter(gameOptions.playSound ? 'Mute Sound':'Play Sound', 2, 80, (target) => {
            gameOptions.playSound = !gameOptions.playSound;
            target.text = gameOptions.playSound ? 'Mute Sound':'Play Sound';
        }, true, true);

        utils.navItemSetter('<- Back', 3, 90, (target) => game.state.start('GameMenu'), true, true );

    }

    create(){
        game.add.sprite(0, 0, 'options-bg'); // obs: create a scritp to store keys in the future

        this.init(); 
    }
    
}