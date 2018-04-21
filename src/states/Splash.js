//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @autor: Victor V. Piccoli
 * @doc: Splash/temporary screen to preload scripts, images, sounds and fonts
*/
//////////////////////////////////////////////////////////////////////////////

const playSound = true,
    playMusic = true;

let music;

class Splash {

    constructor() {
        // initialize variables before preload occurs
        this.loadingBar = game.make.sprite(game.world.centerX - (382 / 2), 400, 'loading');
        this.logo = game.make.sprite(game.world.centerX, 200, 'brand');
        this.status = game.make.text(game.world.centerX, 380, 'Loading...', { fill: 'white' });

        // call utils method to centralize sprites
        utils.centerGameObjects([this.logo, this.status]);
    }

    loadScripts() {
        //load text font manager
        game.load.script('WebFont', './vendor/webfontloader.js')

        utils.loadScripts([
            'GameMenu',
            'TheGame',
            'GameOver',
            'Credits',
            'Options'
        ]);
    }

    loadBgm() {
        utils.loadAudio([
            'dangerous',
            'fear_and_wonder'
        ]);

    }

    loadImages() {
        utils.loadImages([
            'menu-bg',
            'options-bg',
            'quit-bg'
        ]);
    }

    loadFonts() {
        this.WebFontConfig = {
            custom: {
                families: ['SkydomeGlory'],
                urls: ['./assets/style/skydome-glory.css']
            }
        }
    }

    preload() {
        // load sprites to the stage
        game.add.sprite(0, 0, 'background');
        game.add.existing(this.logo) //.scale.setTo(0.5) deprecated
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar, 0);

        // call previous functions
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    }

    // enqueue states to the game
    addGameStates() {
        game.state.add('GameMenu', GameMenu);
        game.state.add('TheGame', TheGame);
        game.state.add('GameOver', GameOver);
        game.state.add('Credits', Credits);
        game.state.add('Options', Options);
    }

    addGameMusic() {
        // add background music and make it play in loop
        music = game.add.audio('fear_and_wonder');
        music.loop = true;
        music.play();
    }

    create() {
        //changes 'Loading...' to the following text 
        this.status.setText('Ready!');

        this.addGameStates();
        this.addGameMusic();

        setTimeout(() => {
            // will load the main menu
        }, 5000); //5000ms = 5s before loading next screen


    }

}

