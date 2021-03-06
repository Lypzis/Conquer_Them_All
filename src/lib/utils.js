//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Global utility object, contains generic functions
*/
//////////////////////////////////////////////////////////////////////////

const utils = {

    /** - Receives array of objects and centralizes each one of them. 
     * @param {*} objects : Array of objects.
    */
    centerGameObjects(objects) {
        objects.forEach(object => {
            object.anchor.setTo(0.5);
        });
    },

    /** - Ensure that objects collide properly with the current map layer. 
     * @param {*} unity : An unity object.
    */
    checkObjectsMapCollision(unity) {
        game.physics.arcade.collide(unity, maps.getLayer());
    },

    drawCoordinates(coordinatesArray) {
        let drawnObject;
        
        const squareSize = maps.getSquareSize();
        const width = squareSize;
        const height = squareSize;
        const bmd = game.add.bitmapData(width, height);

        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = 'rgba(0,255,0,0.2)';
        bmd.ctx.fill();

        return coordinatesArray.map(e => 
            game.add.sprite(e.x*squareSize, e.y*squareSize, bmd)
        );
    },

    ///////////////////////////////////////////////////////////////////
    /** Unities factory
     * - Generate unities and places them in the table.
    * @param {*} unityIconKey : key(name) of the image-icon. 
    * @param {*} quantity : the quantity to generate, must be less or equals 5.
    * @param {*} columnNumber : the number of the column to place, 0 to 4 starting from left(5 columns).
    * @param {*} friendly : Determines if it will be player's(true) unity(ies) or enemie's(false).
    * @returns : Array of unities objects.
    */
    generateTableUnities(unityIconKey, quantity, columnNumber, friendly) {
        const playerStartPoint = maps.getPlayerStartPoint(friendly);
        const points = maps.squareSizeSum();
        const objects = [];

        let x = playerStartPoint.x;
        let y = playerStartPoint.y;
        let unity = null;

        if (quantity <= 5 && columnNumber < 5) {
            for (let i = 0; i < quantity; ++i) {
                let id = unityIconKey + i;

                unity = new Unity(
                    game,
                    x + points[columnNumber],
                    y + points[i],
                    `${unityIconKey}`,
                    unities.getObject(unityIconKey),
                    id,
                    friendly
                );

                objects.push(unity);
            }
        } else {
            console.log('Invalid quantity or column! must be within the square bounds of the starting point.');
        }

        return objects;
    },

    ///////////////////////////////////////////////////////////////////
    /** Menu navigation items factory
     * - Overall setting of a navigation item.
    * @param {*} text : navItem name displayed. 
    * @param {*} order : the order it will appear, from top to bottom (default is 1).
    * @param {*} padding : space between a previous navItem from the current.
    * @param {*} callback : function called when the button is clicked.
    * @param {*} revert : (optional) elements will be white(false or null) else black(true).
    * @param {*} center : (optional) elements align left(false or null) else center(true). 
    */
    navItemSetter(text, order = 1, padding, callback, revert = false, center = false) {
        let navMenuStyle;
        let navMenuPosition;
        let anchor;

        // set to dark ? Default is light
        revert ? navMenuStyle = styles.navDarkItem() : navMenuStyle = styles.navLightItem();

        // centralize ? Default is left
        if (center) {
            navMenuPosition = styles.centerItem();
            anchor = 0.5;
        } else {
            navMenuPosition = styles.leftItem();
            anchor = 0.0;
        }

        let y = navMenuPosition.startY;
        let x = navMenuPosition.startX;

        let defaultStyle = navMenuStyle.default;
        let onHoverStyle = navMenuStyle.onHover;
        let baseStyle = navMenuStyle.base;

        // automatically set the y position of the option items, so it appends them vertically after each other 
        const txt = game.add.text(x, (order * padding) + y, text, Object.assign(defaultStyle, baseStyle));

        txt.inputEnabled = true; // makes the item clickable

        txt.events.onInputUp.add(callback); // on click, execute the received function
        txt.events.onInputOver.add(target => target.setStyle(Object.assign(onHoverStyle, baseStyle)));
        txt.events.onInputOut.add(target => target.setStyle(Object.assign(defaultStyle, baseStyle)));

        txt.anchor.setTo(anchor);
    }

}