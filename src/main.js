////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @autor: Victor V. Piccoli
 * @doc: Load assets, scripts and then starts Phaser application
*/
////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Initialize Phaser application
const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

///////////////////////////////////////////////////////////////////////
// Main State Configuration
class Main {

    preload(){
        game.load.image('background', './assets/images/background.png');
        game.load.image('loading', './assets/images/progress-bar.png');
        game.load.image('brand', './assets/images/logo.png');
        game.load.script('Splash', './states/Splash.js');
        game.load.script('utils', './lib/utils.js');
    }

    create(){
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
}

// instantiate main setup
//const main = new Main(game);

// Adds the main configuration to the application and starts it
game.state.add('Main', new Main());
game.state.start('Main');