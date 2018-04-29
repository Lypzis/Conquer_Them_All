////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @author: Victor V. Piccoli
 * @doc: Bootstraper of the Phaser application
*/
////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Initialize Phaser application
const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

const gameOptions = {
    playSound: true,
    playMusic: true
}

let musicPlayer;

///////////////////////////////////////////////////////////////////////
// Main State Configuration
class Main {

    preload() {
        game.load.script('styles', './lib/styles.js');
        game.load.script('utils', './lib/utils.js');

        game.load.image('background', './assets/images/background.png');
        game.load.image('loading', './assets/images/progress-bar.png');
        game.load.image('brand', './assets/images/logo.png');
        game.load.script('Splash', './states/Splash.js');
    }

    create() {
        game.state.add('Splash', new Splash());
        game.state.start('Splash');
    }
}

// Adds the main configuration to the application and starts it
game.state.add('Main', Main);
game.state.start('Main');

