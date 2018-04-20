//////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @autor: Victor V. Piccoli
 * @doc: Load the remaining assets and shows a progress bar in the process
*/
//////////////////////////////////////////////////////////////////////////

class Splash {
    loadScripts(){

    }

    loadBgm(){

    }

    loadImages(){

    }

    loadFonts(){

    }

    preload(){
        // call previous functions
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();

        // Add the loadingbar to the scene
        const loadingBar = game.add.sprite(game.world.centerX, 400, 'loading');
        // Tell phaser to use laodingBar as our preload progess bar
        this.load.setPreloadSprite(loadingBar);
    }
}

