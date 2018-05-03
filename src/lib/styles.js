//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Global styles object, each method returns an style object
*/
//////////////////////////////////////////////////////////////////////////////
const styles = {

    /////////////////////////////////////////////////////////////////////////
    // Lighter backgrounds font style
    /** - Turn the header text to a dark color. */
    darkHeader() {
        return {
            font: 'bold 65pt SkydomeGlory',
            fill: 'black',
            align: 'center'
        }
    },

    /**
     * - Turn the navItems text to a dark color.
     * - Give color change effect of hover over an item.
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
    // Darker backgrounds font style
    /** - Turn the header text to a light color. */
    lightHeader() {
        return {
            font: 'bold 65pt SkydomeGlory',
            fill: '#fdfdfd',
            align: 'center'
        }
    },

    /**
     * - Turn the navItems text to a light color.
     * - Give color change effect of hover over an item.
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
    /** - Place item to the center X position.*/
    centerItem() {
        return {
            startY: 165,
            startX: game.world.centerX
        }
    },

    /** - Place item to the left. */
    leftItem() {
        return {
            startY: 165,
            startX: 30
        }
    },

}