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
        const unities = [];

        let x = playerStartPoint.x;
        let y = playerStartPoint.y;
        let unity = null;

        if (quantity <= 5 && columnNumber < 5) {
            for (let i = 0; i < quantity; ++i) {

                switch (unityIconKey) {
                    case ('warrior-icon'):
                        unity = new Warrior(game, x + points[columnNumber], y + points[i], `${unityIconKey}`, friendly);
                        break;

                    case ('hero-icon'):
                        unity = new Hero(game, x + points[columnNumber], y + points[i], `${unityIconKey}`, friendly);
                        break;

                    case ('enemy-hero-icon'):
                        unity = new EnemyHero(game, x + points[columnNumber], y + points[i], `${unityIconKey}`, friendly);
                        break;

                    case ('enemy-warrior-icon'):
                        unity = new EnemyWarrior(game, x + points[columnNumber], y + points[i], `${unityIconKey}`, friendly);
                        break;

                    default:
                        console.log('No valid unit chosen. Check Splash.js for valid names!');
                }

                unities.push(unity);
            }
        } else {
            console.log('Invalid quantity or column! must be within the square bounds of the starting point.');
        }

        return unities;
    },

    /** - Ensure that objects will collide with the current map layer. 
     * @param {*} unity : An unity object.
    */
    checkObjectsMapCollision(unity) {
        game.physics.arcade.collide(unity, maps.getLayer(), unity => {
            unity.collided = true;
        });
    },

    ///////////////////////////////////////////////////////////////////
    /** Menu navigation items factory
     * - Overall setting of a navigation item.
    * @param {*} text : navItem name displayed. 
    * @param {*} order : the order it will appear, from top to bottom.
    * @param {*} padding : space between a previous navItem from the current.
    * @param {*} callback : function called when the button is clicked.
    * @param {*} revert : (optional) elements will white(false or null) else  black(true).
    * @param {*} center : (optional) elements align left(false or null) else center(true). 
    */
    navItemSetter(text, order, padding, callback, revert, center) {
        let navMenuStyle;
        let navMenuPosition;
        let anchor;

        if (order <= 0) {
            order = 1;
        }

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