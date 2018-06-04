//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Global styles object, each method returns an style object
*/
//////////////////////////////////////////////////////////////////////////////

const styles = {

    ////////////////////////////////////////////////////////////////////
    fonts: ['Kaisg', 'OldLondon-Alternate', 'OldLondon'],
    index: 0, //header 
    index2: 2,  //navigation items
    // is it necessary to have one for texts? or at least the one used in navigation items but of different size?
    ////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////
    // For lighter backgrounds font style
    /** - Turn the header text to a dark color. 
     * @returns : Dark header style.
    */
    darkHeader() {
        return {
            font: `65pt ${headers}`,
            fill: 'black',
            align: 'center'
        }
    },

    /**
     * - Turn the navItem text to a dark color.
     * - Give color change effect of hover over an item.
     * @returns : Dark navigation item style.
     */
    navDarkItem() {
        return {
            base: {
                font: `30pt ${navItems}`,
                align: 'left',
                strokeThickness: 2,
            },

            default: {
                fill: 'black',
                stroke: 'black'
            },

            onHover: {
                fill: "#2d2d2d",
                stroke: "rgba(84,84,84,0.5)"
            },

        }
    },

    //////////////////////////////////////////////////////////////////////
    // For darker backgrounds font style
    /** - Turn the header text to a light color. 
     * @returns : Light header style.
    */
    lightHeader() {
        return {
            font: `65pt ${headers}`,
            fill: '#fdfdfd',
            align: 'center'
        }
    },

    /**
     * - Turn the navItem text to a light color.
     * - Give color change effect of hover over an item.
     * @returns : Light navigation item style.
     */
    navLightItem() {
        return {
            base: {
                font: `30pt ${navItems}`,
                align: 'left',
                strokeThickness: 4,
            },

            default: {
                fill: 'white',
                stroke: 'rgba(0,0,0,0)'
            },

            onHover: {
                fill: "#FEFFD5",
                stroke: "rgba(200,200,200,0.5)"
            },
        }
    },


    textInfoTitle() {
        return {
            font: `18pt ${navItems}`,
            align: 'left',
            fill: 'white',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4,
        }
    },

    textInfoStatus() {
        return {
            font: `16pt ${navItems}`, 
            align: 'left',
            fill: 'white',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4,
        }
    },

    ///////////////////////////////////////////////////////////////////////
    // Items alignment
    /** - Place item to the center X position.
     * @returns : Center position style.
    */
    centerItem() {
        return {
            startY: 165,
            startX: game.world.centerX
        }
    },

        /** - Place item to the left. 
         * @returns : Left position style.
        */
        leftItem() {
    return {
        startY: 165,
        startX: 30
    }
},

}

/////////////////////////////////////////////////////////////////////
const headers = styles.fonts[styles.index];
const navItems = styles.fonts[styles.index2];
/////////////////////////////////////////////////////////////////////