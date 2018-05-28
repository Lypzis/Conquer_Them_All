import WebFont from 'webfontloader';

////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Splash/temporary screen to preload state scripts, images, objects, sounds and fonts
*/
////////////////////////////////////////////////////////////////////////////////////////////

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
        const states = [
            'GameMenu',
            'TheGame',
            'GameOver',
            'Credits',
            'Options'
        ];

        states.forEach( state => game.load.script(`${state}`, `./states/${state}.js`) );
    }

    loadBgm() {
        const audios = [
            'dangerous',
            'fear_and_wonder'
        ];

        audios.forEach( audio => game.load.audio(`${audio}`, `./assets/bgm/${audio}.mp3`) );
    }

    loadImages() {
        const images = [
            'menu-bg',
            'menu-clouds-bg',
            'menu-sky-bg',
            'options-bg',
            'quit-bg',
            'tableGround-tile',
        ];

        images.forEach( image => game.load.image(`${image}`, `./assets/images/${image}.png`) );
    }

    loadSpriteSheets(){
        const icons = [
            'warrior-icon',
            'hero-icon',
            'enemy-hero-icon',
            'enemy-warrior-icon'
        ];

        icons.forEach( icon => game.load.spritesheet(`${icon}`, `./assets/images/${icon}.png`, 30, 30) );
    }

    loadButtons(){
        const buttons = [
            'execute-btn'
        ];

        buttons.forEach( button => game.load.spritesheet(`${button}`, `./assets/images/${button}.png`, 165, 34) );
    }

    // loads a custom font
    loadFonts() {
        WebFont.load({
            custom: {
                families: ['SkydomeGlory'],
                urls: ['./assets/style/skydome-glory.css']
            }
        })
    }

    loadMaps(){
        game.load.tilemap('tilemap', './assets/maps/tableGround-map.txt', null, Phaser.Tilemap.TILED_JSON);
    }

    loadGameObjects(){
        const objects = [
            'Unity'
        ];

        objects.forEach( object => game.load.script(`${object}`, `./game-objects/${object}.js`) );
    }

    preload() {
        // load sprites to the stage
        game.add.existing(this.logo) //.scale.setTo(0.5) deprecated
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar, 0);

        // call previous functions
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
        this.loadMaps();
        this.loadButtons();
        this.loadGameObjects();
        this.loadSpriteSheets();
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
        musicPlayer = game.add.audio('fear_and_wonder');
        musicPlayer.loop = true;
        //musicPlayer.play();
    }

    create() {
        //changes 'Loading...' to the following text 
        this.status.setText('Ready!');

        this.addGameStates();
        this.addGameMusic();

        setTimeout(() => {
            game.state.start('GameMenu');
        }, 2000); //2000ms = 2s before loading next screen


    }

}

