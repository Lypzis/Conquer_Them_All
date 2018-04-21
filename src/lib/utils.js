//////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @autor: Victor V. Piccoli
 * @doc: Utility Object Helper, avoids repeating code
*/
//////////////////////////////////////////////////////////////////////////

const utils = {

    // receives array of objects and centralizes each one of them
    centerGameObjects(objects) {
        objects.forEach(object => {
            object.anchor.setTo(0.5);
        });
    },

    // receives keys(state names) and loads each one
    loadScripts(keys){
        keys.forEach( (key) => game.load.script(`${key}`, `./states/${key}.js`) );
    },

    loadAudio(keys){
        keys.forEach( (key) => game.load.audio(`${key}`, `./assets/bgm/${key}.mp3`) );
    },

    loadImages(keys){
        keys.forEach( (key) => game.load.image(`${key}`, `./assets/images/${key}.png`) );
    }

}


