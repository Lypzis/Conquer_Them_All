//////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @autor: Victor V. Piccoli
 * @doc: Utility Global Object Helper
*/
//////////////////////////////////////////////////////////////////////////

const utils = {

    // receives array of objects and centralizes each one of them
    centerGameObjects(objects) {
        objects.forEach(object => {
            object.anchor.setTo(0.5);
        });
    },

    // Menu buttons/options factory
    navItemOrganizer(text,  count, callback){
        const optionStyle = style.navItem();
        
        // automatically set the y position of the option items, so it appends them vertically after each other
        const txt = game.add.text(30, (count * 80) + 175, text, optionStyle);

        txt.inputEnabled = true; // makes the item clickable
        txt.events.onInputUp.add(callback); // on click, execute the received function
        txt.events.onInputOver.add(optionStyle.onOver.bind(txt));
        txt.events.onInputOut.add(optionStyle.onOut.bind(txt));
        
    }

}


