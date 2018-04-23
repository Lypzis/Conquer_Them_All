//////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @autor: Victor V. Piccoli
 * @doc: Global utility object, contains generic functions
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
    navItemSetter(text,  order, padding, callback, revert, center){
        let navMenuStyle;
        let navMenuPosition;
        let anchor;

        if (order <= 0){
            order = 1;
        }

        // set to dark ? Default is light
        revert ? navMenuStyle = styles.navDarkItem() : navMenuStyle = styles.navLightItem();

        // centralize ? Default is left
        if (center) {
            navMenuPosition = styles.centerItem();
            anchor = 0.5;
        } else{ 
            navMenuPosition = styles.leftItem();
            anchor = 0.0;
        }

        let y = navMenuPosition.startY;
        let x = navMenuPosition.startX;

        let defaultStyle = navMenuStyle.default;
        let onHoverStyle = navMenuStyle.onHover;
        let baseStyle = navMenuStyle.base;
        
        // automatically set the y position of the option items, so it appends them vertically after each other 
        const txt = game.add.text(x, (order * padding) + y, text, styles.assignModifier( defaultStyle, baseStyle ));

        txt.inputEnabled = true; // makes the item clickable
        txt.events.onInputUp.add(callback); // on click, execute the received function
        txt.events.onInputOver.add( (target) => target.setStyle( styles.assignModifier( onHoverStyle, baseStyle )));
        txt.events.onInputOut.add( (target) => target.setStyle( styles.assignModifier( defaultStyle, baseStyle )));
        txt.anchor.setTo(anchor);
        
    }
    
}


