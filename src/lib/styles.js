//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Global styles object, each method returns an style object
*/
//////////////////////////////////////////////////////////////////////////////
const styles = {

    /////////////////////////////////////////////////////////////////////////
    // For lighter backgrounds font style
    /** - Turn the header text to a dark color. 
     * @returns : Dark header style.
    */
    darkHeader() {
        return {
            font: 'bold 65pt SkydomeGlory',
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
                font: '30pt SkydomeGlory',
                align: 'left',
                strokeThickness: 4,
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
            font: 'bold 65pt SkydomeGlory',
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
                font: '30pt SkydomeGlory',
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