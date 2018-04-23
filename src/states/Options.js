//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @author: Victor V. Piccoli
 * @doc: Options window of the Game
*/
//////////////////////////////////////////////////////////////////////////////

class Options{

    init(){
        this.playSound = gameOptions.playSound,
        this.playMusic = gameOptions.playMusic;

        this.titleText = game.add.text(game.world.centerX, 100, "Options", style.darkHeader());
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        utils.centerGameObjects([this.titleText]);

        utils.navItemSetter(this.playMusic ? 'Mute Music':'Play Music', 1, (target) => {
            this.playMusic = !this.playMusic;
            target.text = this.playMusic ? 'Mute Music':'Play Music';
            musicPlayer.volume = this.playMusic ? 1 : 0;
        }, true);

        utils.navItemSetter(this.playSound ? 'Mute Sound':'Play Sound', 2, (target) => {
            this.playSound = !this.playSound;
            target.text = this.playSound ? 'Mute Sound':'Play Sound';
        }, true);

        utils.navItemSetter('<- Back', 3, (target) => game.state.start('GameMenu'), true, true );

    }

    create(){
        game.add.sprite(0, 0, 'options-bg'); // obs: create a scritp to store keys in the future

        this.init(); 
    }
    
}