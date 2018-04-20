//////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @autor: Victor V. Piccoli
 * @doc: Splash/temporary screen to preload scrips, images and fonts
*/
//////////////////////////////////////////////////////////////////////////

class Splash {

    constructor(){
        // initialize variables before preload occurs
        this.loadingBar = game.make.sprite(game.world.centerX-(382/2), 400, 'loading');
        this.logo = game.make.sprite(game.world.centerX, 200, 'brand');
        this.status = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        
        // call utils method to centralize sprites
        utils.centerGameObjects([this.logo, this.status]);
    }

    loadScripts(){
        
    }

    loadBgm(){

    }

    loadImages(){

    }

    loadFonts(){

    }

    preload(){
        // load sprites to the stage
        game.add.sprite(0, 0, 'background');
        game.add.existing(this.logo) //.scale.setTo(0.5) deprecated
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        //this.load.setPreloadSprite(this.loadingBar);

        // call previous functions
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    }
}

