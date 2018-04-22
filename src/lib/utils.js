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
    navItemOrganizer(text,  count, callback, revert){
        const navItem = style.navItem();

        let defaultStyle;

        revert ? defaultStyle = navItem.inverse : defaultStyle = navItem.default;
            
        // automatically set the y position of the option items, so it appends them vertically after each other 
        const txt = game.add.text(30, (count * 80) + 175, text, style.assignModifier( defaultStyle, navItem.base ));

        txt.inputEnabled = true; // makes the item clickable
        txt.events.onInputUp.add(callback); // on click, execute the received function
        txt.events.onInputOver.add( (target) => target.setStyle( style.assignModifier( navItem.onHover, navItem.base )));
        txt.events.onInputOut.add( (target) => target.setStyle( style.assignModifier( defaultStyle, navItem.base )));
        
    }
    
}


