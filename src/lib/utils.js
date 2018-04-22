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

}


